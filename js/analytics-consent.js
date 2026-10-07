(function () {
    "use strict";

    const measurementId = "G-8F58CVEXGG";
    const storageKey = "portfolio-analytics-consent";
    const trackedHosts = ["mnikbakht.ir", "www.mnikbakht.ir"];
    const banner = document.getElementById("analytics-consent");
    const data = window.PORTFOLIO_DATA;
    let analyticsLoaded = false;
    let settingsTrigger = null;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
    };

    window.gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
        functionality_storage: "granted",
        personalization_storage: "denied",
        security_storage: "granted"
    });
    window.gtag("set", "ads_data_redaction", true);

    function readConsent() {
        try {
            const value = localStorage.getItem(storageKey);
            return value === "granted" || value === "denied" ? value : null;
        } catch (error) {
            return null;
        }
    }

    function storeConsent(value) {
        try {
            localStorage.setItem(storageKey, value);
        } catch (error) {
            // Consent still applies for the current page when storage is unavailable.
        }
    }

    function currentCopy() {
        const language = document.documentElement.lang === "en" ? "en" : "de";
        return data && data.copy && data.copy[language] ? data.copy[language].analytics : null;
    }

    function updateBannerCopy() {
        const copy = currentCopy();
        if (!copy) {
            return;
        }

        banner.querySelectorAll("[data-consent-copy]").forEach(function (element) {
            element.textContent = copy[element.dataset.consentCopy];
        });
        banner.querySelector('[data-consent-action="deny"]').textContent = copy.deny;
        banner.querySelector('[data-consent-action="grant"]').textContent = copy.grant;
    }

    function showBanner(moveFocus) {
        updateBannerCopy();
        banner.hidden = false;
        document.documentElement.classList.add("has-consent-banner");
        document.body.classList.add("has-consent-banner");

        if (moveFocus) {
            banner.querySelector('[data-consent-action="deny"]').focus();
        }
    }

    function hideBanner() {
        banner.hidden = true;
        document.documentElement.classList.remove("has-consent-banner");
        document.body.classList.remove("has-consent-banner");

        if (settingsTrigger && document.contains(settingsTrigger)) {
            settingsTrigger.focus();
        }
        settingsTrigger = null;
    }

    function loadAnalytics() {
        if (analyticsLoaded) {
            return;
        }

        analyticsLoaded = true;
        window.gtag("consent", "update", {
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
            analytics_storage: "granted"
        });

        if (trackedHosts.indexOf(window.location.hostname) === -1) {
            return;
        }

        const script = document.createElement("script");
        script.async = true;
        script.id = "google-analytics-tag";
        script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
        document.head.appendChild(script);

        window.gtag("js", new Date());
        window.gtag("config", measurementId, {
            allow_google_signals: false,
            allow_ad_personalization_signals: false
        });
    }

    function clearAnalyticsCookies() {
        const hostParts = window.location.hostname.split(".");
        const rootDomain = hostParts.length > 1 ? "." + hostParts.slice(-2).join(".") : "";

        document.cookie.split(";").forEach(function (cookie) {
            const name = cookie.split("=")[0].trim();
            if (name === "_ga" || name.indexOf("_ga_") === 0) {
                document.cookie = name + "=; Max-Age=0; path=/; SameSite=Lax";
                if (rootDomain) {
                    document.cookie = name + "=; Max-Age=0; path=/; domain=" + rootDomain + "; SameSite=Lax";
                }
            }
        });
    }

    function denyAnalytics() {
        storeConsent("denied");
        window.gtag("consent", "update", {
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
            analytics_storage: "denied"
        });
        clearAnalyticsCookies();
        hideBanner();

        if (analyticsLoaded) {
            window.location.reload();
        }
    }

    function grantAnalytics() {
        storeConsent("granted");
        loadAnalytics();
        hideBanner();
    }

    document.addEventListener("click", function (event) {
        const settingsButton = event.target.closest("[data-analytics-settings]");
        if (settingsButton) {
            settingsTrigger = settingsButton;
            showBanner(true);
            return;
        }

        const actionButton = event.target.closest("[data-consent-action]");
        if (!actionButton) {
            return;
        }

        if (actionButton.dataset.consentAction === "grant") {
            grantAnalytics();
        } else {
            denyAnalytics();
        }
    });

    new MutationObserver(function () {
        if (!banner.hidden) {
            updateBannerCopy();
        }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

    if (readConsent() === "granted") {
        loadAnalytics();
    } else if (readConsent() !== "denied") {
        showBanner(false);
    }
}());
