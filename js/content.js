(function () {
    "use strict";

    window.PORTFOLIO_DATA = {
        profile: {
            name: "Mehdi Nikbakht",
            role: "Senior Full-Stack .NET Developer",
            email: "m.nikbakht.dev@gmail.com",
            website: "https://mnikbakht.ir/",
            github: "https://github.com/MehdiNikbakhtDev",
            linkedin: "https://www.linkedin.com/in/mehdinikbakhtdev",
            image: "assets/img/profile-pic.jpg",
            resumeUrl: "",
            resumeRequestUrl: "mailto:m.nikbakht.dev@gmail.com?subject=CV%20Request%20-%20Mehdi%20Nikbakht"
        },

        experience: [
            {
                company: "Toperczer GesmbH",
                period: { de: "2024 – heute", en: "2024 – Present" },
                current: true,
                technologies: ["C#", ".NET", ".NET Framework", "ASP.NET Core", "Microsoft SQL Server", "Crystal Reports", "IIS", "WMS", "Zebra", "Barcode & Label Systems"],
                content: {
                    de: {
                        role: "Full-Stack .NET Entwickler / Softwareentwickler",
                        location: "Wien, Österreich",
                        summary: "Entwicklung und Integration geschäftskritischer Warehouse-Management- und Enterprise-Lösungen im österreichischen Produktionsumfeld.",
                        bullets: [
                            "Entwicklung und Weiterentwicklung von Enterprise-Software für Warehouse-Management-Systeme.",
                            "Entwicklung .NET-basierter Reporting-Komponenten und Integration von Crystal Reports in bestehende WMS- und Enterprise-Anwendungen.",
                            "Integration moderner .NET-Komponenten in etablierte Enterprise- und Legacy-Systeme.",
                            "Entwicklung von Barcode- und Label-Lösungen für Zebra-Geräte mit Code-128-Barcodes, Produktinformationen und Seriennummern.",
                            "Anpassung von Scan-Workflows auf Zebra- und Android-Geräten.",
                            "Datenbanknahe Entwicklung mit Microsoft SQL Server und SQL CLR sowie SQL-Performanceanalyse und Troubleshooting.",
                            "IIS-Deployment von .NET-, API-, Gateway- und Reporting-Komponenten sowie Fehleranalyse über Application-, Reporting- und Database-Layer hinweg."
                        ]
                    },
                    en: {
                        role: "Full-Stack .NET Developer / Software Developer",
                        location: "Vienna, Austria",
                        summary: "Developing and integrating business-critical warehouse management and enterprise solutions in an Austrian production environment.",
                        bullets: [
                            "Developing and enhancing enterprise software for warehouse management systems.",
                            "Building .NET-based reporting components and integrating Crystal Reports into established WMS and enterprise applications.",
                            "Integrating modern .NET components into established enterprise and legacy systems.",
                            "Developing barcode and label solutions for Zebra devices using Code 128 barcodes, product information and serial numbers.",
                            "Adapting scanning workflows on Zebra and Android devices.",
                            "Database-focused development with Microsoft SQL Server and SQL CLR, including SQL performance analysis and troubleshooting.",
                            "Deploying .NET, API, gateway and reporting components to IIS and troubleshooting across application, reporting and database layers."
                        ]
                    }
                }
            },
            {
                company: "Farda Informatics",
                period: { de: "01/2022 – 2024", en: "01/2022 – 2024" },
                current: false,
                technologies: ["C#", ".NET", "ASP.NET Core", "Entity Framework", "Microsoft SQL Server", "Angular"],
                content: {
                    de: {
                        role: "Full-Stack Webentwickler",
                        location: "Teheran, Iran",
                        summary: "Full-Stack-Entwicklung im Umfeld geschäftskritischer Banking-Software und webbasierter Zahlungssysteme für die Ayandeh Bank.",
                        bullets: [
                            "Entwicklung geschäftskritischer Banking-Software und webbasierter Zahlungssysteme.",
                            "Mitarbeit an Architektur, Lösungsdesign und sicherheitsbezogenen Anwendungskomponenten.",
                            "Implementierung von Backend-Services, Datenbankfunktionen und Webanwendungen.",
                            "Full-Stack-Entwicklung mit ASP.NET Core, Entity Framework, SQL Server und Angular."
                        ]
                    },
                    en: {
                        role: "Full-Stack Web Developer",
                        location: "Tehran, Iran",
                        summary: "Full-Stack development for business-critical banking software and web-based payment systems for Ayandeh Bank.",
                        bullets: [
                            "Developed business-critical banking software and web-based payment systems.",
                            "Contributed to architecture, solution design and security-related application components.",
                            "Implemented backend services, database functionality and web applications.",
                            "Delivered Full-Stack functionality with ASP.NET Core, Entity Framework, SQL Server and Angular."
                        ]
                    }
                }
            },
            {
                company: "Faranam",
                period: { de: "02/2019 – 01/2022", en: "02/2019 – 01/2022" },
                current: false,
                technologies: ["C#", "ASP.NET MVC", "Entity Framework", "Web API", "Kendo UI", "Microsoft SQL Server", "T-SQL", "SSIS"],
                content: {
                    de: {
                        role: ".NET Full-Stack Entwickler",
                        location: "Teheran, Iran",
                        summary: "Entwicklung von Enterprise- und Webanwendungen für Finanz-, Banking- und Zahlungsprozesse.",
                        bullets: [
                            "Entwicklung datenbankgestützter Enterprise- und Webanwendungen im Finanz- und Bankenumfeld.",
                            "Konzeption und Implementierung von Business Services für Paya und Satna mit Web API und SQL.",
                            "Migration und Optimierung bestehender Abläufe mit rund 40 % schnellerer Ausführung.",
                            "Datenbankentwicklung und Datenintegration mit Microsoft SQL Server, T-SQL und SSIS.",
                            "Entwicklung und Integration von Web Services für geschäftskritische Anwendungen."
                        ]
                    },
                    en: {
                        role: ".NET Full-Stack Developer",
                        location: "Tehran, Iran",
                        summary: "Developed enterprise and web applications supporting financial, banking and payment processes.",
                        bullets: [
                            "Developed database-driven enterprise and web applications in financial and banking environments.",
                            "Designed and implemented business services for Paya and Satna using Web API and SQL.",
                            "Migrated and optimized established workflows, improving execution speed by approximately 40%.",
                            "Delivered database development and data integration with Microsoft SQL Server, T-SQL and SSIS.",
                            "Developed and integrated web services for business-critical applications."
                        ]
                    }
                }
            }
        ],

        technologyGroups: [
            {
                id: "backend",
                label: { de: "Backend", en: "Backend" },
                items: ["C#", ".NET", ".NET Core", "ASP.NET Core", "ASP.NET MVC", "Entity Framework", "Dapper", "LINQ", "Web API", "REST APIs"]
            },
            {
                id: "frontend",
                label: { de: "Frontend", en: "Frontend" },
                items: ["Angular", "JavaScript", "jQuery", "Kendo UI", "HTML", "CSS"]
            },
            {
                id: "databases",
                label: { de: "Datenbanken", en: "Databases" },
                items: ["Microsoft SQL Server", "T-SQL", "PostgreSQL", "SSIS", "Database Design", "SQL Performance Analysis"]
            },
            {
                id: "enterprise",
                label: { de: "Enterprise & Integration", en: "Enterprise & Integration" },
                items: ["Warehouse Management Systems", "Crystal Reports", "Reporting Systems", "System Integration", "Barcode Systems", "Zebra Devices", "Label Printing", "Windows Applications", "Web Applications"]
            },
            {
                id: "architecture",
                label: { de: "Architektur & Engineering", en: "Architecture & Engineering" },
                items: ["Clean Architecture", "Microservices", "Design Patterns", "SOLID", "Clean Code", "Unit Testing"]
            },
            {
                id: "tools",
                label: { de: "Tools & Deployment", en: "Tools & Deployment" },
                items: ["Git", "TFS", "IIS", "Application Deployment", "SQL Server Management"]
            }
        ],

        education: [
            {
                institution: { de: "Universität Mazandaran, Iran", en: "University of Mazandaran, Iran" },
                degree: { de: "Masterstudium Computerwissenschaften", en: "Master's degree in Computer Science" },
                period: "2014 – 2016",
                focus: { de: "Computerwissenschaften", en: "Computer Science" }
            },
            {
                institution: { de: "PAYAM Hochschule, Iran", en: "PAYAM University, Iran" },
                degree: { de: "Bachelorstudium", en: "Bachelor's degree" },
                period: "2010 – 2014",
                focus: { de: "Softwaredesign und -implementierung", en: "Software Design and Implementation" }
            }
        ],

        languages: [
            { name: { de: "Deutsch", en: "German" }, level: null, needsConfirmation: true },
            { name: { de: "Englisch", en: "English" }, level: null, needsConfirmation: true },
            { name: { de: "Persisch", en: "Persian" }, level: { de: "Muttersprache", en: "Native" }, needsConfirmation: false }
        ],

        copy: {
            de: {
                meta: {
                    title: "Mehdi Nikbakht | Senior Full-Stack .NET Entwickler in Wien",
                    description: "Senior Full-Stack .NET Entwickler in Wien mit über 7 Jahren Erfahrung in C#, .NET, SQL Server, Enterprise Software, Banking-Systemen und Warehouse Management.",
                    ogLocale: "de_AT",
                    imageAlt: "Porträt von Mehdi Nikbakht"
                },
                a11y: {
                    skip: "Zum Inhalt springen",
                    home: "Mehdi Nikbakht – Startseite",
                    mainNavigation: "Hauptnavigation",
                    language: "Sprache auswählen",
                    openMenu: "Navigation öffnen",
                    closeMenu: "Navigation schließen",
                    external: "öffnet in einem neuen Tab"
                },
                nav: {
                    about: "Über mich",
                    experience: "Berufserfahrung",
                    technologies: "Technologien",
                    projects: "Projekte",
                    education: "Ausbildung",
                    contact: "Kontakt"
                },
                hero: {
                    eyebrow: "Full-Stack Softwareentwickler aus Wien",
                    description: "Full-Stack .NET Entwickler mit über 7 Jahren Berufserfahrung in der Entwicklung, Modernisierung und Integration geschäftskritischer Unternehmenssoftware.",
                    technologyLine: "C# · .NET · SQL Server · Enterprise Software · System Integration",
                    location: "Wien, Österreich",
                    primaryCta: "Berufserfahrung",
                    resumeCta: "Lebenslauf anfragen",
                    currentLabel: "Aktuell",
                    currentRole: "Enterprise-Software & WMS bei Toperczer GesmbH",
                    facts: [
                        { value: "7+", label: "Jahre Berufserfahrung" },
                        { value: "Wien", label: "Österreich" },
                        { value: "C# / .NET", label: "SQL Server" }
                    ]
                },
                about: {
                    kicker: "Profil",
                    title: "Über mich",
                    lead: "Enterprise .NET Software Engineer mit Erfahrung in Warehouse Management, Banking, Zahlungssystemen, Reporting und Systemintegration.",
                    paragraphs: [
                        "Ich bin Full-Stack .NET Entwickler mit über sieben Jahren Berufserfahrung und arbeite derzeit in Wien, Österreich. Mein technologischer Schwerpunkt liegt auf C#, .NET, ASP.NET Core und Microsoft SQL Server.",
                        "Ich arbeite über den gesamten Software-Lifecycle hinweg – von Anforderungsanalyse und Lösungsdesign über Implementierung und Systemintegration bis hin zu Deployment, Fehleranalyse und Optimierung produktiver Systeme.",
                        "Besonders interessant finde ich komplexe Integrations- und Performance-Probleme sowie die Modernisierung bestehender Enterprise-Systeme durch moderne .NET-Komponenten."
                    ],
                    focusTitle: "Fachlicher Fokus",
                    focusItems: ["Enterprise Software", "Warehouse Management Systems", "Banking & Payment Systems", "Reporting", "System Integration"],
                    personal: "Außerhalb der Arbeit verbringe ich gerne Zeit in der Natur und in den Bergen und verfolge aktuelle Entwicklungen in der Softwaretechnik."
                },
                experience: {
                    kicker: "Beruflicher Werdegang",
                    title: "Berufserfahrung",
                    intro: "Über sieben Jahre Entwicklung datenbankintensiver und geschäftskritischer Software – heute mit professioneller Erfahrung in Österreich.",
                    current: "Aktuelle Position",
                    responsibilities: "Schwerpunkte"
                },
                technologies: {
                    kicker: "Kompetenzen",
                    title: "Technologien",
                    intro: "Ein pragmatisches .NET- und SQL-Fundament für stabile Enterprise-Anwendungen, Integrationen und produktive Systeme."
                },
                projects: {
                    kicker: "Öffentlicher Code",
                    title: "Projekte",
                    intro: "Qualität vor Quantität: Professionelle Kundensysteme bleiben vertraulich, öffentliche Arbeiten werden bewusst kuratiert.",
                    cardLabel: "GitHub-Profil",
                    cardTitle: "Öffentliche Engineering-Beispiele",
                    cardText: "Meine geschäftskritische Arbeit entsteht überwiegend in privaten Unternehmensumgebungen. Auf GitHub finden Sie .NET-, Architektur- und Integrationsexperimente; ausführliche öffentliche Fallstudien werden ergänzt, sobald Dokumentation und Quellcode dem Qualitätsstandard dieses Portfolios entsprechen.",
                    action: "GitHub ansehen"
                },
                education: {
                    kicker: "Hintergrund",
                    title: "Ausbildung & Sprachen",
                    educationLabel: "Ausbildung",
                    languagesLabel: "Sprachen",
                    focusLabel: "Schwerpunkt"
                },
                contact: {
                    kicker: "Kontakt",
                    title: "Lassen Sie uns über anspruchsvolle Software sprechen.",
                    text: "Interesse an einer Zusammenarbeit oder einem technischen Austausch? Ich freue mich über interessante .NET-, Backend- und Full-Stack-Projekte sowie anspruchsvolle Enterprise-Softwarelösungen.",
                    emailAction: "E-Mail schreiben",
                    location: "Wien, Österreich"
                },
                common: {
                    github: "GitHub",
                    linkedin: "LinkedIn",
                    email: "E-Mail"
                },
                footer: "© {year} Mehdi Nikbakht · Full-Stack .NET Developer · Wien"
            },

            en: {
                meta: {
                    title: "Mehdi Nikbakht | Senior Full-Stack .NET Developer in Vienna",
                    description: "Senior Full-Stack .NET Developer based in Vienna with 7+ years of experience in C#, .NET, SQL Server, enterprise software, banking systems and warehouse management solutions.",
                    ogLocale: "en_GB",
                    imageAlt: "Portrait of Mehdi Nikbakht"
                },
                a11y: {
                    skip: "Skip to content",
                    home: "Mehdi Nikbakht – Home",
                    mainNavigation: "Main navigation",
                    language: "Select language",
                    openMenu: "Open navigation",
                    closeMenu: "Close navigation",
                    external: "opens in a new tab"
                },
                nav: {
                    about: "About",
                    experience: "Experience",
                    technologies: "Technologies",
                    projects: "Projects",
                    education: "Education",
                    contact: "Contact"
                },
                hero: {
                    eyebrow: "Full-Stack Software Developer based in Vienna",
                    description: "Full-Stack .NET Developer with 7+ years of professional experience developing, modernizing and integrating business-critical enterprise software.",
                    technologyLine: "C# · .NET · SQL Server · Enterprise Software · System Integration",
                    location: "Vienna, Austria",
                    primaryCta: "View Experience",
                    resumeCta: "Request CV",
                    currentLabel: "Current",
                    currentRole: "Enterprise software & WMS at Toperczer GesmbH",
                    facts: [
                        { value: "7+", label: "Years' experience" },
                        { value: "Vienna", label: "Austria" },
                        { value: "C# / .NET", label: "SQL Server" }
                    ]
                },
                about: {
                    kicker: "Profile",
                    title: "About Me",
                    lead: "Enterprise .NET Software Engineer with experience across warehouse management, banking, payment systems, reporting and system integration.",
                    paragraphs: [
                        "I am a Full-Stack .NET Developer with more than seven years of professional experience, currently working in Vienna, Austria. My main technology focus is C#, .NET, ASP.NET Core and Microsoft SQL Server.",
                        "I work across the complete software lifecycle — from requirements analysis and solution design to implementation, system integration, deployment, troubleshooting and production optimization.",
                        "I particularly enjoy solving complex integration and performance problems and modernizing established enterprise systems with modern .NET components."
                    ],
                    focusTitle: "Professional focus",
                    focusItems: ["Enterprise Software", "Warehouse Management Systems", "Banking & Payment Systems", "Reporting", "System Integration"],
                    personal: "Outside work, I enjoy spending time outdoors and in the mountains, and I follow current developments in software engineering."
                },
                experience: {
                    kicker: "Career progression",
                    title: "Professional Experience",
                    intro: "More than seven years developing database-intensive and business-critical software — now with professional experience in Austria.",
                    current: "Current position",
                    responsibilities: "Key responsibilities"
                },
                technologies: {
                    kicker: "Capabilities",
                    title: "Technologies",
                    intro: "A pragmatic .NET and SQL foundation for stable enterprise applications, integrations and production systems."
                },
                projects: {
                    kicker: "Public code",
                    title: "Projects",
                    intro: "Quality over quantity: professional client systems remain confidential, while public work is curated deliberately.",
                    cardLabel: "GitHub profile",
                    cardTitle: "Public engineering samples",
                    cardText: "Most of my business-critical work is delivered in private company environments. My GitHub profile contains .NET, architecture and integration experiments; detailed public case studies will be added when their documentation and source quality meet this portfolio's standard.",
                    action: "View GitHub"
                },
                education: {
                    kicker: "Background",
                    title: "Education & Languages",
                    educationLabel: "Education",
                    languagesLabel: "Languages",
                    focusLabel: "Focus"
                },
                contact: {
                    kicker: "Contact",
                    title: "Let's discuss serious software engineering.",
                    text: "Interested in working together or discussing software engineering opportunities? I'm always open to interesting .NET, backend and Full-Stack projects involving complex enterprise systems.",
                    emailAction: "Send an email",
                    location: "Vienna, Austria"
                },
                common: {
                    github: "GitHub",
                    linkedin: "LinkedIn",
                    email: "Email"
                },
                footer: "© {year} Mehdi Nikbakht · Full-Stack .NET Developer · Vienna"
            }
        }
    };
}());
