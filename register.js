document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-register-section");

    if (!section) {
        return;
    }

    const form =
        document.getElementById("stacklyRegisterForm");

    const roleInput =
        document.getElementById("registerRole");

    const roleButtons =
        section.querySelectorAll(".register-role");

    const terms =
        document.getElementById("registerTerms");

    const passwordToggles =
        section.querySelectorAll(".register-password-toggle");

    const planTabs =
        section.querySelectorAll(".register-plan-tab");

    const planContents =
        section.querySelectorAll(".register-plan-content");

    const selectedPlanName =
        document.getElementById("selectedPlanName");

    const message =
        document.getElementById("registerFormMessage");

    const submitButton =
        document.getElementById("registerSubmit");


    roleButtons.forEach(button => {

        button.addEventListener("click", () => {

            roleButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            roleInput.value =
                button.dataset.role || "user";

            const roleError =
                document.getElementById(
                    "registerRoleError"
                );

            if (roleError) {
                roleError.textContent = "";
            }

        });

    });


    passwordToggles.forEach(toggle => {

        toggle.addEventListener("click", () => {

            const targetId =
                toggle.dataset.target;

            const input =
                document.getElementById(targetId);

            if (!input) {
                return;
            }

            const icon =
                toggle.querySelector("i");

            const show =
                input.type === "password";

            input.type =
                show
                    ? "text"
                    : "password";

            toggle.classList.toggle(
                "active",
                show
            );

            if (icon) {

                icon.className =
                    show
                        ? "fa-regular fa-eye-slash"
                        : "fa-regular fa-eye";

            }

            toggle.setAttribute(
                "aria-label",
                show
                    ? "Hide password"
                    : "Show password"
            );

        });

    });


    planTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const plan =
                tab.dataset.plan;

            planTabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            planContents.forEach(content => {

                content.classList.toggle(
                    "active",
                    content.dataset.planContent === plan
                );

            });

            if (selectedPlanName) {

                selectedPlanName.textContent =
                    plan.toUpperCase();

            }

        });

    });


    function setFieldError(field, text) {

        field.classList.remove("is-valid");
        field.classList.add("is-error");

        const error =
            field.querySelector(".register-error");

        if (error) {
            error.textContent = text;
        }

        field.classList.remove("shake");

        requestAnimationFrame(() => {
            field.classList.add("shake");
        });

    }


    function setFieldValid(field) {

        field.classList.remove("is-error");
        field.classList.add("is-valid");

        const error =
            field.querySelector(".register-error");

        if (error) {
            error.textContent = "";
        }

    }


    function validateInput(input) {

        const field =
            input.closest(".register-field");

        if (!field) {
            return false;
        }

        const value =
            input.value.trim();


        if (input.id === "registerFullName") {

            if (!value) {

                setFieldError(
                    field,
                    "Full name is required."
                );

                return false;
            }

            if (value.length < 2) {

                setFieldError(
                    field,
                    "Please enter a valid full name."
                );

                return false;
            }

        }


        if (input.id === "registerCompany") {

            if (!value) {

                setFieldError(
                    field,
                    "Company name is required."
                );

                return false;
            }

            if (value.length < 2) {

                setFieldError(
                    field,
                    "Please enter a valid company name."
                );

                return false;
            }

        }


        if (input.id === "registerEmail") {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!value) {

                setFieldError(
                    field,
                    "Work email is required."
                );

                return false;
            }

            if (!emailPattern.test(value)) {

                setFieldError(
                    field,
                    "Please enter a valid email address."
                );

                return false;
            }

        }


        if (input.id === "registerPassword") {

            if (!value) {

                setFieldError(
                    field,
                    "Password is required."
                );

                return false;
            }

            if (value.length < 8) {

                setFieldError(
                    field,
                    "Password must contain at least 8 characters."
                );

                return false;
            }

        }


        if (
            input.id ===
            "registerConfirmPassword"
        ) {

            const password =
                document.getElementById(
                    "registerPassword"
                )?.value || "";

            if (!value) {

                setFieldError(
                    field,
                    "Please confirm your password."
                );

                return false;
            }

            if (value !== password) {

                setFieldError(
                    field,
                    "Passwords do not match."
                );

                return false;
            }

        }


        setFieldValid(field);

        return true;

    }


    const inputs =
        form
            ? form.querySelectorAll(
                "input:not([type='checkbox']):not([type='hidden'])[required]"
            )
            : [];


    inputs.forEach(input => {

        input.addEventListener(
            "blur",
            () => {
                validateInput(input);
            }
        );


        input.addEventListener(
            "input",
            () => {

                const field =
                    input.closest(".register-field");

                if (
                    field?.classList.contains(
                        "is-error"
                    )
                ) {

                    validateInput(input);

                }

            }
        );

    });


    if (terms) {

        terms.addEventListener(
            "change",
            () => {

                const error =
                    document.getElementById(
                        "registerTermsError"
                    );

                if (terms.checked && error) {
                    error.textContent = "";
                }

            }
        );

    }


    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                let valid = true;
                let firstInvalid = null;


                inputs.forEach(input => {

                    const fieldValid =
                        validateInput(input);

                    if (!fieldValid) {

                        valid = false;

                        if (!firstInvalid) {
                            firstInvalid = input;
                        }

                    }

                });


                const roleError =
                    document.getElementById(
                        "registerRoleError"
                    );


                if (!roleInput || !roleInput.value) {

                    valid = false;

                    if (roleError) {
                        roleError.textContent =
                            "Please select a role.";
                    }

                } else if (roleError) {

                    roleError.textContent = "";

                }


                const termsError =
                    document.getElementById(
                        "registerTermsError"
                    );


                if (!terms || !terms.checked) {

                    valid = false;

                    if (termsError) {
                        termsError.textContent =
                            "Please accept the Terms of Service and Privacy Policy.";
                    }

                } else if (termsError) {

                    termsError.textContent = "";

                }


                if (!valid) {

                    if (message) {

                        message.textContent =
                            "Please correct the highlighted fields.";

                        message.style.color =
                            "#e63b19";

                    }

                    if (firstInvalid) {

                        firstInvalid.focus();

                        firstInvalid.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    } else if (
                        roleError &&
                        roleError.textContent
                    ) {

                        const roleSection =
                            section.querySelector(
                                ".register-role-section"
                            );

                        roleSection?.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }

                    return;

                }


                if (submitButton) {

                    submitButton.disabled = true;

                    const buttonText =
                        submitButton.querySelector(
                            "span"
                        );

                    if (buttonText) {

                        buttonText.textContent =
                            "CREATING ACCOUNT...";

                    }

                }


                if (message) {

                    message.textContent =
                        "Account created successfully. Redirecting to login...";

                    message.style.color =
                        "#8f8f8f";

                }


                const redirectToLogin = () => {

                    window.location.href =
                        "login.html";

                };


                if (typeof gsap !== "undefined") {

                    gsap.to(
                        submitButton,
                        {
                            scale: 0.98,
                            duration: 0.12,
                            repeat: 1,
                            yoyo: true,
                            ease: "power2.out",
                            onComplete: () => {

                                setTimeout(
                                    redirectToLogin,
                                    450
                                );

                            }
                        }
                    );

                } else {

                    setTimeout(
                        redirectToLogin,
                        700
                    );

                }

            }
        );

    }


    if (typeof gsap !== "undefined") {

        const heading =
            section.querySelector(
                ".register-heading"
            );

        const layout =
            section.querySelector(
                ".register-layout"
            );

        const bottom =
            section.querySelector(
                ".register-bottom"
            );

        const roles =
            section.querySelectorAll(
                ".register-role"
            );

        const plan =
            section.querySelector(
                ".register-plan-panel"
            );


        gsap.set(
            [
                heading,
                layout,
                bottom
            ].filter(Boolean),
            {
                opacity: 0,
                y: 35
            }
        );


        gsap.set(
            roles,
            {
                opacity: 0,
                y: 15
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
                duration: .7,
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
            roles,
            {
                opacity: 1,
                y: 0,
                duration: .45,
                stagger: .08,
                ease: "power3.out"
            },
            "-=.25"
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


        if (plan) {

            gsap.to(
                plan,
                {
                    y: -4,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );

        }


        roles.forEach(role => {

            role.addEventListener(
                "mouseenter",
                () => {

                    gsap.to(
                        role,
                        {
                            x: 3,
                            duration: .25,
                            ease: "power2.out"
                        }
                    );

                }
            );


            role.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(
                        role,
                        {
                            x: 0,
                            duration: .3,
                            ease: "power2.out"
                        }
                    );

                }
            );

        });

    }

});