/* =====================================================
   PORTFOLIO JAVASCRIPT
   Abhijeet Tiwari
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");
    const header = document.getElementById("header");

    const themeToggle = document.getElementById("themeToggle");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    const typingText = document.getElementById("typingText");

    const navLinks = document.querySelectorAll(".nav-link");
    const revealElements = document.querySelectorAll(".reveal");
    const skillCards = document.querySelectorAll(".skill-card");


    /* =====================================================
       PAGE LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {
                pageLoader.classList.add("hide");
            }

            document.body.classList.add("loaded");

        }, 700);

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            const icon = menuToggle.querySelector("i");

            if (icon) {

                if (isOpen) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

            document.body.classList.toggle("menu-open", isOpen);

        });


        /* Close menu after clicking nav link */

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

                document.body.classList.remove("menu-open");

            });

        });

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (navMenu) {
                navMenu.classList.remove("active");
            }

            if (menuToggle) {

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon = menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

            document.body.classList.remove("menu-open");

        }

    });


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-theme");

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (!icon) return;

        if (document.body.classList.contains("light-theme")) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark theme"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to dark theme"
            );

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light theme"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to light theme"
            );

        }

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("light-theme");

            const currentTheme =
                document.body.classList.contains("light-theme")
                    ? "light"
                    : "dark";

            localStorage.setItem(
                "portfolio-theme",
                currentTheme
            );

            updateThemeIcon();

        });

    }


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    if (typingText) {

        const typingWords = [
            "Web Developer",
            "Software Developer",
            "Frontend Developer",
            "CAD Designer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        const typingSpeed = 90;
        const deletingSpeed = 55;
        const pauseAfterWord = 1600;
        const pauseBeforeTyping = 400;


        function typeEffect() {

            const currentWord = typingWords[wordIndex];

            if (!deleting) {

                typingText.textContent =
                    currentWord.substring(0, charIndex + 1);

                charIndex++;


                if (charIndex === currentWord.length) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        pauseAfterWord
                    );

                    return;

                }

                setTimeout(
                    typeEffect,
                    typingSpeed
                );

            } else {

                typingText.textContent =
                    currentWord.substring(0, charIndex - 1);

                charIndex--;


                if (charIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) % typingWords.length;

                    setTimeout(
                        typeEffect,
                        pauseBeforeTyping
                    );

                    return;

                }

                setTimeout(
                    typeEffect,
                    deletingSpeed
                );

            }

        }


        setTimeout(typeEffect, 1000);

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    handleHeaderScroll();

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );


    function updateActiveNav() {

        const scrollPosition =
            window.scrollY + 150;

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (
                target === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    updateActiveNav();

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       SKILL PROGRESS ANIMATION
    ===================================================== */

    if (
        "IntersectionObserver" in window &&
        skillCards.length
    ) {

        const skillObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const progress =
                                entry.target.querySelector(
                                    ".progress span"
                                );


                            if (progress) {

                                const width =
                                    progress.style.width;

                                progress.style.width = "0%";


                                requestAnimationFrame(() => {

                                    setTimeout(() => {

                                        progress.style.width =
                                            width;

                                    }, 150);

                                });

                            }


                            entry.target.classList.add(
                                "skill-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.25
                }
            );


        skillCards.forEach(card => {

            skillObserver.observe(card);

        });

    }


    /* =====================================================
       BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .nav-cta"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function(event) {

                const ripple =
                    document.createElement("span");

                ripple.classList.add("ripple");


                const rect =
                    this.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;


                ripple.style.left =
                    `${event.clientX - rect.left - size / 2}px`;

                ripple.style.top =
                    `${event.clientY - rect.top - size / 2}px`;


                this.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });


    /* =====================================================
       PROFILE CARD MOUSE PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    const profileCard =
        document.querySelector(".profile-card");


    if (
        heroVisual &&
        profileCard &&
        window.matchMedia("(min-width: 992px)").matches
    ) {

        heroVisual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroVisual.getBoundingClientRect();


                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;


                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;


                const rotateX =
                    y * -6;

                const rotateY =
                    x * 6;


                profileCard.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                profileCard.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       DISABLE PARALLAX ON MOBILE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth < 992 &&
                profileCard
            ) {

                profileCard.style.transform =
                    "";

            }

        }
    );


    /* =====================================================
       CURRENT YEAR
       Works if HTML contains:
       <span id="currentYear"></span>
    ===================================================== */

    const currentYear =
        document.getElementById(
            "currentYear"
        );


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                navMenu
            ) {

                navMenu.classList.remove(
                    "active"
                );

                document.body.classList.remove(
                    "menu-open"
                );


                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        menuToggle.querySelector("i");


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }

        }
    );


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%cAbhijeet Tiwari Portfolio",
        "color:#00e5ff;font-size:18px;font-weight:bold;"
    );

    console.log(
        "%cMechanical Design Engineer & Web Developer",
        "color:#8b5cf6;font-size:13px;"
    );

});
