import { spawn } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const artifactsDirectory = join(tmpdir(), "codex-portfolio-review");
const browserProfile = join(tmpdir(), "codex-portfolio-browser-" + process.pid);
const screenshots = [];
let serverProcess;
let browserProcess;
let socket;

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function delay(milliseconds) {
    return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

function getFreePort() {
    return new Promise((resolvePort, rejectPort) => {
        const server = createServer();
        server.unref();
        server.on("error", rejectPort);
        server.listen(0, "127.0.0.1", () => {
            const address = server.address();
            server.close(() => resolvePort(address.port));
        });
    });
}

async function getJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`${url} returned ${response.status}`);
    }
    return response.json();
}

async function waitFor(check, description, timeout = 15000) {
    const started = Date.now();
    let lastError;
    while (Date.now() - started < timeout) {
        try {
            const value = await check();
            if (value) {
                return value;
            }
        } catch (error) {
            lastError = error;
        }
        await delay(120);
    }
    throw new Error(`Timed out waiting for ${description}${lastError ? `: ${lastError.message}` : ""}`);
}

function findBrowser() {
    const candidates = process.platform === "win32"
        ? [
            "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
            "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
        ]
        : ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"];

    const browser = candidates.find(existsSync);
    assert(browser, "No supported local Chromium browser was found.");
    return browser;
}

function connectToCdp(url) {
    return new Promise((resolveSocket, rejectSocket) => {
        const webSocket = new WebSocket(url);
        webSocket.addEventListener("open", () => resolveSocket(webSocket), { once: true });
        webSocket.addEventListener("error", () => rejectSocket(new Error("Unable to connect to the browser debugging socket.")), { once: true });
    });
}

function createCdpClient(webSocket) {
    let commandId = 0;
    const pending = new Map();
    const listeners = new Map();

    webSocket.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        if (message.id && pending.has(message.id)) {
            const { resolveCommand, rejectCommand } = pending.get(message.id);
            pending.delete(message.id);
            if (message.error) {
                rejectCommand(new Error(message.error.message));
            } else {
                resolveCommand(message.result || {});
            }
            return;
        }

        const handlers = listeners.get(message.method) || [];
        handlers.forEach((handler) => handler(message.params || {}));
    });

    function send(method, params = {}) {
        commandId += 1;
        const id = commandId;
        return new Promise((resolveCommand, rejectCommand) => {
            pending.set(id, { resolveCommand, rejectCommand });
            webSocket.send(JSON.stringify({ id, method, params }));
        });
    }

    function on(method, handler) {
        const handlers = listeners.get(method) || [];
        handlers.push(handler);
        listeners.set(method, handlers);
    }

    async function evaluate(expression) {
        const result = await send("Runtime.evaluate", {
            expression,
            awaitPromise: true,
            returnByValue: true
        });
        if (result.exceptionDetails) {
            throw new Error(result.exceptionDetails.text || "Browser evaluation failed.");
        }
        return result.result.value;
    }

    return { send, on, evaluate };
}

async function main() {
    const serverPort = await getFreePort();
    const debuggingPort = await getFreePort();
    const pageUrl = `http://127.0.0.1:${serverPort}/`;
    const browserPath = findBrowser();
    mkdirSync(artifactsDirectory, { recursive: true });
    mkdirSync(browserProfile, { recursive: true });

    serverProcess = spawn("python", ["-m", "http.server", String(serverPort), "--bind", "127.0.0.1"], {
        cwd: root,
        windowsHide: true,
        stdio: "ignore"
    });

    await waitFor(async () => {
        const response = await fetch(pageUrl);
        return response.ok;
    }, "local portfolio server");

    browserProcess = spawn(browserPath, [
        "--headless=new",
        "--disable-gpu",
        "--disable-background-networking",
        "--no-first-run",
        "--no-default-browser-check",
        "--remote-allow-origins=*",
        `--remote-debugging-port=${debuggingPort}`,
        `--user-data-dir=${browserProfile}`,
        "--window-size=1440,1000",
        pageUrl
    ], {
        windowsHide: true,
        stdio: "ignore"
    });

    const target = await waitFor(async () => {
        const targets = await getJson(`http://127.0.0.1:${debuggingPort}/json/list`);
        return targets.find((item) => item.type === "page" && item.url.startsWith(pageUrl));
    }, "portfolio browser target", 20000);

    socket = await connectToCdp(target.webSocketDebuggerUrl);
    const cdp = createCdpClient(socket);
    const consoleErrors = [];
    const pageExceptions = [];
    const failedLocalRequests = [];

    cdp.on("Runtime.consoleAPICalled", (event) => {
        if (event.type === "error") {
            consoleErrors.push(event.args.map((argument) => argument.value || argument.description || "").join(" "));
        }
    });
    cdp.on("Runtime.exceptionThrown", (event) => {
        pageExceptions.push(event.exceptionDetails?.text || "Unhandled browser exception");
    });
    cdp.on("Network.responseReceived", (event) => {
        if (event.response.url.startsWith(pageUrl) && event.response.status >= 400) {
            failedLocalRequests.push(`${event.response.status} ${event.response.url}`);
        }
    });
    cdp.on("Network.loadingFailed", (event) => {
        if (event.type !== "Font") {
            failedLocalRequests.push(`${event.errorText} ${event.type}`);
        }
    });

    await cdp.send("Runtime.enable");
    await cdp.send("Page.enable");
    await cdp.send("Network.enable");

    await waitFor(() => cdp.evaluate("document.readyState === 'complete' && Boolean(document.querySelector('#hero-title'))"), "rendered German portfolio");

    const initialState = await cdp.evaluate(`({
        language: document.documentElement.lang,
        storedLanguage: localStorage.getItem('portfolio-language'),
        title: document.title,
        h1: document.querySelector('#hero-title')?.textContent.trim(),
        nav: document.querySelector('[data-nav="about"]')?.textContent.trim(),
        renderedSections: [...document.querySelectorAll('[data-render]')].filter((element) => element.childElementCount > 0).length,
        h1Count: document.querySelectorAll('h1').length
    })`);
    assert(initialState.language === "de", "First visit did not default to German.");
    assert(initialState.storedLanguage === null, "A fresh first visit should not persist an implicit language choice.");
    assert(initialState.title.includes("Entwickler in Wien"), "German SEO title was not applied.");
    assert(initialState.h1 === "Senior Full-Stack .NET Developer", "Hero title is incorrect.");
    assert(initialState.nav === "Über mich", "German navigation was not rendered.");
    assert(initialState.renderedSections === 8, "One or more page regions did not render.");
    assert(initialState.h1Count === 1, "The page must contain exactly one H1.");

    await cdp.evaluate("document.querySelector('[data-language=\"en\"]').click(); true");
    await waitFor(() => cdp.evaluate("document.documentElement.lang === 'en'"), "English language switch");
    const englishState = await cdp.evaluate(`({
        storedLanguage: localStorage.getItem('portfolio-language'),
        nav: document.querySelector('[data-nav="about"]')?.textContent.trim(),
        title: document.title,
        selected: document.querySelector('[data-language="en"]')?.getAttribute('aria-pressed')
    })`);
    assert(englishState.storedLanguage === "en", "English selection was not persisted.");
    assert(englishState.nav === "About", "English navigation was not rendered.");
    assert(englishState.title.includes("Developer in Vienna"), "English SEO title was not applied.");
    assert(englishState.selected === "true", "Language selection state is not exposed accessibly.");

    await cdp.send("Page.reload", { ignoreCache: true });
    await waitFor(() => cdp.evaluate("document.readyState === 'complete' && document.documentElement.lang === 'en'"), "persisted English reload");
    assert(await cdp.evaluate("document.querySelector('[data-nav=\"experience\"]')?.textContent.trim()") === "Experience", "English did not survive a reload.");

    await cdp.evaluate("document.querySelector('[data-language=\"de\"]').click(); true");
    await waitFor(() => cdp.evaluate("document.documentElement.lang === 'de'"), "German language switch");
    assert(await cdp.evaluate("localStorage.getItem('portfolio-language')") === "de", "German selection was not persisted.");

    await cdp.evaluate("document.body.focus(); true");
    await cdp.send("Input.dispatchKeyEvent", { type: "rawKeyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
    assert(await cdp.evaluate("document.activeElement.classList.contains('skip-link')"), "The skip link is not first in the keyboard focus order.");
    await cdp.evaluate("document.activeElement.blur(); true");

    for (const width of [375, 768, 1024, 1440]) {
        await cdp.send("Emulation.setDeviceMetricsOverride", {
            width,
            height: 1000,
            deviceScaleFactor: 1,
            mobile: false
        });
        await delay(220);

        const layout = await cdp.evaluate(`(() => {
            const menu = document.querySelector('.menu-toggle');
            const languageButtons = [...document.querySelectorAll('.language-button')];
            const overflowingTags = [...document.querySelectorAll('.tag')]
                .filter((tag) => tag.scrollWidth > tag.clientWidth + 1)
                .map((tag) => tag.textContent.trim());
            return {
                innerWidth,
                documentWidth: document.documentElement.scrollWidth,
                bodyWidth: document.body.scrollWidth,
                menuVisible: getComputedStyle(menu).display !== 'none',
                controlsMeetTarget: languageButtons.every((button) => {
                    const rect = button.getBoundingClientRect();
                    return rect.width >= 44 && rect.height >= 44;
                }),
                heroWithinViewport: document.querySelector('#hero-title').getBoundingClientRect().right <= innerWidth,
                overflowingTags
            };
        })()`);

        assert(layout.innerWidth === width, `Viewport width ${width}px was not applied.`);
        assert(layout.documentWidth <= width && layout.bodyWidth <= width, `Horizontal overflow detected at ${width}px.`);
        assert(layout.controlsMeetTarget, `Language controls are smaller than 44×44px at ${width}px.`);
        assert(layout.heroWithinViewport, `Hero title overflows at ${width}px.`);
        assert(layout.overflowingTags.length === 0, `Technology tags overflow at ${width}px: ${layout.overflowingTags.join(", ")}`);
        assert(layout.menuVisible === (width < 1040), `Navigation breakpoint is incorrect at ${width}px.`);

        if (width < 1040) {
            await cdp.evaluate("document.querySelector('.menu-toggle').click(); true");
            assert(await cdp.evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')") === "true", `Mobile menu did not open at ${width}px.`);
            assert(await cdp.evaluate("getComputedStyle(document.querySelector('#site-navigation')).display") === "flex", `Mobile menu is not visible at ${width}px.`);
            await cdp.evaluate("document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); true");
            assert(await cdp.evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')") === "false", `Escape did not close the mobile menu at ${width}px.`);
        }

        const screenshot = await cdp.send("Page.captureScreenshot", {
            format: "png",
            fromSurface: true,
            captureBeyondViewport: true
        });
        const screenshotPath = join(artifactsDirectory, `portfolio-${width}.png`);
        writeFileSync(screenshotPath, Buffer.from(screenshot.data, "base64"));
        screenshots.push(screenshotPath);
    }

    const localAssetStatus = await cdp.evaluate(`({
        images: [...document.images].map((image) => ({ src: image.getAttribute('src'), complete: image.complete, width: image.naturalWidth })),
        localLinks: [...document.querySelectorAll('a[href]')]
            .map((link) => link.getAttribute('href'))
            .filter((href) => href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('http'))
    })`);
    assert(localAssetStatus.images.every((image) => image.complete && image.width > 0), "A local image failed to load.");
    assert(localAssetStatus.localLinks.length === 0, `Unverified local links found: ${localAssetStatus.localLinks.join(", ")}`);
    assert(consoleErrors.length === 0, `Console errors: ${consoleErrors.join(" | ")}`);
    assert(pageExceptions.length === 0, `Page exceptions: ${pageExceptions.join(" | ")}`);
    assert(failedLocalRequests.length === 0, `Failed requests: ${failedLocalRequests.join(" | ")}`);

    console.log(JSON.stringify({
        status: "passed",
        checkedViewports: [375, 768, 1024, 1440],
        languages: ["de", "en"],
        screenshots
    }, null, 2));
}

try {
    await main();
} finally {
    if (socket && socket.readyState <= WebSocket.OPEN) {
        socket.close();
    }
    if (browserProcess && !browserProcess.killed) {
        browserProcess.kill();
    }
    if (serverProcess && !serverProcess.killed) {
        serverProcess.kill();
    }
    if (resolve(browserProfile).startsWith(resolve(tmpdir())) && browserProfile.includes("codex-portfolio-browser-")) {
        await delay(150);
        rmSync(browserProfile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
    }
}
