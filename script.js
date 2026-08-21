/* =========================================
   PREMIUM PORTFOLIO JS
   ABHIJEET TIWARI
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       HELPER
    ===================================== */

    const $ = (selector) =>
        document.querySelector(selector);

    const $$ = (selector) =>
        document.querySelectorAll(selector);


    /* =====================================
       PAGE LOADER
    ===================================== */

    const pageLoader = $("#pageLoader");

    window.addEventListener("load", () => {

        if (!pageLoader) return;

        setTimeout(() => {
            pageLoader.classList.add("hide");
        }, 500);

    });


    /* =====================================
       HEADER SCROLL EFFECT
    ===================================== */

    const header = $("#header");
    const backToTop = $("#backToTop");

    function handleScroll() {

        const scrollPosition = window.scrollY;

        if (header) {

            if (scrollPosition > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        }

        if (backToTop) {

            if (scrollPosition > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        }

        updateActiveNav();

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

    const menuToggle = $("#menuToggle");
    const navMenu = $("#navMenu");
    const navLinks = $$(".nav-link");

    function closeMobileMenu() {

        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.innerHTML =
            '<i class="fas fa-bars"></i>';

        document.body.classList.remove("no-scroll");

    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navMenu.classList.toggle("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

                menuToggle.innerHTML = isOpen
                    ? '<i class="fas fa-xmark"></i>'
                    : '<i class="fas fa-bars"></i>';

                document.body.classList.toggle(
                    "no-scroll",
                    isOpen
                );

            }
        );

    }

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {
                closeMobileMenu();
            }
        );

    });


    /* =====================================
       CLOSE MENU OUTSIDE
    ===================================== */

    document.addEventListener(
        "click",
        event => {

            if (!navMenu || !menuToggle) return;

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                navMenu.classList.contains("open") &&
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================
       ESC KEY
    ===================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMobileMenu();
            }

        }
    );


    /* =====================================
       DARK / LIGHT MODE
    ===================================== */

    const themeToggle = $("#themeToggle");

    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );

    function updateThemeIcon() {

        if (!themeToggle) return;

        const currentTheme =
            document.documentElement
                .getAttribute("data-theme");

        themeToggle.innerHTML =
            currentTheme === "light"
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';

        themeToggle.setAttribute(
            "aria-label",
            currentTheme === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
        );

    }

    if (savedTheme === "light") {

        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

    } else {

        document.documentElement
            .removeAttribute("data-theme");

    }

    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const currentTheme =
                    document.documentElement
                        .getAttribute("data-theme");

                if (currentTheme === "light") {

                    document.documentElement
                        .removeAttribute("data-theme");

                    localStorage.setItem(
                        "portfolio-theme",
                        "dark"
                    );

                } else {

                    document.documentElement
                        .setAttribute(
                            "data-theme",
                            "light"
                        );

                    localStorage.setItem(
                        "portfolio-theme",
                        "light"
                    );

                }

                updateThemeIcon();

            }
        );

    }


    /* =====================================
       TYPING ANIMATION
    ===================================== */

    const typingText = $("#typingText");

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

        if (!typingText) return;

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

    if (typingText) {
        typeEffect();
    }


    /* =====================================
       PROFILE PHOTO UPLOAD
    ===================================== */

    const profileUpload =
        $("#profileUpload");

    const profileImage =
        $("#profileImage");

    if (profileUpload && profileImage) {

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

                    profileUpload.value = "";

                    return;

                }


                if (
                    file.size >
                    5 * 1024 * 1024
                ) {

                    alert(
                        "Please select an image smaller than 5MB."
                    );

                    profileUpload.value = "";

                    return;

                }


                const reader =
                    new FileReader();


                reader.onload = event => {

                    profileImage.src =
                        event.target.result;

                    try {

                        localStorage.setItem(
                            "profileImage",
                            event.target.result
                        );

                    } catch (error) {

                        console.warn(
                            "Could not save profile image:",
                            error
                        );

                    }

                };


                reader.onerror = () => {

                    alert(
                        "Unable to read the selected image."
                    );

                };


                reader.readAsDataURL(file);

            }
        );

    }


    /* =====================================
       RESTORE PROFILE PHOTO
    ===================================== */

    if (profileImage) {

        const savedProfileImage =
            localStorage.getItem(
                "profileImage"
            );

        if (savedProfileImage) {

            profileImage.src =
                savedProfileImage;

        }

    }


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements =
        $$(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add("active");

                                revealObserver
                                    .unobserve(
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
                revealObserver.observe(element);
            }
        );

    } else {

        revealElements.forEach(
            element => {
                element.classList.add("active");
            }
        );

    }


    /* =====================================
       SKILL PROGRESS ANIMATION
    ===================================== */

    const progressBars =
        $$(".progress span");


    if ("IntersectionObserver" in window) {

        const skillObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                const bar =
                                    entry.target;

                                const targetWidth =
                                    bar.dataset.width ||
                                    bar.getAttribute(
                                        "data-width"
                                    );

                                if (targetWidth) {

                                    requestAnimationFrame(
                                        () => {

                                            bar.style.width =
                                                targetWidth +
                                                (
                                                    targetWidth
                                                        .includes("%")
                                                        ? ""
                                                        : "%"
                                                );

                                        }
                                    );

                                }

                                skillObserver
                                    .unobserve(bar);

                            }

                        }
                    );

                },
                {
                    threshold: 0.4
                }
            );


        progressBars.forEach(
            bar => {
                skillObserver.observe(bar);
            }
        );

    }


    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    const sections =
        $$("section[id]");

    function updateActiveNav() {

        if (!sections.length) return;

        const scrollPosition =
            window.scrollY + 150;

        let currentSection = "";

        sections.forEach(
            section => {

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

            }
        );


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


    /* =====================================
       BACK TO TOP
    ===================================== */

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            event => {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================
       SMOOTH ANCHOR SCROLL
    ===================================== */

    $$('a[href^="#"]').forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) return;


                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;


                    event.preventDefault();

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
                                targetPosition,
                                0
                            ),
                        behavior: "smooth"
                    });

                }
            );

        }
    );


    /* =====================================
       CONTACT FORM
    ===================================== */

    const contactForm =
        $("#contactForm");

    const formMessage =
        $("#formMessage");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    contactForm.querySelector(
                        '[name="name"]'
                    );

                const email =
                    contactForm.querySelector(
                        '[name="email"]'
                    );

                const subject =
                    contactForm.querySelector(
                        '[name="subject"]'
                    );

                const message =
                    contactForm.querySelector(
                        '[name="message"]'
                    );


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    showFormMessage(
                        "Form fields are missing.",
                        "error"
                    );

                    return;

                }


                const nameValue =
                    name.value.trim();

                const emailValue =
                    email.value.trim();

                const subjectValue =
                    subject
                        ? subject.value.trim()
                        : "";

                const messageValue =
                    message.value.trim();


                if (!nameValue) {

                    showFormMessage(
                        "Please enter your name.",
                        "error"
                    );

                    name.focus();

                    return;

                }


                if (!isValidEmail(emailValue)) {

                    showFormMessage(
                        "Please enter a valid email address.",
                        "error"
                    );

                    email.focus();

                    return;

                }


                if (messageValue.length < 10) {

                    showFormMessage(
                        "Message should contain at least 10 characters.",
                        "error"
                    );

                    message.focus();

                    return;

                }


                /*
                 * FRONTEND DEMO
                 *
                 * Replace this section with
                 * Formspree / EmailJS / backend API
                 * if you want real email delivery.
                 */

                showFormMessage(
                    "Message validated successfully!",
                    "success"
                );


                contactForm.reset();


                setTimeout(
                    () => {

                        if (formMessage) {
                            formMessage.textContent = "";
                            formMessage.className =
                                "form-message";
                        }

                    },
                    4000
                );

            }
        );

    }


    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    function showFormMessage(
        message,
        type
    ) {

        if (!formMessage) return;

        formMessage.textContent =
            message;

        formMessage.className =
            `form-message ${type}`;

    }


    /* =====================================
       BUTTON RIPPLE EFFECT
    ===================================== */

    $$(".btn, .nav-cta, .whatsapp-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    this.classList.remove(
                        "clicked"
                    );

                    void this.offsetWidth;

                    this.classList.add(
                        "clicked"
                    );

                }
            );

        });


    /* =====================================
       IMAGE ERROR FALLBACK
    ===================================== */

    if (profileImage) {

        profileImage.addEventListener(
            "error",
            () => {

                profileImage.src =
                    "https://via.placeholder.com/500x500/111827/6366f1?text=Abhijeet";

            }
        );

    }


    /* =====================================
       RESIZE HANDLER
    ===================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(
                () => {

                    if (
                        window.innerWidth > 850
                    ) {

                        closeMobileMenu();

                    }

                    updateActiveNav();

                },
                150
            );

        }
    );


    /* =====================================
       INITIAL STATE
    ===================================== */

    updateActiveNav();


    /* =====================================
       CONSOLE
    ===================================== */

    console.log(
        "%c Abhijeet Tiwari Portfolio ",
        "background:#6366f1;color:#fff;padding:8px 12px;border-radius:6px;font-weight:bold;"
    );

    console.log(
        "%cPortfolio loaded successfully.",
        "color:#06b6d4;font-weight:bold;"
    );

});
