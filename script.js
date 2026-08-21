/* =========================================================
   PROFESSIONAL PORTFOLIO JAVASCRIPT
   Abhijeet Tiwari
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initYear();

    initMobileMenu();

    initTheme();

    initTypingEffect();

    initProfileUpload();

    initRevealAnimation();

    initActiveNavigation();

    initBackToTop();

    initContactForm();

    initScrollProgress();

    initHeaderScroll();

});


/* =========================================================
   YEAR
========================================================= */

function initYear() {

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");

    if (!menuToggle || !navMenu) {
        return;
    }


    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navMenu.classList.toggle("open");


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close menu"
                    : "Open menu"
            );


            menuToggle.innerHTML =
                isOpen
                    ? '<i class="fas fa-xmark"></i>'
                    : '<i class="fas fa-bars"></i>';

        }
    );


    navMenu
        .querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open menu"
                    );

                    menuToggle.innerHTML =
                        '<i class="fas fa-bars"></i>';

                }
            );

        });


    document.addEventListener(
        "click",
        event => {

            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                navMenu.classList.remove(
                    "open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML =
                    '<i class="fas fa-bars"></i>';

            }

        }
    );

}


/* =========================================================
   THEME
========================================================= */

function initTheme() {

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );

    if (!themeToggle) {
        return;
    }


    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );


    const systemDark =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;


    const shouldUseDark =
        savedTheme === "dark" ||
        (!savedTheme && systemDark);


    if (shouldUseDark) {

        document.body.classList.add(
            "dark"
        );

    }


    updateThemeIcon(
        themeToggle
    );


    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            const isDark =
                document.body.classList.contains(
                    "dark"
                );


            localStorage.setItem(
                "portfolio-theme",
                isDark
                    ? "dark"
                    : "light"
            );


            updateThemeIcon(
                themeToggle
            );

        }
    );

}


function updateThemeIcon(button) {

    const isDark =
        document.body.classList.contains(
            "dark"
        );


    button.innerHTML =
        isDark
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';


    button.setAttribute(
        "aria-label",
        isDark
            ? "Switch to light mode"
            : "Switch to dark mode"
    );

}


/* =========================================================
   TYPING EFFECT
========================================================= */

function initTypingEffect() {

    const typingText =
        document.getElementById(
            "typingText"
        );

    if (!typingText) {
        return;
    }


    const roles = [

        "Mechanical Engineer",

        "Web Developer",

        "CAD Designer",

        "Frontend Developer",

        "Engineering Professional"

    ];


    let roleIndex = 0;

    let charIndex = 0;

    let deleting = false;


    function type() {

        const currentRole =
            roles[roleIndex];


        if (!deleting) {

            typingText.textContent =
                currentRole.substring(
                    0,
                    charIndex + 1
                );


            charIndex++;


            if (
                charIndex >=
                currentRole.length
            ) {

                deleting = true;

                setTimeout(
                    type,
                    1400
                );

                return;

            }

        } else {

            typingText.textContent =
                currentRole.substring(
                    0,
                    charIndex - 1
                );


            charIndex--;


            if (charIndex <= 0) {

                charIndex = 0;

                deleting = false;

                roleIndex =
                    (roleIndex + 1)
                    % roles.length;

            }

        }


        setTimeout(
            type,
            deleting ? 45 : 80
        );

    }


    type();

}


/* =========================================================
   PROFILE PHOTO
========================================================= */

function initProfileUpload() {

    const profileUpload =
        document.getElementById(
            "profileUpload"
        );

    const profileImage =
        document.getElementById(
            "profileImage"
        );


    if (
        !profileUpload ||
        !profileImage
    ) {

        return;

    }


    const savedPhoto =
        localStorage.getItem(
            "profile-photo"
        );


    if (savedPhoto) {

        profileImage.src =
            savedPhoto;

    }


    profileUpload.addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];


            if (!file) {
                return;
            }


            const validTypes = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];


            if (
                !validTypes.includes(
                    file.type
                )
            ) {

                alert(
                    "Please select a JPG, PNG or WEBP image."
                );

                event.target.value = "";

                return;

            }


            const maxSize =
                5 * 1024 * 1024;


            if (file.size > maxSize) {

                alert(
                    "Please select an image smaller than 5MB."
                );

                event.target.value = "";

                return;

            }


            const reader =
                new FileReader();


            reader.onload = event => {

                const imageData =
                    event.target.result;


                profileImage.src =
                    imageData;


                try {

                    localStorage.setItem(
                        "profile-photo",
                        imageData
                    );

                } catch (error) {

                    console.warn(
                        "Could not save profile image.",
                        error
                    );

                }

            };


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initRevealAnimation() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) {
        return;
    }


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "show"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
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
                    "0px 0px -40px 0px"
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    if (
        !sections.length ||
        !navLinks.length
    ) {

        return;

    }


    const updateActiveLink = () => {

        const scrollPosition =
            window.scrollY + 180;


        let currentSection = "";


        sections.forEach(
            section => {

                const top =
                    section.offsetTop;

                const height =
                    section.offsetHeight;


                if (
                    scrollPosition >= top &&
                    scrollPosition <
                        top + height
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


                link.classList.toggle(
                    "active",
                    href ===
                    `#${currentSection}`
                );

            }
        );

    };


    window.addEventListener(
        "scroll",
        updateActiveLink,
        {
            passive: true
        }
    );


    updateActiveLink();

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    if (!backToTop) {
        return;
    }


    const updateButton =
        () => {

            backToTop.classList.toggle(
                "show",
                window.scrollY > 500
            );

        };


    window.addEventListener(
        "scroll",
        updateButton,
        {
            passive: true
        }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateButton();

}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function initHeaderScroll() {

    const header =
        document.querySelector(
            ".header"
        );


    if (!header) {
        return;
    }


    const updateHeader =
        () => {

            header.classList.toggle(
                "scrolled",
                window.scrollY > 20
            );

        };


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function initScrollProgress() {

    const progress =
        document.createElement(
            "div"
        );


    progress.className =
        "scroll-progress";


    document.body.prepend(
        progress
    );


    const updateProgress =
        () => {

            const scrollTop =
                window.scrollY;


            const documentHeight =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;


            const percentage =
                documentHeight > 0
                    ? (
                        scrollTop /
                        documentHeight
                    ) * 100
                    : 0;


            progress.style.width =
                `${percentage}%`;

        };


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        updateProgress
    );


    updateProgress();

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    const formMessage =
        document.getElementById(
            "formMessage"
        );


    if (!contactForm) {
        return;
    }


    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    ?.value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    ?.value
                    .trim();


            const subject =
                document
                    .getElementById("subject")
                    ?.value
                    .trim();


            const message =
                document
                    .getElementById("message")
                    ?.value
                    .trim();


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                showFormMessage(
                    formMessage,
                    "Please fill in all fields.",
                    "error"
                );

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                showFormMessage(
                    formMessage,
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }


            const mailSubject =
                encodeURIComponent(
                    subject
                );


            const mailBody =
                encodeURIComponent(

                    `Name: ${name}\n` +
                    `Email: ${email}\n\n` +
                    `Message:\n${message}`

                );


            showFormMessage(
                formMessage,
                "Opening your email application...",
                "success"
            );


            setTimeout(
                () => {

                    window.location.href =
                        "mailto:abhijeettiwari955@gmail.com" +
                        `?subject=${mailSubject}` +
                        `&body=${mailBody}`;

                },
                300
            );

        }
    );

}


/* =========================================================
   FORM MESSAGE
========================================================= */

function showFormMessage(
    element,
    message,
    type = "success"
) {

    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.style.color =
        type === "error"
            ? "#ef4444"
            : "#10b981";

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        const navMenu =
            document.getElementById(
                "navMenu"
            );

        const menuToggle =
            document.getElementById(
                "menuToggle"
            );


        if (
            navMenu &&
            navMenu.classList.contains(
                "open"
            )
        ) {

            navMenu.classList.remove(
                "open"
            );


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML =
                    '<i class="fas fa-bars"></i>';

            }

        }

    }
);
