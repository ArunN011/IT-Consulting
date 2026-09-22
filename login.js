document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("stacklyLoginForm");

    const emailInput =
        document.getElementById("loginEmail");

    const passwordInput =
        document.getElementById("loginPassword");

    const passwordToggle =
        document.getElementById("passwordToggle");

    const roleInput =
        document.getElementById("selectedRole");

    const roleButtons =
        document.querySelectorAll(".login-role-option");

    const submitButton =
        document.getElementById("loginSubmitButton");

    const message =
        document.getElementById("loginFormMessage");

    const emailError =
        document.getElementById("loginEmailError");

    const passwordError =
        document.getElementById("loginPasswordError");

    const roleError =
        document.getElementById("loginRoleError");


    roleButtons.forEach(button => {

        button.addEventListener("click", () => {

            roleButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const selectedRole =
                button.dataset.role || "user";

            roleInput.value =
                selectedRole;

            roleError.textContent = "";

        });

    });


    if (passwordToggle && passwordInput) {

        passwordToggle.addEventListener(
            "click",
            () => {

                const isPassword =
                    passwordInput.type === "password";

                passwordInput.type =
                    isPassword
                        ? "text"
                        : "password";

                passwordToggle.classList.toggle(
                    "active",
                    isPassword
                );

                const icon =
                    passwordToggle.querySelector(
                        "i"
                    );

                if (icon) {

                    icon.className =
                        isPassword
                            ? "fa-regular fa-eye-slash"
                            : "fa-regular fa-eye";

                }

                passwordToggle.setAttribute(
                    "aria-label",
                    isPassword
                        ? "Hide password"
                        : "Show password"
                );

            }
        );

    }


    function shake(element) {

        if (!element) {
            return;
        }

        const field =
            element.closest(".login-field");

        if (!field) {
            return;
        }

        field.classList.remove("shake");

        requestAnimationFrame(() => {
            field.classList.add("shake");
        });

    }


    function clearErrors() {

        emailError.textContent = "";
        passwordError.textContent = "";
        roleError.textContent = "";

        emailInput
            .closest(".login-field")
            ?.classList.remove("is-error");

        passwordInput
            .closest(".login-field")
            ?.classList.remove("is-error");

    }


    function validateEmail() {

        const value =
            emailInput.value.trim();

        const pattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        emailInput
            .closest(".login-field")
            ?.classList.remove("is-error");


        if (!value) {

            emailError.textContent =
                "Email address is required.";

            emailInput
                .closest(".login-field")
                ?.classList.add("is-error");

            return false;

        }


        if (!pattern.test(value)) {

            emailError.textContent =
                "Please enter a valid email address.";

            emailInput
                .closest(".login-field")
                ?.classList.add("is-error");

            shake(emailInput);

            return false;

        }


        return true;

    }


    function validatePassword() {

        const value =
            passwordInput.value;


        passwordInput
            .closest(".login-field")
            ?.classList.remove("is-error");


        if (!value) {

            passwordError.textContent =
                "Password is required.";

            passwordInput
                .closest(".login-field")
                ?.classList.add("is-error");

            return false;

        }


        if (value.length < 6) {

            passwordError.textContent =
                "Password must contain at least 6 characters.";

            passwordInput
                .closest(".login-field")
                ?.classList.add("is-error");

            shake(passwordInput);

            return false;

        }


        return true;

    }


    if (emailInput) {

        emailInput.addEventListener(
            "blur",
            () => {
                validateEmail();
            }
        );

    }


    if (passwordInput) {

        passwordInput.addEventListener(
            "blur",
            () => {
                validatePassword();
            }
        );

    }


    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                clearErrors();

                message.textContent = "";


                const validEmail =
                    validateEmail();

                const validPassword =
                    validatePassword();

                const selectedRole =
                    roleInput.value;


                if (!selectedRole) {

                    roleError.textContent =
                        "Please select an account role.";

                }


                if (
                    !validEmail ||
                    !validPassword ||
                    !selectedRole
                ) {

                    message.textContent =
                        "Please correct the highlighted fields.";

                    message.style.color =
                        "#e63b19";

                    return;

                }


                const email =
                    emailInput.value
                        .trim()
                        .toLowerCase();


                localStorage.setItem(
                    "userEmail",
                    email
                );


                localStorage.setItem(
                    "userRole",
                    selectedRole
                );


                localStorage.setItem(
                    "stacklyLoggedIn",
                    "true"
                );


                localStorage.setItem(
                    "stacklyLoginTime",
                    String(Date.now())
                );


                const remember =
                    document.getElementById(
                        "rememberMe"
                    )?.checked;


                localStorage.setItem(
                    "rememberMe",
                    remember
                        ? "true"
                        : "false"
                );


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    const buttonText =
                        submitButton.querySelector(
                            "span"
                        );

                    if (buttonText) {

                        buttonText.textContent =
                            "SIGNING IN...";

                    }

                }


                message.textContent =
                    "Login successful. Redirecting...";

                message.style.color =
                    "#777";


                if (typeof gsap !== "undefined") {

                    gsap.to(
                        submitButton,
                        {
                            scale: .98,
                            duration: .12,
                            yoyo: true,
                            repeat: 1,
                            ease: "power2.out"
                        }
                    );

                }


                setTimeout(
                    () => {

                        if (
                            selectedRole ===
                            "admin"
                        ) {

                            window.location.href =
                                "admin-dashboard.html";

                        } else {

                            window.location.href =
                                "user-dashboard.html";

                        }

                    },
                    550
                );

            }
        );

    }


    if (typeof gsap !== "undefined") {

        const visual =
            document.querySelector(
                ".login-visual-image img"
            );

        const back =
            document.querySelector(
                ".login-back-home"
            );

        const stats =
            document.querySelectorAll(
                ".login-stats > div"
            );

        const brand =
            document.querySelector(
                ".login-brand"
            );

        const heading =
            document.querySelector(
                ".login-heading"
            );

        const formElement =
            document.querySelector(
                ".stackly-login-form"
            );

        const divider =
            document.querySelector(
                ".login-divider"
            );

        const social =
            document.querySelector(
                ".login-social-grid"
            );

        const register =
            document.querySelector(
                ".login-register"
            );

        const bottom =
            document.querySelector(
                ".login-bottom"
            );


        gsap.set(
            [
                back,
                brand,
                heading,
                formElement,
                divider,
                social,
                register,
                bottom
            ].filter(Boolean),
            {
                opacity: 0,
                y: 25
            }
        );


        gsap.to(
            back,
            {
                opacity: 1,
                y: 0,
                duration: .45,
                delay: .1,
                ease: "power3.out"
            }
        );


        gsap.to(
            visual,
            {
                scale: 1.045,
                duration: 5,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1
            }
        );


        gsap.to(
            brand,
            {
                opacity: 1,
                y: 0,
                duration: .5,
                ease: "power3.out"
            }
        );


        gsap.to(
            heading,
            {
                opacity: 1,
                y: 0,
                duration: .7,
                delay: .1,
                ease: "power3.out"
            }
        );


        gsap.to(
            formElement,
            {
                opacity: 1,
                y: 0,
                duration: .7,
                delay: .2,
                ease: "power3.out"
            }
        );


        gsap.to(
            divider,
            {
                opacity: 1,
                y: 0,
                duration: .45,
                delay: .3,
                ease: "power3.out"
            }
        );


        gsap.to(
            social,
            {
                opacity: 1,
                y: 0,
                duration: .45,
                delay: .35,
                ease: "power3.out"
            }
        );


        gsap.to(
            register,
            {
                opacity: 1,
                y: 0,
                duration: .45,
                delay: .4,
                ease: "power3.out"
            }
        );


        gsap.to(
            bottom,
            {
                opacity: 1,
                y: 0,
                duration: .45,
                delay: .45,
                ease: "power3.out"
            }
        );


        gsap.fromTo(
            stats,
            {
                opacity: 0,
                y: 15
            },
            {
                opacity: 1,
                y: 0,
                duration: .45,
                stagger: .08,
                delay: .45,
                ease: "power3.out"
            }
        );


        if (
            window.innerWidth > 991
        ) {

            const visualArea =
                document.querySelector(
                    ".login-visual-image"
                );

            if (visualArea && visual) {

                visualArea.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            visualArea.getBoundingClientRect();

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
                            visual,
                            {
                                x: x * -7,
                                y: y * -5,
                                scale: 1.055,
                                duration: .6,
                                ease: "power3.out",
                                overwrite: true
                            }
                        );

                    }
                );


                visualArea.addEventListener(
                    "mouseleave",
                    () => {

                        gsap.to(
                            visual,
                            {
                                x: 0,
                                y: 0,
                                scale: 1.01,
                                duration: .8,
                                ease: "power3.out"
                            }
                        );

                    }
                );

            }

        }


        roleButtons.forEach(button => {

            button.addEventListener(
                "mouseenter",
                () => {

                    gsap.to(
                        button,
                        {
                            x: 3,
                            duration: .25,
                            ease: "power2.out"
                        }
                    );

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(
                        button,
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


    const existingEmail =
        localStorage.getItem(
            "userEmail"
        );

    const existingRole =
        localStorage.getItem(
            "userRole"
        );


    if (
        existingEmail &&
        emailInput
    ) {

        emailInput.value =
            existingEmail;

    }


    if (
        existingRole &&
        (
            existingRole === "user" ||
            existingRole === "admin"
        )
    ) {

        roleInput.value =
            existingRole;


        roleButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.role ===
                existingRole
            );

        });

    }

});
function resetLoginButtonState() {

    const submitButton =
        document.getElementById("loginSubmitButton");

    const message =
        document.getElementById("loginFormMessage");

    if (!submitButton) {
        return;
    }

    submitButton.disabled = false;

    const buttonText =
        submitButton.querySelector("span");

    if (buttonText) {
        buttonText.textContent = "LOG IN";
    }

    if (message) {
        message.textContent = "";
        message.style.color = "";
    }

    const form =
        document.getElementById("stacklyLoginForm");

    if (form) {
        form.style.opacity = "1";
        form.style.pointerEvents = "auto";
    }

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        resetLoginButtonState();

    }
);


window.addEventListener(
    "pageshow",
    () => {

        resetLoginButtonState();

    }
);