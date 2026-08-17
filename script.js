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
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


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

    if (!navMenu || !menuToggle) return;

    navMenu.classList.add("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
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

    if (!navMenu || !menuToggle) return;

    navMenu.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
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

    if (!navMenu) return;

    if (navMenu.classList.contains("active")) {

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


/* Close menu after clicking navigation link */

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
    (event) => {

        if (!navMenu || !menuToggle) return;

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
    (event) => {

        if (
            event.key === "Escape" &&
            navMenu &&
            navMenu.classList.contains("active")
        ) {

            closeMobileMenu();

            menuToggle?.focus();

        }

    }
);


/* Close mobile menu when resizing to desktop */

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

    if (!themeToggle) return;

    const icon =
        themeToggle.querySelector("i");

    if (!icon) return;

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

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "dark") {

    body.classList.add("dark");

} else if (savedTheme === "light") {

    body.classList.remove("dark");

} else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
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

            localStorage.setItem(
                "portfolio-theme",
                isDark ? "dark" : "light"
            );

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

    if (!typingText) return;


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
        isDeleting ? 55 : 90;


    /* Word completely typed */

    if (
        !isDeleting &&
        charIndex >= currentWord.length
    ) {

        speed = 1800;

        isDeleting = true;

    }


    /* Word completely deleted */

    if (
        isDeleting &&
        charIndex <= 0
    ) {

        isDeleting = false;

        wordIndex =
            (wordIndex + 1) % words.length;

        speed = 400;

    }


    typingTimer =
        setTimeout(
            typeEffect,
            speed
        );

}


/* Start typing effect */

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

            element.classList.add("active");

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

                        if (entry.isIntersecting) {

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
                rootMargin: "0px 0px -50px 0px"
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

    if (!sections.length || !navLinks.length) {
        return;
    }


    const scrollPosition =
        window.scrollY +
        (header ? header.offsetHeight : 80) +
        80;


    let currentSection = "home";


    sections.forEach(
        section => {

            const sectionTop =
                section.offsetTop;

            if (
                scrollPosition >= sectionTop
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    navLinks.forEach(
        link => {

            const href =
                link.getAttribute("href");

            const isActive =
                href === `#${currentSection}`;


            link.classList.toggle(
                "active",
                isActive
            );

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

    if (!backToTop) return;


    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

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
    .querySelectorAll('a[href^="#"]')
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");


                    /*
                        Ignore empty "#"
                        links.

                        Important:
                        Your project buttons currently
                        use href="#". They will remain
                        inactive until you add real URLs.
                    */

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


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

    if (!formMessage) return;

    formMessage.textContent =
        message;

    formMessage.style.color =
        color;

}


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const nameInput =
                document.getElementById("name");

            const emailInput =
                document.getElementById("email");

            const subjectInput =
                document.getElementById("subject");

            const messageInput =
                document.getElementById("message");


            const name =
                nameInput?.value.trim() || "";

            const email =
                emailInput?.value.trim() || "";

            const subject =
                subjectInput?.value.trim() || "";

            const message =
                messageInput?.value.trim() || "";


            /* Reset message */

            showFormMessage(
                "",
                ""
            );


            /* Required field validation */

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


            /* Name validation */

            if (name.length < 2) {

                showFormMessage(
                    "Please enter a valid name.",
                    "#ef4444"
                );

                nameInput?.focus();

                return;

            }


            /* Email validation */

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


            /* Subject validation */

            if (subject.length < 3) {

                showFormMessage(
                    "Please enter a valid subject.",
                    "#ef4444"
                );

                subjectInput?.focus();

                return;

            }


            /* Message validation */

            if (message.length < 10) {

                showFormMessage(
                    "Please write a message of at least 10 characters.",
                    "#ef4444"
                );

                messageInput?.focus();

                return;

            }


            /*
                Frontend-only form.

                Since GitHub Pages does not provide
                a backend, mailto is used here.
            */

            const mailtoLink =
                "mailto:abhijeettiwari955@gmail.com" +
                "?subject=" +
                encodeURIComponent(subject) +
                "&body=" +
                encodeURIComponent(
                    `Hello Abhijeet,

Name: ${name}
Email: ${email}

Message:
${message}

Regards,
${name}`
                );


            showFormMessage(
                "Opening your email application...",
                "#22c55e"
            );


            /*
                Small delay gives the user time
                to see the success message.
            */

            setTimeout(
                () => {

                    window.location.href =
                        mailtoLink;

                },
                300
            );

        }
    );

}


/* =====================================================
   FORM INPUT - CLEAR ERROR MESSAGE
===================================================== */

if (contactForm && formMessage) {

    contactForm
        .querySelectorAll("input, textarea")
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
   HEADER SHADOW ON SCROLL
===================================================== */

function updateHeader() {

    if (!header) return;


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
            Close mobile menu with Escape.
        */

        if (
            event.key === "Escape" &&
            navMenu?.classList.contains("active")
        ) {

            closeMobileMenu();

        }

    }
);


/* =====================================================
   INITIAL PAGE SETUP
===================================================== */

function initializePage() {

    updateThemeIcon();

    updateActiveNav();

    updateBackToTop();

    updateHeader();

}


if (
    document.readyState === "loading"
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

            clearTimeout(typingTimer);

        }

    }
);
