/* =========================================
   PREMIUM PORTFOLIO JS
   ABHIJEET TIWARI
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       PAGE LOADER
    ===================================== */

    const pageLoader =
        document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            pageLoader.classList.add("hide");

        }, 500);

    });


    /* =====================================
       HEADER SCROLL EFFECT
    ===================================== */

    const header =
        document.getElementById("header");

    const backToTop =
        document.getElementById("backToTop");

    function handleScroll() {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }


        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    }

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();


    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navMenu =
        document.getElementById("navMenu");

    const navLinks =
        document.querySelectorAll(".nav-link");

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-xmark"></i>'
            : '<i class="fas fa-bars"></i>';

    });


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fas fa-bars"></i>';

        });

    });


    /* =====================================
       DARK / LIGHT MODE
    ===================================== */

    const themeToggle =
        document.getElementById("themeToggle");

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {

        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

        themeToggle.innerHTML =
            '<i class="fas fa-sun"></i>';

    }


    themeToggle.addEventListener("click", () => {

        const currentTheme =
            document.documentElement.getAttribute(
                "data-theme"
            );

        if (currentTheme === "light") {

            document.documentElement
                .removeAttribute("data-theme");

            localStorage.setItem(
                "portfolio-theme",
                "dark"
            );

            themeToggle.innerHTML =
                '<i class="fas fa-moon"></i>';

        } else {

            document.documentElement.setAttribute(
                "data-theme",
                "light"
            );

            localStorage.setItem(
                "portfolio-theme",
                "light"
            );

            themeToggle.innerHTML =
                '<i class="fas fa-sun"></i>';

        }

    });


    /* =====================================
       TYPING ANIMATION
    ===================================== */

    const typingText =
        document.getElementById("typingText");

    const words = [
        "Web Developer",
        "React Developer",
        "CAD Designer",
        "Problem Solver",
        "Tech Enthusiast"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;


    function typeEffect() {

        const currentWord =
            words[wordIndex];

        if (!deleting) {

            typingText.textContent =
                currentWord.substring(
                    0,
                    charIndex + 1
                );

            charIndex++;

            if (
                charIndex ===
                currentWord.length
            ) {

                deleting = true;

                setTimeout(
                    typeEffect,
                    1600
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
                    (wordIndex + 1) %
                    words.length;

            }

        }

        setTimeout(
            typeEffect,
            deleting ? 55 : 90
        );

    }

    typeEffect();


    /* =====================================
       PROFILE PHOTO UPLOAD
    ===================================== */

    const profileUpload =
        document.getElementById("profileUpload");

    const profileImage =
        document.getElementById("profileImage");


    profileUpload.addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];

            if (!file) return;


            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];

            if (
                !allowedTypes.includes(
                    file.type
                )
            ) {

                alert(
                    "Please select JPG, PNG or WEBP image."
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


            reader.onload = e => {

                profileImage.src =
                    e.target.result;

                localStorage.setItem(
                    "profileImage",
                    e.target.result
                );

            };


            reader.readAsDataURL(file);

        }
    );


    /* =====================================
       RESTORE PROFILE PHOTO
    ===================================== */

    const savedProfileImage =
        localStorage.getItem(
            "profileImage"
        );

    if (savedProfileImage) {

        profileImage.src =
            savedProfileImage;

    }


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "active"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0
