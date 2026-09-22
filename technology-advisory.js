document.addEventListener("DOMContentLoaded", () => {

    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }


    const sidebar =
        document.getElementById("consultingSidebar");

    const overlay =
        document.getElementById("sidebarOverlay");

    const menuButton =
        document.getElementById("mobileMenuButton");

    const logoutButton =
        document.getElementById("logoutButton");


    const savedEmail =
        localStorage.getItem("userEmail");

    const savedRole =
        (
            localStorage.getItem("userRole") || ""
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


    function getScrollPosition() {

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

            document.scrollingElement.scrollTop =
                position;

        }

    }


    function lockPage() {

        if (pageLocked) {
            return;
        }


        savedScrollPosition =
            getScrollPosition();


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
            "overscroll-behavior",
            "none",
            "important"
        );


        document.documentElement.style.setProperty(
            "touch-action",
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


        const position =
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
            "overscroll-behavior"
        );


        document.documentElement.style.removeProperty(
            "touch-action"
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
            position
        );


        requestAnimationFrame(
            () => {

                setScrollPosition(
                    position
                );

            }
        );


        setTimeout(
            () => {

                setScrollPosition(
                    position
                );

            },
            60
        );


        setTimeout(
            () => {

                setScrollPosition(
                    position
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
            getScrollPosition();


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


    if (menuButton) {

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

    }


    sidebar?.addEventListener(
        "click",
        event => {

            event.stopPropagation();

        }
    );


    overlay?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            closeSidebar();

        }
    );


    overlay?.addEventListener(
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


    overlay?.addEventListener(
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


    overlay?.addEventListener(
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


    overlay?.addEventListener(
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
                sidebar?.contains(target)
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
                sidebar?.contains(target)
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
        "keydown",
        event => {

            if (
                !sidebarOpen
            ) {
                return;
            }


            const blockedKeys = [
                " ",
                "ArrowUp",
                "ArrowDown",
                "PageUp",
                "PageDown",
                "Home",
                "End"
            ];


            if (
                !blockedKeys.includes(
                    event.key
                )
            ) {
                return;
            }


            const target =
                event.target instanceof Element
                    ? event.target
                    : event.target?.parentElement;


            if (
                sidebar?.contains(target)
            ) {
                return;
            }


            event.preventDefault();

        },
        true
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


    sidebar
        ?.querySelectorAll(
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
            getScrollPosition();


        const state = {

            returnPage:
                "technology-advisory.html",

            restoreScroll:
                scroll,

            time:
                Date.now()

        };


        sessionStorage.setItem(
            "stacklyReturnState",
            JSON.stringify(state)
        );


        sessionStorage.setItem(
            "stacklyReturnPage",
            "technology-advisory.html"
        );


        sessionStorage.setItem(
            "stacklyReturnScroll",
            String(scroll)
        );


        return state;

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


        const state =
            saveReturnState();


        closeSidebar();


        const errorUrl =
            new URL(
                "error.html",
                window.location.href
            );


        errorUrl.searchParams.set(
            "returnPage",
            state.returnPage
        );


        errorUrl.searchParams.set(
            "restoreScroll",
            String(
                state.restoreScroll
            )
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


    document
        .querySelectorAll(
            ".capability-card"
        )
        .forEach(
            card => {

                const icon =
                    card.querySelector(
                        ".capability-top i"
                    );


                card.addEventListener(
                    "mouseenter",
                    () => {

                        if (
                            typeof gsap === "undefined"
                        ) {
                            return;
                        }


                        gsap.to(
                            card,
                            {
                                y: -4,
                                duration: .25,
                                ease: "power2.out"
                            }
                        );


                        if (icon) {

                            gsap.to(
                                icon,
                                {
                                    scale: 1.12,
                                    rotation: -5,
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

                        if (
                            typeof gsap === "undefined"
                        ) {
                            return;
                        }


                        gsap.to(
                            card,
                            {
                                y: 0,
                                duration: .3,
                                ease: "power2.out"
                            }
                        );


                        if (icon) {

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

                    }
                );

            }
        );


    if (
        typeof gsap !== "undefined"
    ) {

        gsap.fromTo(
            ".advisory-hero-content",
            {
                opacity: 0,
                y: 25
            },
            {
                opacity: 1,
                y: 0,
                duration: .65,
                ease: "power3.out"
            }
        );


        gsap.fromTo(
            ".advisory-visual",
            {
                opacity: 0,
                scale: .92
            },
            {
                opacity: 1,
                scale: 1,
                duration: .75,
                delay: .15,
                ease: "power3.out"
            }
        );


        gsap.fromTo(
            ".metric-card",
            {
                opacity: 0,
                y: 18
            },
            {
                opacity: 1,
                y: 0,
                duration: .4,
                stagger: .06,
                delay: .2,
                ease: "power3.out"
            }
        );


        gsap.to(
            ".ring-one",
            {
                rotation: 360,
                duration: 28,
                repeat: -1,
                ease: "none"
            }
        );


        gsap.to(
            ".ring-two",
            {
                rotation: -360,
                duration: 20,
                repeat: -1,
                ease: "none"
            }
        );


        gsap.to(
            ".ring-three",
            {
                rotation: 360,
                duration: 14,
                repeat: -1,
                ease: "none"
            }
        );


        gsap.to(
            ".visual-core",
            {
                y: -6,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );


        gsap.to(
            ".visual-node",
            {
                scale: 1.35,
                opacity: .55,
                duration: 1.2,
                stagger: .15,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );


        gsap.fromTo(
            ".capability-card",
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: .45,
                stagger: .05,
                delay: .3,
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
(function () {

    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    const PAGE_NAME = "technology-advisory.html";

    function getRestoreScroll() {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const urlValue =
            params.get("restoreScroll");

        if (
            urlValue !== null &&
            urlValue !== ""
        ) {

            const number =
                Number(urlValue);

            if (
                Number.isFinite(number)
            ) {

                return Math.max(
                    0,
                    Math.round(number)
                );

            }

        }

        const rawState =
            sessionStorage.getItem(
                "stacklyReturnState"
            );

        if (!rawState) {
            return null;
        }

        try {

            const state =
                JSON.parse(rawState);

            if (
                !state ||
                state.returnPage !== PAGE_NAME
            ) {
                return null;
            }

            const number =
                Number(
                    state.restoreScroll
                );

            if (
                !Number.isFinite(number)
            ) {
                return null;
            }

            return Math.max(
                0,
                Math.round(number)
            );

        } catch (error) {

            return null;

        }

    }


    function forceScroll(position) {

        if (
            !Number.isFinite(position)
        ) {
            return;
        }

        const value =
            Math.max(
                0,
                Math.round(position)
            );

        window.scrollTo(
            0,
            value
        );

        document.documentElement.scrollTop =
            value;

        document.body.scrollTop =
            value;

        if (
            document.scrollingElement
        ) {

            document.scrollingElement.scrollTop =
                value;

        }

    }


    function removeRestoreParameters() {

        const url =
            new URL(
                window.location.href
            );

        url.searchParams.delete(
            "restoreScroll"
        );

        url.searchParams.delete(
            "returnPage"
        );

        window.history.replaceState(
            null,
            "",
            url.pathname +
            url.search +
            url.hash
        );

    }


    function restorePagePosition() {

        const position =
            getRestoreScroll();

        if (
            position === null
        ) {
            return;
        }


        const startTime =
            performance.now();

        const duration =
            3000;


        function restoreLoop(currentTime) {

            forceScroll(
                position
            );

            if (
                currentTime - startTime <
                duration
            ) {

                requestAnimationFrame(
                    restoreLoop
                );

            }

        }


        forceScroll(
            position
        );


        requestAnimationFrame(
            restoreLoop
        );


        const restoreTimes = [
            0,
            20,
            50,
            100,
            150,
            250,
            400,
            600,
            800,
            1000,
            1300,
            1600,
            2000,
            2400,
            2800,
            3200
        ];


        restoreTimes.forEach(
            delay => {

                setTimeout(
                    () => {

                        forceScroll(
                            position
                        );

                    },
                    delay
                );

            }
        );


        if (
            document.fonts &&
            document.fonts.ready
        ) {

            document.fonts.ready.then(
                () => {

                    forceScroll(
                        position
                    );

                }
            ).catch(
                () => {}
            );

        }


        document
            .querySelectorAll("img")
            .forEach(
                image => {

                    if (
                        !image.complete
                    ) {

                        image.addEventListener(
                            "load",
                            () => {

                                forceScroll(
                                    position
                                );

                            },
                            {
                                once: true
                            }
                        );

                    }

                }
            );


        window.addEventListener(
            "load",
            () => {

                forceScroll(
                    position
                );

                setTimeout(
                    () => {

                        forceScroll(
                            position
                        );

                    },
                    300
                );

            },
            {
                once: true
            }
        );


        setTimeout(
            () => {

                forceScroll(
                    position
                );

            },
            3500
        );


        setTimeout(
            () => {

                forceScroll(
                    position
                );

                removeRestoreParameters();

            },
            3800
        );


        setTimeout(
            () => {

                sessionStorage.removeItem(
                    "stacklyReturnState"
                );

                sessionStorage.removeItem(
                    "stacklyReturnPage"
                );

                sessionStorage.removeItem(
                    "stacklyReturnScroll"
                );

            },
            4000
        );

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            restorePagePosition,
            {
                once: true
            }
        );

    } else {

        restorePagePosition();

    }

})();