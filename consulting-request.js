document.addEventListener("DOMContentLoaded", () => {

    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }


    const sidebar =
        document.getElementById("consultingSidebar");

    const menuButton =
        document.getElementById("mobileMenuButton");

    const logoutButton =
        document.getElementById("logoutButton");

    const form =
        document.getElementById("consultingRequestForm");

    const resetButton =
        document.getElementById("resetRequest");

    const formMessage =
        document.getElementById("formMessage");

    const description =
        document.getElementById("description");

    const characterCount =
        document.getElementById("characterCount");


    let overlay =
        document.getElementById("sidebarOverlay");


    if (
        !sidebar ||
        !menuButton ||
        !overlay
    ) {
        return;
    }


    const duplicateOverlays =
        document.querySelectorAll(
            "#sidebarOverlay"
        );


    duplicateOverlays.forEach(
        (item, index) => {

            if (index > 0) {
                item.remove();
            }

        }
    );


    overlay =
        document.getElementById(
            "sidebarOverlay"
        );


    const savedEmail =
        localStorage.getItem(
            "userEmail"
        );

    const savedRole =
        (
            localStorage.getItem(
                "userRole"
            ) || ""
        )
            .toLowerCase()
            .trim();


    if (
        !savedEmail ||
        !savedRole
    ) {

        window.location.replace(
            "login.html"
        );

        return;
    }


    if (
        savedRole === "admin"
    ) {

        window.location.replace(
            "admin-dashboard.html"
        );

        return;
    }


    if (
        savedRole !== "user"
    ) {

        localStorage.removeItem(
            "userEmail"
        );

        localStorage.removeItem(
            "userRole"
        );

        localStorage.removeItem(
            "stacklyLoggedIn"
        );

        localStorage.removeItem(
            "isLoggedIn"
        );

        window.location.replace(
            "login.html"
        );

        return;
    }


    let sidebarOpen =
        false;

    let pageLocked =
        false;

    let savedScrollPosition =
        0;


    function getCurrentScroll() {

        return Math.max(
            0,
            Math.round(
                window.scrollY ||
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0
            )
        );

    }


    function setScrollPosition(
        position
    ) {

        window.scrollTo({
            top: position,
            left: 0,
            behavior: "auto"
        });


        document.documentElement.scrollTop =
            position;


        document.body.scrollTop =
            position;


        if (
            document.scrollingElement
        ) {

            document
                .scrollingElement
                .scrollTop =
                position;

        }

    }


    function lockPage() {

        if (pageLocked) {
            return;
        }


        savedScrollPosition =
            getCurrentScroll();


        pageLocked =
            true;


        document.documentElement.classList.add(
            "sidebar-lock"
        );


        document.body.classList.add(
            "sidebar-lock"
        );


        document.documentElement.style.setProperty(
            "overflow",
            "hidden",
            "important"
        );


        document.documentElement.style.setProperty(
            "height",
            "100%",
            "important"
        );


        document.documentElement.style.setProperty(
            "touch-action",
            "none",
            "important"
        );


        document.documentElement.style.setProperty(
            "overscroll-behavior",
            "none",
            "important"
        );


        document.body.style.setProperty(
            "position",
            "fixed",
            "important"
        );


        document.body.style.setProperty(
            "top",
            `-${savedScrollPosition}px`,
            "important"
        );


        document.body.style.setProperty(
            "left",
            "0",
            "important"
        );


        document.body.style.setProperty(
            "right",
            "0",
            "important"
        );


        document.body.style.setProperty(
            "width",
            "100%",
            "important"
        );


        document.body.style.setProperty(
            "height",
            "100%",
            "important"
        );


        document.body.style.setProperty(
            "overflow",
            "hidden",
            "important"
        );


        document.body.style.setProperty(
            "touch-action",
            "none",
            "important"
        );


        document.body.style.setProperty(
            "overscroll-behavior",
            "none",
            "important"
        );


        setScrollPosition(
            savedScrollPosition
        );

    }


    function unlockPage() {

        if (!pageLocked) {
            return;
        }


        const restorePosition =
            savedScrollPosition;


        pageLocked =
            false;


        document.documentElement.classList.remove(
            "sidebar-lock"
        );


        document.body.classList.remove(
            "sidebar-lock"
        );


        document.documentElement.style.removeProperty(
            "overflow"
        );


        document.documentElement.style.removeProperty(
            "height"
        );


        document.documentElement.style.removeProperty(
            "touch-action"
        );


        document.documentElement.style.removeProperty(
            "overscroll-behavior"
        );


        document.body.style.removeProperty(
            "position"
        );


        document.body.style.removeProperty(
            "top"
        );


        document.body.style.removeProperty(
            "left"
        );


        document.body.style.removeProperty(
            "right"
        );


        document.body.style.removeProperty(
            "width"
        );


        document.body.style.removeProperty(
            "height"
        );


        document.body.style.removeProperty(
            "overflow"
        );


        document.body.style.removeProperty(
            "touch-action"
        );


        document.body.style.removeProperty(
            "overscroll-behavior"
        );


        setScrollPosition(
            restorePosition
        );


        requestAnimationFrame(
            () => {

                setScrollPosition(
                    restorePosition
                );

            }
        );


        setTimeout(
            () => {

                setScrollPosition(
                    restorePosition
                );

            },
            60
        );


        setTimeout(
            () => {

                setScrollPosition(
                    restorePosition
                );

            },
            150
        );

    }


    function openSidebar() {

        if (
            sidebarOpen ||
            window.innerWidth > 991
        ) {
            return;
        }


        savedScrollPosition =
            getCurrentScroll();


        lockPage();


        sidebarOpen =
            true;


        sidebar.classList.add(
            "mobile-open"
        );


        overlay.classList.add(
            "active"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );


        menuButton.setAttribute(
            "aria-label",
            "Close navigation"
        );


        menuButton.innerHTML =
            '<i class="bi bi-x-lg"></i>';


        setScrollPosition(
            savedScrollPosition
        );

    }


    function closeSidebar() {

        if (!sidebarOpen) {
            return;
        }


        sidebarOpen =
            false;


        sidebar.classList.remove(
            "mobile-open"
        );


        overlay.classList.remove(
            "active"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );


        menuButton.setAttribute(
            "aria-label",
            "Open navigation"
        );


        menuButton.innerHTML =
            '<i class="bi bi-list"></i>';


        unlockPage();

    }


    menuButton.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();


            if (sidebarOpen) {

                closeSidebar();

            } else {

                openSidebar();

            }

        }
    );


    sidebar.addEventListener(
        "click",
        event => {

            event.stopPropagation();

        }
    );


    overlay.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();


            closeSidebar();

        }
    );


    overlay.addEventListener(
        "touchstart",
        event => {

            if (!sidebarOpen) {
                return;
            }


            event.preventDefault();
            event.stopPropagation();

        },
        {
            passive: false
        }
    );


    overlay.addEventListener(
        "touchmove",
        event => {

            if (!sidebarOpen) {
                return;
            }


            event.preventDefault();
            event.stopPropagation();

        },
        {
            passive: false
        }
    );


    overlay.addEventListener(
        "touchend",
        event => {

            if (!sidebarOpen) {
                return;
            }


            event.preventDefault();
            event.stopPropagation();


            closeSidebar();

        },
        {
            passive: false
        }
    );


    overlay.addEventListener(
        "wheel",
        event => {

            if (!sidebarOpen) {
                return;
            }


            event.preventDefault();
            event.stopPropagation();

        },
        {
            passive: false
        }
    );


    document.addEventListener(
        "wheel",
        event => {

            if (
                !sidebarOpen ||
                window.innerWidth > 991
            ) {
                return;
            }


            const target =
                event.target instanceof Element
                    ? event.target
                    : event.target?.parentElement;


            if (
                sidebar.contains(target)
            ) {
                return;
            }


            event.preventDefault();

        },
        {
            passive: false,
            capture: true
        }
    );


    document.addEventListener(
        "touchmove",
        event => {

            if (
                !sidebarOpen ||
                window.innerWidth > 991
            ) {
                return;
            }


            const target =
                event.target instanceof Element
                    ? event.target
                    : event.target?.parentElement;


            if (
                sidebar.contains(target)
            ) {
                return;
            }


            event.preventDefault();

        },
        {
            passive: false,
            capture: true
        }
    );


    window.addEventListener(
        "scroll",
        () => {

            if (
                sidebarOpen &&
                window.innerWidth <= 991
            ) {

                setScrollPosition(
                    savedScrollPosition
                );

            }

        },
        {
            passive: true
        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                sidebarOpen
            ) {

                closeSidebar();

            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 991 &&
                sidebarOpen
            ) {

                closeSidebar();

            }

        }
    );


    sidebar
        .querySelectorAll(
            ".sidebar-link"
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        if (
                            window.innerWidth <= 991
                        ) {

                            closeSidebar();

                        }

                    }
                );

            }
        );


    function getDisplayName(
        email
    ) {

        if (!email) {
            return "User";
        }


        const name =
            email
                .split("@")[0]
                .replace(
                    /[0-9]+/g,
                    ""
                )
                .replace(
                    /[._-]+/g,
                    " "
                )
                .trim();


        if (!name) {
            return "User";
        }


        return name
            .split(/\s+/)
            .map(
                word => {

                    return (
                        word
                            .charAt(0)
                            .toUpperCase() +
                        word
                            .slice(1)
                            .toLowerCase()
                    );

                }
            )
            .join(" ");

    }


    const displayName =
        getDisplayName(
            savedEmail
        );


    const sidebarUserEmail =
        document.getElementById(
            "sidebarUserEmail"
        );


    const headerUserName =
        document.getElementById(
            "headerUserName"
        );


    if (sidebarUserEmail) {

        sidebarUserEmail.textContent =
            savedEmail;

    }


    if (headerUserName) {

        headerUserName.textContent =
            displayName;

    }


    function saveReturnState() {

        const scroll =
            getCurrentScroll();


        sessionStorage.setItem(
            "stacklyReturnPage",
            "consulting-request.html"
        );


        sessionStorage.setItem(
            "stacklyReturnScroll",
            String(scroll)
        );


        sessionStorage.setItem(
            "stacklyReturnState",
            JSON.stringify({
                returnPage:
                    "consulting-request.html",
                restoreScroll:
                    scroll,
                time:
                    Date.now()
            })
        );


        return scroll;

    }


    function redirectToError(
        event
    ) {

        const target =
            event.target instanceof Element
                ? event.target
                : event.target?.parentElement;


        if (!target) {
            return;
        }


        const errorLink =
            target.closest(
                'a[href="error.html"], ' +
                'a[href$="/error.html"], ' +
                '[data-error-link]'
            );


        if (!errorLink) {
            return;
        }


        event.preventDefault();
        event.stopPropagation();


        const position =
            saveReturnState();


        closeSidebar();


        const errorUrl =
            new URL(
                "error.html",
                window.location.href
            );


        errorUrl.searchParams.set(
            "returnPage",
            "consulting-request.html"
        );


        errorUrl.searchParams.set(
            "restoreScroll",
            String(position)
        );


        window.location.assign(
            errorUrl.href
        );

    }


    document.addEventListener(
        "click",
        redirectToError,
        true
    );


    function showError(
        field,
        message
    ) {

        if (!field) {
            return;
        }


        const wrapper =
            field.closest(
                ".field"
            );


        if (!wrapper) {
            return;
        }


        wrapper.classList.add(
            "invalid"
        );


        const error =
            wrapper.querySelector(
                ".field-error"
            );


        if (error) {
            error.textContent =
                message;
        }

    }


    function clearError(
        field
    ) {

        if (!field) {
            return;
        }


        const wrapper =
            field.closest(
                ".field"
            );


        if (!wrapper) {
            return;
        }


        wrapper.classList.remove(
            "invalid"
        );


        const error =
            wrapper.querySelector(
                ".field-error"
            );


        if (error) {
            error.textContent =
                "";
        }

    }


    function validEmail(
        value
    ) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(
                value
            );

    }


    function validPhone(
        value
    ) {

        return /^[0-9+\-\s()]{8,20}$/
            .test(
                value
            );

    }


    function validateForm() {

        let valid =
            true;


        const fullName =
            document.getElementById(
                "fullName"
            );


        const email =
            document.getElementById(
                "email"
            );


        const company =
            document.getElementById(
                "company"
            );


        const phone =
            document.getElementById(
                "phone"
            );


        const service =
            document.getElementById(
                "service"
            );


        const priority =
            document.getElementById(
                "priority"
            );


        const timeline =
            document.getElementById(
                "timeline"
            );


        const budget =
            document.getElementById(
                "budget"
            );


        const subject =
            document.getElementById(
                "subject"
            );


        const descriptionField =
            document.getElementById(
                "description"
            );


        if (
            !fullName ||
            !fullName.value.trim()
        ) {

            showError(
                fullName,
                "Full name is required."
            );

            valid =
                false;

        } else {

            clearError(
                fullName
            );

        }


        if (
            !email ||
            !email.value.trim()
        ) {

            showError(
                email,
                "Email address is required."
            );

            valid =
                false;

        } else if (
            !validEmail(
                email.value.trim()
            )
        ) {

            showError(
                email,
                "Enter a valid email address."
            );

            valid =
                false;

        } else {

            clearError(
                email
            );

        }


        if (
            !company ||
            !company.value.trim()
        ) {

            showError(
                company,
                "Company is required."
            );

            valid =
                false;

        } else {

            clearError(
                company
            );

        }


        if (
            !phone ||
            !phone.value.trim()
        ) {

            showError(
                phone,
                "Phone number is required."
            );

            valid =
                false;

        } else if (
            !validPhone(
                phone.value.trim()
            )
        ) {

            showError(
                phone,
                "Enter a valid phone number."
            );

            valid =
                false;

        } else {

            clearError(
                phone
            );

        }


        [
            [
                service,
                "Please select a service."
            ],
            [
                priority,
                "Please select a priority."
            ],
            [
                timeline,
                "Please select a timeline."
            ],
            [
                budget,
                "Please select a budget range."
            ]
        ].forEach(
            ([field, message]) => {

                if (
                    !field ||
                    !field.value
                ) {

                    showError(
                        field,
                        message
                    );

                    valid =
                        false;

                } else {

                    clearError(
                        field
                    );

                }

            }
        );


        if (
            !subject ||
            !subject.value.trim()
        ) {

            showError(
                subject,
                "Request subject is required."
            );

            valid =
                false;

        } else {

            clearError(
                subject
            );

        }


        if (
            !descriptionField ||
            descriptionField.value.trim().length < 20
        ) {

            showError(
                descriptionField,
                "Enter at least 20 characters."
            );

            valid =
                false;

        } else {

            clearError(
                descriptionField
            );

        }


        return valid;

    }


    function updateCharacterCount() {

        if (
            !description ||
            !characterCount
        ) {
            return;
        }


        characterCount.textContent =
            `${description.value.length} / 1500`;

    }


    if (description) {

        description.addEventListener(
            "input",
            updateCharacterCount
        );


        updateCharacterCount();

    }


    form
        ?.querySelectorAll(
            "input, select, textarea"
        )
        .forEach(
            field => {

                field.addEventListener(
                    "input",
                    () => {

                        clearError(
                            field
                        );

                    }
                );


                field.addEventListener(
                    "change",
                    () => {

                        clearError(
                            field
                        );

                    }
                );

            }
        );


    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (
                    !validateForm()
                ) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please correct the highlighted fields.";

                    }


                    const firstInvalid =
                        form.querySelector(
                            ".field.invalid input, " +
                            ".field.invalid select, " +
                            ".field.invalid textarea"
                        );


                    firstInvalid?.focus();


                    return;

                }


                if (formMessage) {

                    formMessage.textContent =
                        "Request validated. Redirecting...";

                }


                setTimeout(
                    () => {

                        redirectToError(
                            {
                                target:
                                    document.body
                            }
                        );

                    },
                    250
                );

            }
        );

    }


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

                form?.reset();


                form
                    ?.querySelectorAll(
                        ".field"
                    )
                    .forEach(
                        wrapper => {

                            wrapper.classList.remove(
                                "invalid"
                            );


                            const error =
                                wrapper.querySelector(
                                    ".field-error"
                                );


                            if (error) {
                                error.textContent =
                                    "";
                            }

                        }
                    );


                if (formMessage) {

                    formMessage.textContent =
                        "";

                }


                updateCharacterCount();

            }
        );

    }


    if (
        typeof gsap !== "undefined"
    ) {

        gsap.fromTo(
            ".request-hero",
            {
                opacity: 0,
                y: 24
            },
            {
                opacity: 1,
                y: 0,
                duration: .6,
                ease: "power3.out"
            }
        );


        gsap.fromTo(
            ".request-form-card",
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: .55,
                delay: .1,
                ease: "power3.out"
            }
        );


        gsap.fromTo(
            ".request-side .side-card",
            {
                opacity: 0,
                x: 15
            },
            {
                opacity: 1,
                x: 0,
                duration: .5,
                stagger: .08,
                delay: .15,
                ease: "power3.out"
            }
        );

    }


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();


                closeSidebar();


                localStorage.removeItem(
                    "userEmail"
                );

                localStorage.removeItem(
                    "userRole"
                );

                localStorage.removeItem(
                    "stacklyLoggedIn"
                );

                localStorage.removeItem(
                    "isLoggedIn"
                );

                localStorage.removeItem(
                    "rememberMe"
                );

                localStorage.removeItem(
                    "stacklyLoginTime"
                );


                sessionStorage.removeItem(
                    "stacklyReturnState"
                );

                sessionStorage.removeItem(
                    "stacklyReturnPage"
                );

                sessionStorage.removeItem(
                    "stacklyReturnScroll"
                );


                window.location.replace(
                    "login.html"
                );

            }
        );

    }

});