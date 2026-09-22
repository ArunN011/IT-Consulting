
document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-contact-social-section");

    if (!section) {
        return;
    }

    const header =
        section.querySelector(".contact-social-header");

    const cards =
        section.querySelectorAll(".contact-social-card");

    const strip =
        section.querySelector(".contact-social-strip");

    const footer =
        section.querySelector(".contact-social-footer");

    const live =
        section.querySelector(".contact-social-live > span");


    if (typeof gsap !== "undefined") {

        gsap.set(
            [
                header,
                strip,
                footer
            ].filter(Boolean),
            {
                opacity: 0,
                y: 35
            }
        );

        gsap.set(
            cards,
            {
                opacity: 0,
                y: 25
            }
        );

        const timeline =
            gsap.timeline({
                scrollTrigger:
                    typeof ScrollTrigger !== "undefined"
                        ? {
                            trigger: section,
                            start: "top 80%",
                            once: true
                        }
                        : undefined
            });

        timeline.to(
            header,
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out"
            }
        );

        timeline.to(
            cards,
            {
                opacity: 1,
                y: 0,
                duration: 0.55,
                stagger: 0.1,
                ease: "power3.out"
            },
            "-=0.2"
        );

        timeline.to(
            strip,
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out"
            },
            "-=0.2"
        );

        timeline.to(
            footer,
            {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out"
            },
            "-=0.2"
        );

        if (live) {

            gsap.to(
                live,
                {
                    scale: 1.2,
                    opacity: 0.55,
                    duration: 1.2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );

        }

        cards.forEach(card => {

            const icon =
                card.querySelector(
                    ".contact-social-icon"
                );

            const arrow =
                card.querySelector(
                    ".contact-social-card-bottom i"
                );

            card.addEventListener(
                "mouseenter",
                () => {

                    if (icon) {

                        gsap.to(
                            icon,
                            {
                                scale: 1.08,
                                rotation: -7,
                                duration: 0.3,
                                ease: "power2.out"
                            }
                        );

                    }

                    if (arrow) {

                        gsap.to(
                            arrow,
                            {
                                x: 4,
                                y: -3,
                                duration: 0.25,
                                ease: "power2.out"
                            }
                        );

                    }

                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    if (icon) {

                        gsap.to(
                            icon,
                            {
                                scale: 1,
                                rotation: 0,
                                duration: 0.35,
                                ease: "power2.out"
                            }
                        );

                    }

                    if (arrow) {

                        gsap.to(
                            arrow,
                            {
                                x: 0,
                                y: 0,
                                duration: 0.3,
                                ease: "power2.out"
                            }
                        );

                    }

                }
            );

        });

        const stripLinks =
            section.querySelectorAll(
                ".contact-social-strip-items a"
            );

        stripLinks.forEach(link => {

            const icon =
                link.querySelector("i");

            if (!icon) {
                return;
            }

            link.addEventListener(
                "mouseenter",
                () => {

                    gsap.to(
                        icon,
                        {
                            scale: 1.15,
                            rotation: -6,
                            duration: 0.25,
                            ease: "power2.out"
                        }
                    );

                }
            );

            link.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(
                        icon,
                        {
                            scale: 1,
                            rotation: 0,
                            duration: 0.3,
                            ease: "power2.out"
                        }
                    );

                }
            );

        });

    }


    const errorLinks =
        section.querySelectorAll(
            'a[href="error.html"], a[href$="error.html"]'
        );


    errorLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const currentPage =
                    window.location.pathname;

                const currentScroll =
                    Math.max(
                        0,
                        Math.round(
                            window.scrollY
                        )
                    );


                const state = {
                    url: currentPage,
                    scroll: currentScroll,
                    sectionId: "contact-social",
                    filter: "all",
                    cardIndex: -1,
                    cardTop: null,
                    time: Date.now()
                };


                sessionStorage.setItem(
                    "stacklyReturnState",
                    JSON.stringify(state)
                );


                sessionStorage.setItem(
                    "stacklyReturnSection",
                    "contact-social"
                );


                sessionStorage.setItem(
                    "stacklyReturnScroll",
                    String(currentScroll)
                );


                const errorUrl =
                    new URL(
                        "error.html",
                        window.location.href
                    );


                errorUrl.searchParams.set(
                    "_stacklyReturn",
                    "1"
                );


                errorUrl.searchParams.set(
                    "returnPage",
                    currentPage
                );


                errorUrl.searchParams.set(
                    "restoreScroll",
                    String(currentScroll)
                );


                errorUrl.searchParams.set(
                    "returnSection",
                    "contact-social"
                );


                window.location.href =
                    errorUrl.href;

            }
        );

    });

});

document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-contact-hero-section");

    if (!section || typeof gsap === "undefined") {
        return;
    }

    const top =
        section.querySelector(".contact-hero-top");

    const left =
        section.querySelector(".contact-hero-left");

    const right =
        section.querySelector(".contact-hero-right");

    const title =
        section.querySelector(".contact-hero-title");

    const description =
        section.querySelector(".contact-hero-description");

    const points =
        section.querySelectorAll(".contact-hero-points div");

    const quickLinks =
        section.querySelectorAll(".contact-quick-item");

    const bottom =
        section.querySelector(".contact-hero-bottom");

    const card =
        section.querySelector(".contact-signal-card");

    const orbit =
        section.querySelectorAll(".contact-orbit");

    const core =
        section.querySelector(".contact-signal-core");

    const nodes =
        section.querySelectorAll(".contact-signal-node");


    gsap.set(
        [
            top,
            left,
            right,
            description,
            bottom,
            ...points,
            ...quickLinks
        ].filter(Boolean),
        {
            opacity: 1,
            y: 30
        }
    );

    gsap.set(title, {
        opacity: 1,
        y: 55
    });

    gsap.set(card, {
        opacity: 1,
        x: 35
    });

    gsap.set(orbit, {
        opacity: 1,
        scale: .75
    });

    gsap.set(core, {
        opacity: 1,
        scale: .7
    });

    gsap.set(nodes, {
        opacity: 1,
        scale: 0
    });


    const tl =
        gsap.timeline();


    tl.to(
        top,
        {
            opacity: 1,
            y: 0,
            duration: .55,
            ease: "power3.out"
        }
    );


    tl.to(
        title,
        {
            opacity: 1,
            y: 0,
            duration: .9,
            ease: "power4.out"
        },
        "-=.2"
    );


    tl.to(
        description,
        {
            opacity: 1,
            y: 0,
            duration: .55,
            ease: "power3.out"
        },
        "-=.4"
    );


    tl.to(
        points,
        {
            opacity: 1,
            y: 0,
            duration: .45,
            stagger: .08,
            ease: "power3.out"
        },
        "-=.2"
    );


    tl.to(
        right,
        {
            opacity: 1,
            y: 0,
            duration: .65,
            ease: "power3.out"
        },
        "-=.65"
    );


    tl.to(
        card,
        {
            opacity: 1,
            x: 0,
            duration: .8,
            ease: "power4.out"
        },
        "-=.5"
    );


    tl.to(
        orbit,
        {
            opacity: 1,
            scale: 1,
            duration: .8,
            stagger: .1,
            ease: "power3.out"
        },
        "-=.45"
    );


    tl.to(
        core,
        {
            opacity: 1,
            scale: 1,
            duration: .55,
            ease: "back.out(1.6)"
        },
        "-=.45"
    );


    tl.to(
        nodes,
        {
            opacity: 1,
            scale: 1,
            duration: .3,
            stagger: .07,
            ease: "back.out(2)"
        },
        "-=.25"
    );


    tl.to(
        quickLinks,
        {
            opacity: 1,
            y: 0,
            duration: .45,
            stagger: .08,
            ease: "power3.out"
        },
        "-=.2"
    );


    tl.to(
        bottom,
        {
            opacity: 1,
            y: 0,
            duration: .45,
            ease: "power2.out"
        },
        "-=.2"
    );


    gsap.to(
        orbit,
        {
            rotation: 360,
            duration: 26,
            repeat: -1,
            ease: "none"
        }
    );


    gsap.to(
        core,
        {
            boxShadow:
                "0 0 55px rgba(230,59,25,.25)",
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        }
    );


    nodes.forEach((node, index) => {

        gsap.to(
            node,
            {
                scale: 1.35,
                opacity: .55,
                duration: 1.2 + index * .15,
                repeat: -1,
                yoyo: true,
                delay: index * .12,
                ease: "sine.inOut"
            }
        );

    });


    if (
        card &&
        window.innerWidth > 991
    ) {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    .5;

                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    .5;


                gsap.to(
                    card,
                    {
                        rotateY: x * 2,
                        rotateX: y * -2,
                        duration: .5,
                        ease: "power3.out",
                        overwrite: true
                    }
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                gsap.to(
                    card,
                    {
                        rotateY: 0,
                        rotateX: 0,
                        duration: .6,
                        ease: "power3.out"
                    }
                );

            }
        );

    }


    quickLinks.forEach(item => {

        item.addEventListener(
            "mouseenter",
            () => {

                gsap.to(
                    item,
                    {
                        y: -3,
                        duration: .25,
                        ease: "power2.out"
                    }
                );

            }
        );


        item.addEventListener(
            "mouseleave",
            () => {

                gsap.to(
                    item,
                    {
                        y: 0,
                        duration: .3,
                        ease: "power2.out"
                    }
                );

            }
        );

    });

});

document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-contact-form-section");

    if (!section) {
        return;
    }

    const form =
        document.getElementById("stacklyContactForm");

    const submitButton =
        document.getElementById("contactSubmitButton");

    const message =
        document.getElementById("contactFormMessage");

    const problem =
        document.getElementById("contactProblem");

    const charCount =
        document.getElementById("contactCharCount");


    if (typeof gsap !== "undefined") {

        const heading =
            section.querySelector(".contact-form-heading");

        const layout =
            section.querySelector(".contact-form-layout");

        const footer =
            section.querySelector(".contact-form-footer");


        gsap.set(
            [
                heading,
                layout,
                footer
            ].filter(Boolean),
            {
                opacity: 0,
                y: 35
            }
        );


        const tl =
            gsap.timeline({

                scrollTrigger:
                    typeof ScrollTrigger !== "undefined"
                        ? {
                            trigger: section,
                            start: "top 80%",
                            once: true
                        }
                        : undefined

            });


        tl.to(
            heading,
            {
                opacity: 1,
                y: 0,
                duration: .75,
                ease: "power3.out"
            }
        );


        tl.to(
            layout,
            {
                opacity: 1,
                y: 0,
                duration: .8,
                ease: "power3.out"
            },
            "-=.25"
        );


        tl.to(
            footer,
            {
                opacity: 1,
                y: 0,
                duration: .45,
                ease: "power2.out"
            },
            "-=.2"
        );


        const info =
            section.querySelector(".contact-form-info");


        if (info) {

            gsap.to(
                info,
                {
                    y: -4,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );

        }

    }


    function setError(field, text) {

        field.classList.remove("is-valid");
        field.classList.add("is-error");

        const error =
            field.querySelector(
                ".contact-field-error"
            );

        if (error) {
            error.textContent = text;
        }

        field.classList.remove("shake");

        requestAnimationFrame(() => {
            field.classList.add("shake");
        });

    }


    function setValid(field) {

        field.classList.remove("is-error");
        field.classList.add("is-valid");

        const error =
            field.querySelector(
                ".contact-field-error"
            );

        if (error) {
            error.textContent = "";
        }

    }


    function validateField(input) {

        const field =
            input.closest(".contact-field");

        if (!field) {
            return false;
        }


        const value =
            input.value.trim();


        if (input.id === "contactName") {

            if (!value) {
                setError(
                    field,
                    "Full name is required."
                );
                return false;
            }

            if (value.length < 2) {
                setError(
                    field,
                    "Please enter a valid full name."
                );
                return false;
            }

        }


        if (input.id === "contactEmail") {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!value) {
                setError(
                    field,
                    "Work email is required."
                );
                return false;
            }

            if (!emailPattern.test(value)) {
                setError(
                    field,
                    "Please enter a valid work email."
                );
                return false;
            }

        }


        if (input.id === "contactCompany") {

            if (!value) {
                setError(
                    field,
                    "Company name is required."
                );
                return false;
            }

            if (value.length < 2) {
                setError(
                    field,
                    "Please enter a valid company name."
                );
                return false;
            }

        }


        if (input.id === "contactBudget") {

            if (!value) {
                setError(
                    field,
                    "Please select a budget range."
                );
                return false;
            }

        }


        if (input.id === "contactProblem") {

            if (!value) {
                setError(
                    field,
                    "Please describe what you're trying to solve."
                );
                return false;
            }

            if (value.length < 15) {
                setError(
                    field,
                    "Please provide at least 15 characters."
                );
                return false;
            }

            if (value.length > 1000) {
                setError(
                    field,
                    "Please keep the description under 1000 characters."
                );
                return false;
            }

        }


        setValid(field);

        return true;

    }


    const inputs =
        form
            ? form.querySelectorAll(
                "input[required], select[required], textarea[required]"
            )
            : [];


    inputs.forEach(input => {

        input.addEventListener(
            "blur",
            () => {
                validateField(input);
            }
        );


        input.addEventListener(
            "input",
            () => {

                if (
                    input.closest(
                        ".contact-field"
                    )?.classList.contains(
                        "is-error"
                    )
                ) {

                    validateField(input);

                }

            }
        );

    });


    if (problem && charCount) {

        problem.addEventListener(
            "input",
            () => {

                const length =
                    problem.value.length;

                charCount.textContent =
                    Math.min(
                        length,
                        1000
                    );

                charCount.style.color =
                    length > 900
                        ? "#e63b19"
                        : "#777";

            }
        );

    }


    function saveContactState() {

        const currentPage =
            window.location.pathname +
            window.location.search +
            window.location.hash;

        const currentScroll =
            Math.max(
                0,
                Math.round(window.scrollY)
            );


        const state = {

            url:
                currentPage,

            scroll:
                currentScroll,

            sectionId:
                "contact-form",

            filter:
                "all",

            cardIndex:
                -1,

            cardTop:
                null,

            time:
                Date.now()

        };


        sessionStorage.setItem(
            "stacklyReturnState",
            JSON.stringify(state)
        );


        const formData = {

            name:
                document.getElementById(
                    "contactName"
                )?.value || "",

            email:
                document.getElementById(
                    "contactEmail"
                )?.value || "",

            company:
                document.getElementById(
                    "contactCompany"
                )?.value || "",

            budget:
                document.getElementById(
                    "contactBudget"
                )?.value || "",

            problem:
                document.getElementById(
                    "contactProblem"
                )?.value || ""

        };


        sessionStorage.setItem(
            "stacklyContactFormData",
            JSON.stringify(formData)
        );


        return {
            page:
                window.location.pathname,

            scroll:
                currentScroll
        };

    }


    function restoreContactForm() {

        const params =
            new URLSearchParams(
                window.location.search
            );


        if (
            params.get(
                "_stacklyReturn"
            ) !== "1"
        ) {
            return;
        }


        if (
            params.get(
                "returnSection"
            ) !== "contact-form"
        ) {
            return;
        }


        let data = null;


        try {

            data =
                JSON.parse(
                    sessionStorage.getItem(
                        "stacklyContactFormData"
                    ) || "null"
                );

        } catch (error) {

            data = null;

        }


        if (!data) {
            return;
        }


        const fields = {

            contactName:
                data.name,

            contactEmail:
                data.email,

            contactCompany:
                data.company,

            contactBudget:
                data.budget,

            contactProblem:
                data.problem

        };


        Object.keys(fields).forEach(id => {

            const input =
                document.getElementById(id);

            if (
                input &&
                fields[id]
            ) {
                input.value =
                    fields[id];
            }

        });


        if (
            problem &&
            charCount
        ) {

            charCount.textContent =
                Math.min(
                    problem.value.length,
                    1000
                );

        }

    }


    restoreContactForm();


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            let valid = true;

            let firstInvalid = null;


            inputs.forEach(input => {

                const fieldValid =
                    validateField(input);

                if (!fieldValid) {

                    valid = false;

                    if (!firstInvalid) {
                        firstInvalid = input;
                    }

                }

            });


            if (!valid) {

                if (message) {

                    message.textContent =
                        "Please complete all required fields.";

                    message.style.color =
                        "#e63b19";

                }


                if (firstInvalid) {

                    firstInvalid.focus();

                    firstInvalid.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

                return;

            }


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.querySelector(
                    "span"
                ).textContent =
                    "REDIRECTING...";

            }


            if (message) {

                message.textContent =
                    "Thanks. Taking you to the next step...";

                message.style.color =
                    "#777";

            }


            const state =
                saveContactState();


            const errorUrl =
                new URL(
                    "error.html",
                    window.location.href
                );


            errorUrl.searchParams.set(
                "_stacklyReturn",
                "1"
            );


            errorUrl.searchParams.set(
                "returnPage",
                state.page
            );


            errorUrl.searchParams.set(
                "restoreScroll",
                String(
                    state.scroll
                )
            );


            errorUrl.searchParams.set(
                "returnSection",
                "contact-form"
            );


            errorUrl.searchParams.set(
                "returnFilter",
                "all"
            );


            setTimeout(
                () => {

                    window.location.href =
                        errorUrl.href;

                },
                350
            );

        }
    );

});

document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-contact-map-section");

    if (!section) {
        return;
    }

    const mapFrame =
        section.querySelector(".contact-map-frame");

    const iframe =
        section.querySelector(".contact-map-frame iframe");

    const header =
        section.querySelector(".contact-map-header");

    const layout =
        section.querySelector(".contact-map-layout");

    const footer =
        section.querySelector(".contact-map-footer");

    const locationIcon =
        section.querySelector(".contact-map-location-icon");

    const status =
        section.querySelector(".contact-map-status > span");


    if (iframe && mapFrame) {

        iframe.addEventListener("load", () => {

            mapFrame.classList.add("loaded");

        });

    }


    if (typeof gsap === "undefined") {
        return;
    }


    gsap.set(
        [
            header,
            layout,
            footer
        ].filter(Boolean),
        {
            opacity: 0,
            y: 35
        }
    );


    const timeline =
        gsap.timeline({

            scrollTrigger:
                typeof ScrollTrigger !== "undefined"
                    ? {
                        trigger: section,
                        start: "top 80%",
                        once: true
                    }
                    : undefined

        });


    timeline.to(
        header,
        {
            opacity: 1,
            y: 0,
            duration: .7,
            ease: "power3.out"
        }
    );


    timeline.to(
        layout,
        {
            opacity: 1,
            y: 0,
            duration: .8,
            ease: "power3.out"
        },
        "-=.25"
    );


    timeline.to(
        footer,
        {
            opacity: 1,
            y: 0,
            duration: .5,
            ease: "power2.out"
        },
        "-=.25"
    );


    if (locationIcon) {

        gsap.to(
            locationIcon,
            {
                boxShadow:
                    "0 0 35px rgba(230,59,25,.18)",
                duration: 1.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );

    }


    if (status) {

        gsap.to(
            status,
            {
                scale: 1.15,
                opacity: .55,
                duration: 1.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );

    }


    if (
        locationIcon &&
        window.innerWidth > 991
    ) {

        const info =
            section.querySelector(".contact-map-info");

        if (info) {

            info.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        info.getBoundingClientRect();

                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width -
                        .5;

                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height -
                        .5;

                    gsap.to(
                        locationIcon,
                        {
                            x: x * 7,
                            y: y * 5,
                            duration: .5,
                            ease: "power3.out",
                            overwrite: true
                        }
                    );

                }
            );


            info.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(
                        locationIcon,
                        {
                            x: 0,
                            y: 0,
                            duration: .6,
                            ease: "power3.out"
                        }
                    );

                }
            );

        }

    }

});
document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-contact-channels-section");

    if (!section) {
        return;
    }

    const header =
        section.querySelector(".contact-channels-header");

    const cards =
        section.querySelectorAll(".contact-channel-card");

    const process =
        section.querySelector(".contact-channel-process");

    const direct =
        section.querySelector(".contact-channel-direct");

    const footer =
        section.querySelector(".contact-channels-footer");

    const live =
        section.querySelector(".contact-channels-live > span");

    if (typeof gsap === "undefined") {
        return;
    }

    gsap.set(
        [
            header,
            process,
            direct,
            footer
        ].filter(Boolean),
        {
            opacity: 0,
            y: 35
        }
    );

    gsap.set(
        cards,
        {
            opacity: 0,
            y: 25
        }
    );

    const timeline =
        gsap.timeline({

            scrollTrigger:
                typeof ScrollTrigger !== "undefined"
                    ? {
                        trigger: section,
                        start: "top 80%",
                        once: true
                    }
                    : undefined

        });

    timeline.to(
        header,
        {
            opacity: 1,
            y: 0,
            duration: .7,
            ease: "power3.out"
        }
    );

    timeline.to(
        cards,
        {
            opacity: 1,
            y: 0,
            duration: .6,
            stagger: .12,
            ease: "power3.out"
        },
        "-=.25"
    );

    timeline.to(
        process,
        {
            opacity: 1,
            y: 0,
            duration: .65,
            ease: "power3.out"
        },
        "-=.2"
    );

    timeline.to(
        direct,
        {
            opacity: 1,
            y: 0,
            duration: .55,
            ease: "power3.out"
        },
        "-=.25"
    );

    timeline.to(
        footer,
        {
            opacity: 1,
            y: 0,
            duration: .45,
            ease: "power2.out"
        },
        "-=.2"
    );


    if (live) {

        gsap.to(
            live,
            {
                scale: 1.2,
                opacity: .55,
                duration: 1.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );

    }


    cards.forEach(card => {

        const icon =
            card.querySelector(".contact-channel-top > i");

        const arrow =
            card.querySelector(".contact-channel-bottom i");


        card.addEventListener(
            "mouseenter",
            () => {

                if (icon) {

                    gsap.to(
                        icon,
                        {
                            scale: 1.08,
                            rotation: -7,
                            duration: .3,
                            ease: "power2.out"
                        }
                    );

                }

                if (arrow) {

                    gsap.to(
                        arrow,
                        {
                            x: 3,
                            y: -3,
                            duration: .25,
                            ease: "power2.out"
                        }
                    );

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                if (icon) {

                    gsap.to(
                        icon,
                        {
                            scale: 1,
                            rotation: 0,
                            duration: .35,
                            ease: "power2.out"
                        }
                    );

                }

                if (arrow) {

                    gsap.to(
                        arrow,
                        {
                            x: 0,
                            y: 0,
                            duration: .3,
                            ease: "power2.out"
                        }
                    );

                }

            }
        );

    });


    const steps =
        section.querySelectorAll(
            ".contact-channel-step"
        );


    steps.forEach(step => {

        const icon =
            step.querySelector("i");

        if (!icon) {
            return;
        }

        step.addEventListener(
            "mouseenter",
            () => {

                gsap.to(
                    icon,
                    {
                        scale: 1.18,
                        rotation: -8,
                        duration: .3,
                        ease: "power2.out"
                    }
                );

            }
        );

        step.addEventListener(
            "mouseleave",
            () => {

                gsap.to(
                    icon,
                    {
                        scale: 1,
                        rotation: 0,
                        duration: .35,
                        ease: "power2.out"
                    }
                );

            }
        );

    });

});
document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-contact-faq-section");

    if (!section) {
        return;
    }

    const items =
        Array.from(
            section.querySelectorAll(".contact-faq-item")
        );

    const questions =
        section.querySelectorAll(
            ".contact-faq-question"
        );

    const header =
        section.querySelector(
            ".contact-faq-header"
        );

    const layout =
        section.querySelector(
            ".contact-faq-layout"
        );

    const bottom =
        section.querySelector(
            ".contact-faq-bottom"
        );

    const footer =
        section.querySelector(
            ".contact-faq-footer"
        );


    function closeOthers(current) {

        items.forEach(item => {

            if (item === current) {
                return;
            }

            item.classList.remove("active");

            const button =
                item.querySelector(
                    ".contact-faq-question"
                );

            if (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    questions.forEach(question => {

        question.addEventListener("click", () => {

            const item =
                question.closest(
                    ".contact-faq-item"
                );

            if (!item) {
                return;
            }

            const isActive =
                item.classList.contains(
                    "active"
                );


            if (isActive) {

                item.classList.remove(
                    "active"
                );

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

                return;

            }


            closeOthers(item);

            item.classList.add("active");

            question.setAttribute(
                "aria-expanded",
                "true"
            );


            if (
                typeof gsap !== "undefined"
            ) {

                const answer =
                    item.querySelector(
                        ".contact-faq-answer"
                    );

                if (answer) {

                    gsap.fromTo(
                        answer,
                        {
                            opacity: .45
                        },
                        {
                            opacity: 1,
                            duration: .3,
                            ease: "power2.out"
                        }
                    );

                }

            }

        });

    });


    if (typeof gsap !== "undefined") {

        gsap.set(
            [
                header,
                layout,
                bottom,
                footer
            ].filter(Boolean),
            {
                opacity: 0,
                y: 35
            }
        );


        const tl =
            gsap.timeline({

                scrollTrigger:
                    typeof ScrollTrigger !== "undefined"
                        ? {
                            trigger: section,
                            start: "top 80%",
                            once: true
                        }
                        : undefined

            });


        tl.to(
            header,
            {
                opacity: 1,
                y: 0,
                duration: .7,
                ease: "power3.out"
            }
        );


        tl.to(
            layout,
            {
                opacity: 1,
                y: 0,
                duration: .75,
                ease: "power3.out"
            },
            "-=.2"
        );


        tl.to(
            bottom,
            {
                opacity: 1,
                y: 0,
                duration: .55,
                ease: "power3.out"
            },
            "-=.25"
        );


        tl.to(
            footer,
            {
                opacity: 1,
                y: 0,
                duration: .45,
                ease: "power2.out"
            },
            "-=.2"
        );


        const bottomItems =
            section.querySelectorAll(
                ".contact-faq-bottom-item"
            );


        gsap.fromTo(
            bottomItems,
            {
                opacity: 0,
                y: 15
            },
            {
                opacity: 1,
                y: 0,
                duration: .45,
                stagger: .08,
                delay: .35,
                ease: "power3.out"
            }
        );


        const sideIcon =
            section.querySelector(
                ".contact-faq-side-icon"
            );


        if (sideIcon) {

            gsap.to(
                sideIcon,
                {
                    boxShadow:
                        "0 0 38px rgba(230,59,25,.2)",
                    duration: 1.8,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );

        }


        const side =
            section.querySelector(
                ".contact-faq-side"
            );


        if (
            side &&
            window.innerWidth > 991
        ) {

            side.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        side.getBoundingClientRect();

                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width -
                        .5;

                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height -
                        .5;


                    if (sideIcon) {

                        gsap.to(
                            sideIcon,
                            {
                                x: x * 7,
                                y: y * 5,
                                duration: .45,
                                ease: "power3.out",
                                overwrite: true
                            }
                        );

                    }

                }
            );


            side.addEventListener(
                "mouseleave",
                () => {

                    if (sideIcon) {

                        gsap.to(
                            sideIcon,
                            {
                                x: 0,
                                y: 0,
                                duration: .5,
                                ease: "power3.out"
                            }
                        );

                    }

                }
            );

        }


        const categoryIcons =
            section.querySelectorAll(
                ".contact-faq-bottom-item > i"
            );


        categoryIcons.forEach(icon => {

            gsap.to(
                icon,
                {
                    y: -3,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay:
                        Math.random() * .5
                }
            );

        });

    }

});

document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-contact-social-section");

    if (!section || typeof gsap === "undefined") {
        return;
    }

    const header =
        section.querySelector(".contact-social-header");

    const cards =
        section.querySelectorAll(".contact-social-card");

    const strip =
        section.querySelector(".contact-social-strip");

    const footer =
        section.querySelector(".contact-social-footer");

    const live =
        section.querySelector(".contact-social-live > span");


    gsap.set(
        [
            header,
            strip,
            footer
        ].filter(Boolean),
        {
            opacity: 0,
            y: 35
        }
    );

    gsap.set(
        cards,
        {
            opacity: 0,
            y: 25
        }
    );


    const timeline =
        gsap.timeline({

            scrollTrigger:
                typeof ScrollTrigger !== "undefined"
                    ? {
                        trigger: section,
                        start: "top 80%",
                        once: true
                    }
                    : undefined

        });


    timeline.to(
        header,
        {
            opacity: 1,
            y: 0,
            duration: .7,
            ease: "power3.out"
        }
    );


    timeline.to(
        cards,
        {
            opacity: 1,
            y: 0,
            duration: .55,
            stagger: .1,
            ease: "power3.out"
        },
        "-=.2"
    );


    timeline.to(
        strip,
        {
            opacity: 1,
            y: 0,
            duration: .6,
            ease: "power3.out"
        },
        "-=.2"
    );


    timeline.to(
        footer,
        {
            opacity: 1,
            y: 0,
            duration: .45,
            ease: "power2.out"
        },
        "-=.2"
    );


    if (live) {

        gsap.to(
            live,
            {
                scale: 1.2,
                opacity: .55,
                duration: 1.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );

    }


    cards.forEach(card => {

        const icon =
            card.querySelector(
                ".contact-social-icon"
            );

        const arrow =
            card.querySelector(
                ".contact-social-card-bottom i"
            );


        card.addEventListener(
            "mouseenter",
            () => {

                if (icon) {

                    gsap.to(
                        icon,
                        {
                            scale: 1.08,
                            rotation: -7,
                            duration: .3,
                            ease: "power2.out"
                        }
                    );

                }


                if (arrow) {

                    gsap.to(
                        arrow,
                        {
                            x: 4,
                            y: -3,
                            duration: .25,
                            ease: "power2.out"
                        }
                    );

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                if (icon) {

                    gsap.to(
                        icon,
                        {
                            scale: 1,
                            rotation: 0,
                            duration: .35,
                            ease: "power2.out"
                        }
                    );

                }


                if (arrow) {

                    gsap.to(
                        arrow,
                        {
                            x: 0,
                            y: 0,
                            duration: .3,
                            ease: "power2.out"
                        }
                    );

                }

            }
        );

    });


    const stripLinks =
        section.querySelectorAll(
            ".contact-social-strip-items a"
        );


    stripLinks.forEach(link => {

        const icon =
            link.querySelector("i");


        if (!icon) {
            return;
        }


        link.addEventListener(
            "mouseenter",
            () => {

                gsap.to(
                    icon,
                    {
                        scale: 1.15,
                        rotation: -6,
                        duration: .25,
                        ease: "power2.out"
                    }
                );

            }
        );


        link.addEventListener(
            "mouseleave",
            () => {

                gsap.to(
                    icon,
                    {
                        scale: 1,
                        rotation: 0,
                        duration: .3,
                        ease: "power2.out"
                    }
                );

            }
        );

    });

});