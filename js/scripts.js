(function () {
    "use strict";

    const data = window.PORTFOLIO_DATA;
    if (!data) {
        return;
    }

    const storageKey = "portfolio-language";
    const renderTargets = Array.from(document.querySelectorAll("[data-render]"));
    const header = document.getElementById("site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.getElementById("site-navigation");
    const languageButtons = Array.from(document.querySelectorAll("[data-language]"));
    let currentLanguage = readStoredLanguage();

    const externalIcon = [
        '<svg class="icon icon-external" viewBox="0 0 20 20" fill="none" aria-hidden="true">',
        '<path d="M7 5h8v8M15 5 5 15" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
        '</svg>'
    ].join("");

    function readStoredLanguage() {
        try {
            return localStorage.getItem(storageKey) === "en" ? "en" : "de";
        } catch (error) {
            return "de";
        }
    }

    function storeLanguage(language) {
        try {
            localStorage.setItem(storageKey, language);
        } catch (error) {
            // The language switch still works when storage is unavailable.
        }
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function tags(items) {
        return items.map(function (item) {
            return '<li class="tag">' + escapeHtml(item) + '</li>';
        }).join("");
    }

    function externalLink(href, label, className) {
        const copy = data.copy[currentLanguage];
        return [
            '<a class="', className || "text-link", '" href="', escapeHtml(href), '" target="_blank" rel="noopener noreferrer" aria-label="',
            escapeHtml(label + " – " + copy.a11y.external), '">', escapeHtml(label), externalIcon, '</a>'
        ].join("");
    }

    function sectionHeading(kicker, title, intro, id) {
        return [
            '<div class="section-heading">',
            '<p class="section-kicker">', escapeHtml(kicker), '</p>',
            '<h2 id="', escapeHtml(id), '">', escapeHtml(title), '</h2>',
            intro ? '<p class="section-intro">' + escapeHtml(intro) + '</p>' : "",
            '</div>'
        ].join("");
    }

    function renderHero(copy) {
        const profile = data.profile;
        const resumeHref = profile.resumeUrl || profile.resumeRequestUrl;
        const facts = copy.hero.facts.map(function (fact) {
            return [
                '<div class="hero-fact">',
                '<strong>', escapeHtml(fact.value), '</strong>',
                '<span>', escapeHtml(fact.label), '</span>',
                '</div>'
            ].join("");
        }).join("");

        return [
            '<div class="hero-grid">',
                '<div class="hero-copy">',
                    '<p class="eyebrow">', escapeHtml(copy.hero.eyebrow), '</p>',
                    '<p class="hero-name">', escapeHtml(profile.name), '</p>',
                    '<h1 id="hero-title">', escapeHtml(profile.role), '</h1>',
                    '<p class="hero-description">', escapeHtml(copy.hero.description), '</p>',
                    '<p class="technology-line">', escapeHtml(copy.hero.technologyLine), '</p>',
                    '<div class="hero-meta" aria-label="', escapeHtml(copy.hero.location), '">',
                        '<span class="location-dot" aria-hidden="true"></span>',
                        '<span>', escapeHtml(copy.hero.location), '</span>',
                    '</div>',
                    '<div class="hero-actions">',
                        '<a class="button button-primary" href="#experience">', escapeHtml(copy.hero.primaryCta), '</a>',
                        '<a class="button button-secondary" href="', escapeHtml(resumeHref), '">', escapeHtml(copy.hero.resumeCta), '</a>',
                    '</div>',
                    '<div class="hero-socials">',
                        externalLink(profile.linkedin, copy.common.linkedin, "text-link"),
                        externalLink(profile.github, copy.common.github, "text-link"),
                    '</div>',
                '</div>',
                '<aside class="profile-panel" aria-label="', escapeHtml(copy.hero.currentRole), '">',
                    '<div class="portrait-frame">',
                        '<img src="', escapeHtml(profile.image), '" width="472" height="591" alt="', escapeHtml(copy.meta.imageAlt), '" fetchpriority="high">',
                    '</div>',
                    '<div class="profile-status">',
                        '<span class="status-label">', escapeHtml(copy.hero.currentLabel), '</span>',
                        '<strong>', escapeHtml(copy.hero.currentRole), '</strong>',
                    '</div>',
                '</aside>',
            '</div>',
            '<div class="hero-facts" aria-label="', escapeHtml(copy.experience.intro), '">', facts, '</div>'
        ].join("");
    }

    function renderAbout(copy) {
        const paragraphs = copy.about.paragraphs.map(function (paragraph) {
            return '<p>' + escapeHtml(paragraph) + '</p>';
        }).join("");

        const focusItems = copy.about.focusItems.map(function (item) {
            return '<li>' + escapeHtml(item) + '</li>';
        }).join("");

        return [
            sectionHeading(copy.about.kicker, copy.about.title, copy.about.lead, "about-title"),
            '<div class="about-grid">',
                '<div class="prose">', paragraphs, '</div>',
                '<aside class="focus-card">',
                    '<h3>', escapeHtml(copy.about.focusTitle), '</h3>',
                    '<ul class="focus-list">', focusItems, '</ul>',
                    '<p class="personal-note">', escapeHtml(copy.about.personal), '</p>',
                '</aside>',
            '</div>'
        ].join("");
    }

    function renderExperience(copy) {
        const roles = data.experience.map(function (item, index) {
            const localized = item.content[currentLanguage];
            const currentBadge = item.current
                ? '<span class="current-badge">' + escapeHtml(copy.experience.current) + '</span>'
                : "";
            const bullets = localized.bullets.map(function (bullet) {
                return '<li>' + escapeHtml(bullet) + '</li>';
            }).join("");

            return [
                '<article class="experience-card', item.current ? ' experience-card-current' : '', '">',
                    '<div class="experience-index" aria-hidden="true">', String(index + 1).padStart(2, "0"), '</div>',
                    '<div class="experience-period">',
                        '<span>', escapeHtml(item.period[currentLanguage]), '</span>',
                        currentBadge,
                    '</div>',
                    '<div class="experience-content">',
                        '<p class="company-name">', escapeHtml(item.company), '</p>',
                        '<h3>', escapeHtml(localized.role), '</h3>',
                        '<p class="role-location">', escapeHtml(localized.location), '</p>',
                        '<p class="role-summary">', escapeHtml(localized.summary), '</p>',
                        '<h4 class="visually-hidden">', escapeHtml(copy.experience.responsibilities), '</h4>',
                        '<ul class="responsibility-list">', bullets, '</ul>',
                        '<ul class="tag-list" aria-label="Technologies">', tags(item.technologies), '</ul>',
                    '</div>',
                '</article>'
            ].join("");
        }).join("");

        return [
            sectionHeading(copy.experience.kicker, copy.experience.title, copy.experience.intro, "experience-title"),
            '<div class="experience-list">', roles, '</div>'
        ].join("");
    }

    function renderTechnologies(copy) {
        const groups = data.technologyGroups.map(function (group) {
            return [
                '<article class="skill-card">',
                    '<div class="skill-card-head">',
                        '<span class="skill-number" aria-hidden="true">', escapeHtml(String(data.technologyGroups.indexOf(group) + 1).padStart(2, "0")), '</span>',
                        '<h3>', escapeHtml(group.label[currentLanguage]), '</h3>',
                    '</div>',
                    '<ul class="tag-list" aria-label="', escapeHtml(group.label[currentLanguage]), '">', tags(group.items), '</ul>',
                '</article>'
            ].join("");
        }).join("");

        return [
            sectionHeading(copy.technologies.kicker, copy.technologies.title, copy.technologies.intro, "technologies-title"),
            '<div class="skills-grid">', groups, '</div>'
        ].join("");
    }

    function renderProjects(copy) {
        return [
            sectionHeading(copy.projects.kicker, copy.projects.title, copy.projects.intro, "projects-title"),
            '<article class="project-feature">',
                '<div class="project-monogram" aria-hidden="true">&lt;/&gt;</div>',
                '<div class="project-copy">',
                    '<p class="project-label">', escapeHtml(copy.projects.cardLabel), '</p>',
                    '<h3>', escapeHtml(copy.projects.cardTitle), '</h3>',
                    '<p>', escapeHtml(copy.projects.cardText), '</p>',
                '</div>',
                externalLink(data.profile.github, copy.projects.action, "button button-secondary project-action"),
            '</article>'
        ].join("");
    }

    function renderEducation(copy) {
        const educationCards = data.education.map(function (item) {
            return [
                '<article class="education-card">',
                    '<p class="education-period">', escapeHtml(item.period), '</p>',
                    '<h4>', escapeHtml(item.degree[currentLanguage]), '</h4>',
                    '<p class="education-institution">', escapeHtml(item.institution[currentLanguage]), '</p>',
                    '<p class="education-focus"><span>', escapeHtml(copy.education.focusLabel), ':</span> ', escapeHtml(item.focus[currentLanguage]), '</p>',
                '</article>'
            ].join("");
        }).join("");

        const languageItems = data.languages.map(function (item) {
            const level = item.level ? '<span>' + escapeHtml(item.level[currentLanguage]) + '</span>' : "";
            return '<li><strong>' + escapeHtml(item.name[currentLanguage]) + '</strong>' + level + '</li>';
        }).join("");

        return [
            sectionHeading(copy.education.kicker, copy.education.title, "", "education-title"),
            '<div class="background-grid">',
                '<div>',
                    '<h3 class="subsection-title">', escapeHtml(copy.education.educationLabel), '</h3>',
                    '<div class="education-list">', educationCards, '</div>',
                '</div>',
                '<aside class="language-card">',
                    '<h3>', escapeHtml(copy.education.languagesLabel), '</h3>',
                    '<ul>', languageItems, '</ul>',
                '</aside>',
            '</div>'
        ].join("");
    }

    function renderContact(copy) {
        const profile = data.profile;
        return [
            '<div class="contact-grid">',
                '<div>',
                    '<p class="section-kicker section-kicker-inverse">', escapeHtml(copy.contact.kicker), '</p>',
                    '<h2 id="contact-title">', escapeHtml(copy.contact.title), '</h2>',
                    '<p class="contact-text">', escapeHtml(copy.contact.text), '</p>',
                '</div>',
                '<div class="contact-actions">',
                    '<a class="button button-light" href="mailto:', escapeHtml(profile.email), '">', escapeHtml(copy.contact.emailAction), '</a>',
                    externalLink(profile.linkedin, copy.common.linkedin, "text-link text-link-inverse"),
                    externalLink(profile.github, copy.common.github, "text-link text-link-inverse"),
                '</div>',
            '</div>',
            '<div class="contact-details">',
                '<a href="mailto:', escapeHtml(profile.email), '">', escapeHtml(profile.email), '</a>',
                '<span>', escapeHtml(copy.contact.location), '</span>',
            '</div>'
        ].join("");
    }

    function renderFooter(copy) {
        return [
            '<p>', escapeHtml(copy.footer.replace("{year}", String(new Date().getFullYear()))), '</p>',
            '<div class="footer-links">',
                externalLink(data.profile.github, copy.common.github, "footer-link"),
                externalLink(data.profile.linkedin, copy.common.linkedin, "footer-link"),
            '</div>'
        ].join("");
    }

    function updateMetadata(copy) {
        document.documentElement.lang = currentLanguage;
        document.title = copy.meta.title;
        document.querySelector('meta[name="description"]').setAttribute("content", copy.meta.description);
        document.querySelector('meta[property="og:title"]').setAttribute("content", copy.meta.title);
        document.querySelector('meta[property="og:description"]').setAttribute("content", copy.meta.description);
        document.querySelector('meta[property="og:locale"]').setAttribute("content", copy.meta.ogLocale);
        document.querySelector('meta[property="og:image:alt"]').setAttribute("content", copy.meta.imageAlt);
    }

    function updateChrome(copy) {
        document.querySelector(".skip-link").textContent = copy.a11y.skip;
        document.querySelector(".wordmark").setAttribute("aria-label", copy.a11y.home);
        document.querySelector(".language-switcher").setAttribute("aria-label", copy.a11y.language);
        siteNav.setAttribute("aria-label", copy.a11y.mainNavigation);

        document.querySelectorAll("[data-nav]").forEach(function (link) {
            link.textContent = copy.nav[link.dataset.nav];
        });

        languageButtons.forEach(function (button) {
            const isActive = button.dataset.language === currentLanguage;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        updateMenuLabel(copy);
    }

    function updateMenuLabel(copy) {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-label", isOpen ? copy.a11y.closeMenu : copy.a11y.openMenu);
    }

    function renderPage() {
        const copy = data.copy[currentLanguage];
        const renderers = {
            hero: renderHero,
            about: renderAbout,
            experience: renderExperience,
            technologies: renderTechnologies,
            projects: renderProjects,
            education: renderEducation,
            contact: renderContact,
            footer: renderFooter
        };

        renderTargets.forEach(function (target) {
            const renderer = renderers[target.dataset.render];
            if (renderer) {
                target.innerHTML = renderer(copy);
            }
        });

        updateMetadata(copy);
        updateChrome(copy);
    }

    function applyLanguage(language, persist) {
        currentLanguage = language === "en" ? "en" : "de";
        if (persist) {
            storeLanguage(currentLanguage);
        }
        renderPage();
    }

    function closeMenu(returnFocus) {
        header.classList.remove("nav-open");
        menuToggle.setAttribute("aria-expanded", "false");
        updateMenuLabel(data.copy[currentLanguage]);
        if (returnFocus) {
            menuToggle.focus();
        }
    }

    menuToggle.addEventListener("click", function () {
        const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
        header.classList.toggle("nav-open", willOpen);
        menuToggle.setAttribute("aria-expanded", String(willOpen));
        updateMenuLabel(data.copy[currentLanguage]);
    });

    siteNav.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
            closeMenu(false);
        }
    });

    languageButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            applyLanguage(button.dataset.language, true);
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && header.classList.contains("nav-open")) {
            closeMenu(true);
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth >= 1040 && header.classList.contains("nav-open")) {
            closeMenu(false);
        }
    });

    window.addEventListener("scroll", function () {
        header.classList.toggle("is-scrolled", window.scrollY > 8);
    }, { passive: true });

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    document.querySelectorAll("[data-nav]").forEach(function (link) {
                        const isCurrent = link.getAttribute("href") === "#" + entry.target.id;
                        link.classList.toggle("is-current", isCurrent);
                        if (isCurrent) {
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                }
            });
        }, { rootMargin: "-28% 0px -62%", threshold: 0 });

        document.querySelectorAll("main section[id]:not(#start)").forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    applyLanguage(currentLanguage, false);
}());
