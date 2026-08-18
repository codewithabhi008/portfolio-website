/* =====================================================
   ABHIJEET TIWARI PORTFOLIO
   Main JavaScript
===================================================== */

"use strict";


/* =====================================================
   DOM ELEMENTS
===================================================== */

const body = document.body;

const header = document.querySelector(".header");

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const themeToggle = document.getElementById("themeToggle");

const typingText = document.getElementById("typingText");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const backToTop = document.getElementById("backToTop");

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const revealElements = document.querySelectorAll(".reveal");

const yearElement = document.getElementById("year");


/* =====================================================
   SETTINGS
===================================================== */

const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =====================================================
   ENABLE JAVASCRIPT MODE
===================================================== */

/*
   CSS mein .js-enabled ke through
   scroll reveal animation control hoti hai.
*/

body.classList.add("js-enabled");


/* =====================================================
   CURRENT YEAR
===================================================== */

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

function openMobileMenu() {

    if (!navMenu || !menuToggle) {
        return;
    }

    navMenu.classList.add("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    menuToggle.setAttribute(
        "title",
        "Close navigation menu"
    );

    const icon =
        menuToggle.querySelector("i");

    if (icon) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    }

}


function closeMobileMenu() {

    if (!navMenu || !menuToggle) {
        return;
    }

    navMenu.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    menuToggle.setAttribute(
        "title",
        "Open navigation menu"
    );

    const icon =
        menuToggle.querySelector("i");

    if (icon) {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

}


function toggleMobileMenu() {

    if (!navMenu) {
        return;
    }

    if (
        navMenu.classList.contains("active")
    ) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }

}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );

}


/* Close menu after navigation click */

navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            closeMobileMenu();

        }
    );

});


/* Close menu when clicking outside */

document.addEventListener(
    "click",
    event => {

        if (!navMenu || !menuToggle) {
            return;
        }

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedMenuButton &&
            navMenu.classList.contains("active")
        ) {

            closeMobileMenu();

        }

    }
);


/* Close menu with Escape */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            navMenu?.classList.contains("active")
        ) {

            closeMobileMenu();

            menuToggle?.focus();

        }

    }
);


/* Close menu on desktop resize */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 700 &&
            navMenu?.classList.contains("active")
        ) {

            closeMobileMenu();

        }

    }
);


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

function updateThemeIcon() {

    if (!themeToggle) {
        return;
    }

    const icon =
        themeToggle.querySelector("i");

    if (!icon) {
        return;
    }

    const isDark =
        body.classList.contains("dark");


    if (isDark) {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to light mode"
        );

        themeToggle.setAttribute(
            "aria-pressed",
            "true"
        );

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "aria-pressed",
            "false"
        );

    }

}


/* Load saved theme */

let savedTheme = null;

try {

    savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );

} catch (error) {

    savedTheme = null;

}


if (savedTheme === "dark") {

    body.classList.add("dark");

} else if (savedTheme === "light") {

    body.classList.remove("dark");

} else if (
    window.matchMedia &&
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches
) {

    body.classList.add("dark");

}


updateThemeIcon();


/* Theme toggle */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const isDark =
                body.classList.toggle("dark");

            try {

                localStorage.setItem(
                    "portfolio-theme",
                    isDark
                        ? "dark"
                        : "light"
                );

            } catch (error) {

                /* Storage unavailable */

            }

            updateThemeIcon();

        }
    );

}


/* =====================================================
   TYPING EFFECT
===================================================== */

const words = [
    "Web Developer",
    "Frontend Developer",
    "UI Designer",
    "Problem Solver"
];


let wordIndex = 0;

let charIndex = 0;

let isDeleting = false;

let typingTimer = null;


function typeEffect() {

    if (!typingText) {
        return;
    }


    const currentWord =
        words[wordIndex];


    if (!isDeleting) {

        charIndex++;

        typingText.textContent =
            currentWord.substring(
                0,
                charIndex
            );

    } else {

        charIndex--;

        typingText.textContent =
            currentWord.substring(
                0,
                charIndex
            );

    }


    let speed =
        isDeleting
            ? 55
            : 90;


    /* Word completed */

    if (
        !isDeleting &&
        charIndex >= currentWord.length
    ) {

        speed = 1800;

        isDeleting = true;

    }


    /* Word deleted */

    if (
        isDeleting &&
        charIndex <= 0
    ) {

        isDeleting = false;

        wordIndex =
            (wordIndex + 1) %
            words.length;

        speed = 400;

    }


    typingTimer =
        setTimeout(
            typeEffect,
            speed
        );

}


/* Start typing */

if (typingText) {

    if (prefersReducedMotion) {

        typingText.textContent =
            words[0];

    } else {

        typingText.textContent = "";

        typeEffect();

    }

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

function activateRevealElements() {

    revealElements.forEach(
        element => {

            element.classList.add(
                "active"
            );

        }
    );

}


if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
) {

    activateRevealElements();

} else {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

}


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

function updateActiveNav() {

    if (
        !sections.length ||
        !navLinks.length
    ) {

        return;

    }


    const headerHeight =
        header
            ? header.offsetHeight
            : 80;


    const scrollPosition =
        window.scrollY +
        headerHeight +
        100;


    let currentSection =
        sections[0]?.id || "home";


    sections.forEach(
        section => {

            const sectionTop =
                section.offsetTop;


            if (
                scrollPosition >=
                sectionTop
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    navLinks.forEach(
        link => {

            const href =
                link.getAttribute(
                    "href"
                );


            const isActive =
                href ===
                `#${currentSection}`;


            link.classList.toggle(
                "active",
                isActive
            );


            if (isActive) {

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                link.removeAttribute(
                    "aria-current"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNav,
    {
        passive: true
    }
);


/* =====================================================
   BACK TO TOP
===================================================== */

function updateBackToTop() {

    if (!backToTop) {
        return;
    }


    if (window.scrollY > 500) {

        backToTop.classList.add(
            "show"
        );

    } else {

        backToTop.classList.remove(
            "show"
        );

    }

}


window.addEventListener(
    "scroll",
    updateBackToTop,
    {
        passive: true
    }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"

            });

        }
    );

}


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    /*
                       Ignore empty # links.
                    */

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    let target = null;

                    try {

                        target =
                            document.querySelector(
                                targetId
                            );

                    } catch (error) {

                        return;

                    }


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    closeMobileMenu();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;


                    window.scrollTo({

                        top:
                            Math.max(
                                0,
                                targetPosition
                            ),

                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth"

                    });


                    /*
                       Update URL without
                       forcing browser jump.
                    */

                    if (
                        history.pushState
                    ) {

                        try {

                            history.pushState(
                                null,
                                "",
                                targetId
                            );

                        } catch (error) {

                            /* Ignore */

                        }

                    }

                }
            );

        }
    );


/* =====================================================
   CONTACT FORM
===================================================== */

function showFormMessage(
    message,
    color
) {

    if (!formMessage) {
        return;
    }


    formMessage.textContent =
        message;


    formMessage.style.color =
        color;


    if (message) {

        formMessage.setAttribute(
            "role",
            "status"
        );

    } else {

        formMessage.removeAttribute(
            "role"
        );

    }

}


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const nameInput =
                document.getElementById(
                    "name"
                );

            const emailInput =
                document.getElementById(
                    "email"
                );

            const subjectInput =
                document.getElementById(
                    "subject"
                );

            const messageInput =
                document.getElementById(
                    "message"
                );


            const name =
                nameInput?.value.trim() || "";


            const email =
                emailInput?.value.trim() || "";


            const subject =
                subjectInput?.value.trim() || "";


            const message =
                messageInput?.value.trim() || "";


            /* Clear previous message */

            showFormMessage(
                "",
                ""
            );


            /* =================================================
               REQUIRED FIELD VALIDATION
            ================================================= */

            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                showFormMessage(
                    "Please fill in all fields.",
                    "#ef4444"
                );

                return;

            }


            /* =================================================
               NAME VALIDATION
            ================================================= */

            if (
                name.length < 2
            ) {

                showFormMessage(
                    "Please enter a valid name.",
                    "#ef4444"
                );

                nameInput?.focus();

                return;

            }


            /* =================================================
               EMAIL VALIDATION
            ================================================= */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


            if (
                !emailPattern.test(email)
            ) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "#ef4444"
                );

                emailInput?.focus();

                return;

            }


            /* =================================================
               SUBJECT VALIDATION
            ================================================= */

            if (
                subject.length < 3
            ) {

                showFormMessage(
                    "Please enter a valid subject.",
                    "#ef4444"
                );

                subjectInput?.focus();

                return;

            }


            /* =================================================
               MESSAGE VALIDATION
            ================================================= */

            if (
                message.length < 10
            ) {

                showFormMessage(
                    "Please write a message of at least 10 characters.",
                    "#ef4444"
                );

                messageInput?.focus();

                return;

            }


            /* =================================================
               EMAIL CLIENT
            ================================================= */

            const mailtoSubject =
                encodeURIComponent(
                    subject
                );


            const mailtoBody =
                encodeURIComponent(
`Hello Abhijeet,

Name: ${name}
Email: ${email}

Message:
${message}

Regards,
${name}`
                );


            const mailtoLink =
                `mailto:abhijeettiwari955@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;


            showFormMessage(
                "Opening your email application...",
                "#22c55e"
            );


            /*
               Small delay so the success
               message can be seen.
            */

            setTimeout(
                () => {

                    window.location.href =
                        mailtoLink;

                },
                400
            );

        }
    );

}


/* =====================================================
   FORM INPUT - CLEAR MESSAGE
===================================================== */

if (
    contactForm &&
    formMessage
) {

    contactForm
        .querySelectorAll(
            "input, textarea"
        )
        .forEach(
            input => {

                input.addEventListener(
                    "input",
                    () => {

                        formMessage.textContent = "";

                    }
                );

            }
        );

}


/* =====================================================
   HEADER SCROLL EFFECT
===================================================== */

function updateHeader() {

    if (!header) {
        return;
    }


    if (window.scrollY > 20) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


/* =====================================================
   KEYBOARD ACCESSIBILITY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        /*
           Escape = close mobile menu
        */

        if (
            event.key === "Escape" &&
            navMenu?.classList.contains(
                "active"
            )
        ) {

            closeMobileMenu();

        }

    }
);


/* =====================================================
   SYSTEM THEME CHANGE
===================================================== */

if (
    window.matchMedia
) {

    const systemTheme =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );


    systemTheme.addEventListener?.(
        "change",
        event => {

            /*
               Only follow system theme
               when user has not manually
               selected a theme.
            */

            let manualTheme = null;

            try {

                manualTheme =
                    localStorage.getItem(
                        "portfolio-theme"
                    );

            } catch (error) {

                manualTheme = null;

            }


            if (manualTheme) {
                return;
            }


            body.classList.toggle(
                "dark",
                event.matches
            );


            updateThemeIcon();

        }
    );

}


/* =====================================================
   INITIAL PAGE SETUP
===================================================== */

function initializePage() {

    updateThemeIcon();

    updateActiveNav();

    updateBackToTop();

    updateHeader();

}


/* Run initialization */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializePage
    );

} else {

    initializePage();

}


/* =====================================================
   CLEANUP
===================================================== */

window.addEventListener(
    "beforeunload",
    () => {

        if (typingTimer) {

            clearTimeout(
                typingTimer
            );

            typingTimer = null;

        }

    }
);
