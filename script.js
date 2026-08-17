/* =====================================================
   ABHIJEET TIWARI PORTFOLIO
   Main JavaScript
===================================================== */


/* ================= DOM ELEMENTS ================= */

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


/* =====================================================
   MOBILE MENU
===================================================== */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (!icon) return;

        if (navMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

            menuToggle.setAttribute(
                "aria-label",
                "Close menu"
            );

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );

        }

    });

}


/* ================= CLOSE MOBILE MENU ================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

        menuToggle.setAttribute(
            "aria-label",
            "Open menu"
        );

    });

});


/* Close menu when clicking outside */

document.addEventListener("click", (event) => {

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

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

        menuToggle.setAttribute(
            "aria-label",
            "Open menu"
        );

    }

});


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

function updateThemeIcon() {

    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");

    if (!icon) return;

    if (document.body.classList.contains("dark")) {

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

    }

}


/* Load saved theme */

const savedTheme =
    localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

} else {

    document.body.classList.remove("dark");

}

updateThemeIcon();


/* Theme button */

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );

        updateThemeIcon();

    });

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
let deleting = false;


function typeEffect() {

    if (!typingText) return;

    const currentWord =
        words[wordIndex];


    /* Typing */

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                charIndex + 1
            );

        charIndex++;

    }


    /* Deleting */

    else {

        typingText.textContent =
            currentWord.substring(
                0,
                charIndex - 1
            );

        charIndex--;

    }


    let typingSpeed =
        deleting ? 60 : 100;


    /* Word completed */

    if (
        !deleting &&
        charIndex === currentWord.length
    ) {

        typingSpeed = 1800;

        deleting = true;

    }


    /* Word deleted */

    if (
        deleting &&
        charIndex === 0
    ) {

        deleting = false;

        wordIndex++;

        if (wordIndex >= words.length) {

            wordIndex = 0;

        }

        typingSpeed = 400;

    }


    setTimeout(
        typeEffect,
        typingSpeed
    );

}


/* Start typing effect */

if (typingText) {

    typeEffect();

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

function revealOnScroll() {

    const windowHeight =
        window.innerHeight;


    revealElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;


        if (
            elementTop <
            windowHeight - 80
        ) {

            element.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    revealOnScroll,
    { passive: true }
);

window.addEventListener(
    "load",
    revealOnScroll
);


/* Run immediately */

revealOnScroll();


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

function updateActiveNav() {

    if (!sections.length || !navLinks.length) {
        return;
    }


    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 160;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    /* At very top show Home */

    if (window.scrollY < 200) {

        currentSection = "home";

    }


    navLinks.forEach(link => {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (
            href ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
);

window.addEventListener(
    "load",
    updateActiveNav
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
    { passive: true }
);


/* Back to top button */

if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =====================================================
   CONTACT FORM
===================================================== */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

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


            /* Validate fields */

            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                if (formMessage) {

                    formMessage.textContent =
                        "Please fill in all fields.";

                    formMessage.style.color =
                        "#ef4444";

                }

                return;

            }


            /* Basic email validation */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                if (formMessage) {

                    formMessage.textContent =
                        "Please enter a valid email address.";

                    formMessage.style.color =
                        "#ef4444";

                }

                return;

            }


            /*
                Frontend-only contact form.

                It opens the user's default email
                application and prepares an email
                addressed to Abhijeet Tiwari.
            */


            const mailtoLink =
                `mailto:abhijeettiwari955@gmail.com` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(
                    `Hello Abhijeet,

Name: ${name}
Email: ${email}

Message:
${message}

Regards,
${name}`
                )}`;


            /* Show message */

            if (formMessage) {

                formMessage.textContent =
                    "Opening your email application...";

                formMessage.style.color =
                    "#22c55e";

            }


            /* Open email application */

            window.location.href =
                mailtoLink;

        }
    );

}


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


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


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


/* =====================================================
   ESC KEY - CLOSE MOBILE MENU
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            navMenu &&
            navMenu.classList.contains("active")
        ) {

            navMenu.classList.remove("active");


            if (menuToggle) {

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


                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }

        }

    }
);


/* =====================================================
   CURRENT YEAR
===================================================== */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =====================================================
   INITIAL PAGE SETUP
===================================================== */

window.addEventListener(
    "load",
    () => {

        revealOnScroll();
        updateActiveNav();
        updateBackToTop();
        updateThemeIcon();

    }
);
