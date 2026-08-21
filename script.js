/* =====================================================
   PORTFOLIO JAVASCRIPT
   Abhijeet Tiwari
===================================================== */

"use strict";


/* =====================================================
   DOM
===================================================== */

const body = document.body;

const header =
    document.getElementById("header");

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const themeToggle =
    document.getElementById("themeToggle");

const pageLoader =
    document.getElementById("pageLoader");

const typingText =
    document.getElementById("typingText");

const backToTop =
    document.getElementById("backToTop");

const currentYear =
    document.getElementById("currentYear");

const contactForm =
    document.getElementById("contactForm");


/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        pageLoader.classList.add("hide");

    }, 700);

});


/* =====================================================
   MOBILE MENU
===================================================== */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );


        const icon =
            menuToggle.querySelector("i");


        if (isOpen) {

            icon.classList.remove(
                "fa-bars"
            );

            icon.classList.add(
                "fa-xmark"
            );

        } else {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    });


    document.querySelectorAll(".nav-link")
        .forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuToggle.querySelector("i");

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            });

        });

}


/* =====================================================
   HEADER SCROLL
===================================================== */

function handleHeader() {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleHeader
);

handleHeader();


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    body.classList.add("light");

}


function updateThemeIcon() {

    const icon =
        themeToggle.querySelector("i");

    if (body.classList.contains("light")) {

        icon.classList.remove(
            "fa-moon"
        );

        icon.classList.add(
            "fa-sun"
        );

    } else {

        icon.classList.remove(
            "fa-sun"
        );

        icon.classList.add(
            "fa-moon"
        );

    }

}


updateThemeIcon();


themeToggle.addEventListener("click", () => {

    body.classList.toggle("light");

    const theme =
        body.classList.contains("light")
            ? "light"
            : "dark";

    localStorage.setItem(
        "portfolio-theme",
        theme
    );

    updateThemeIcon();

});


/* =====================================================
   TYPING EFFECT
===================================================== */

const typingWords = [

    "Web Developer",

    "Software Developer",

    "Python Developer",

    "Frontend Developer",

    "CAD Designer"

];


let wordIndex = 0;

let charIndex = 0;

let deleting = false;


function typeEffect() {

    if (!typingText) return;


    const currentWord =
        typingWords[wordIndex];


    if (!deleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(
                typeEffect,
                1700
            );

            return;

        }

    } else {

        typingText.textContent =
            currentWord.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1)
                % typingWords.length;

        }

    }


    setTimeout(
        typeEffect,
        deleting ? 50 : 85
    );

}


typeEffect();


/* =====================================================
   REVEAL ON SCROLL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


function updateActiveNav() {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

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


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);


updateActiveNav();


/* =====================================================
   BACK TO TOP
===================================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* =====================================================
   CONTACT FORM
===================================================== */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const email =
                document.getElementById(
                    "email"
                ).value.trim();


            const subject =
                document.getElementById(
                    "subject"
                ).value.trim();


            const message =
                document.getElementById(
                    "message"
                ).value.trim();


            if (
                !name ||
                !email ||
                !subject ||
                !message
            ) {

                alert(
                    "Please fill all fields."
                );

                return;

            }


            const mailSubject =
                encodeURIComponent(
                    subject
                );


            const mailBody =
                encodeURIComponent(

                    `Hello Abhijeet,

Name: ${name}
Email: ${email}

Message:
${message}`

                );


            const mailto =
                `mailto:abhijeettiwari955@gmail.com` +
                `?subject=${mailSubject}` +
                `&body=${mailBody}`;


            window.location.href =
                mailto;

        }
    );

}


/* =====================================================
   CURRENT YEAR
===================================================== */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =====================================================
   SMOOTH ANCHOR
===================================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");


            if (
                targetId === "#" ||
                !targetId
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) return;


            event.preventDefault();


            const headerHeight =
                header.offsetHeight;


            const targetPosition =
                target.offsetTop -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        }
    );

});


/* =====================================================
   IMAGE FALLBACK
===================================================== */

const profileImage =
    document.querySelector(
        ".profile-image img"
    );


if (profileImage) {

    profileImage.addEventListener(
        "error",
        () => {

            profileImage.src =
                "assets/logo.png";

        }
    );

}


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "%cAbhijeet Tiwari Portfolio",
    "color:#35c8ff;font-size:20px;font-weight:bold;"
);

console.log(
    "%cMechanical Design Engineer & Web Developer",
    "color:#a8b2c3;font-size:12px;"
);
