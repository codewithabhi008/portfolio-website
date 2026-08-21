/* =========================================
   YEAR
========================================= */

const yearElement =
    document.getElementById("year");

yearElement.textContent =
    new Date().getFullYear();



/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


menuToggle.addEventListener(
    "click",
    () => {

        navMenu.classList.toggle("open");

        const isOpen =
            navMenu.classList.contains("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.innerHTML =
            isOpen
                ? '<i class="fas fa-xmark"></i>'
                : '<i class="fas fa-bars"></i>';

    }
);



/* CLOSE MENU AFTER CLICK */

document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML =
                    '<i class="fas fa-bars"></i>';

            }
        );

    });



/* =========================================
   DARK MODE
========================================= */

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeToggle.innerHTML =
        '<i class="fas fa-sun"></i>';

}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");


        localStorage.setItem(
            "portfolio-theme",
            isDark
                ? "dark"
                : "light"
        );


        themeToggle.innerHTML =
            isDark
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';

    }
);



/* =========================================
   TYPING EFFECT
========================================= */

const typingText =
    document.getElementById(
        "typingText"
    );


const roles = [

    "Web Developer",

    "CAD Designer",

    "Frontend Developer",

    "Engineering Professional",

    "Technology Enthusiast"

];


let roleIndex = 0;

let charIndex = 0;

let deleting = false;


function typeEffect() {

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
            charIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1400
            );

            return;
        }

    }

    else {

        typingText.textContent =
            currentRole.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1)
                % roles.length;

        }

    }


    setTimeout(
        typeEffect,
        deleting
            ? 45
            : 80
    );

}


typeEffect();



/* =========================================
   PROFILE PHOTO
========================================= */

const profileUpload =
    document.getElementById(
        "profileUpload"
    );


const profileImage =
    document.getElementById(
        "profileImage"
    );


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
    function () {

        const file =
            this.files[0];


        if (!file) {
            return;
        }


        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            alert(
                "Please select a valid image."
            );

            return;
        }


        if (
            file.size >
            5 * 1024 * 1024
        ) {

            alert(
                "Please select an image smaller than 5MB."
            );

            return;
        }


        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                const imageData =
                    event.target.result;


                profileImage.src =
                    imageData;


                try {

                    localStorage.setItem(
                        "profile-photo",
                        imageData
                    );

                }

                catch (error) {

                    console.warn(
                        "Could not save image:",
                        error
                    );

                }

            };


        reader.readAsDataURL(file);

    }
);



/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
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

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);



/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(
        section => {

            const sectionTop =
                section.offsetTop - 180;


            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );

            }

        }
    );


    navLinks.forEach(
        link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute(
                    "href"
                ) ===
                "#" + currentSection
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);



/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById(
        "backToTop"
    );


function toggleBackToTop() {

    if (
        window.scrollY > 500
    ) {

        backToTop.classList.add(
            "show"
        );

    }

    else {

        backToTop.classList.remove(
            "show"
        );

    }

}


window.addEventListener(
    "scroll",
    toggleBackToTop
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



/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const formMessage =
    document.getElementById(
        "formMessage"
    );


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

            formMessage.textContent =
                "Please fill in all fields.";

            formMessage.style.color =
                "#ef4444";

            return;

        }


        const mailSubject =
            encodeURIComponent(
                subject
            );


        const mailBody =
            encodeURIComponent(

                `Name: ${name}

Email: ${email}

Message:

${message}`

            );


        formMessage.textContent =
            "Opening your email application...";


        formMessage.style.color =
            "#10b981";


        window.location.href =
            "mailto:abhijeettiwari955@gmail.com" +
            "?subject=" +
            mailSubject +
            "&body=" +
            mailBody;

    }
);



/* =========================================
   ESCAPE KEY
   CLOSE MOBILE MENU
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
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



/* =========================================
   HEADER SHADOW ON SCROLL
========================================= */

const header =
    document.querySelector(
        ".header"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 20
        ) {

            header.style.boxShadow =
                "0 10px 35px rgba(15,23,42,.06)";

        }

        else {

            header.style.boxShadow =
                "none";

        }

    }
);
