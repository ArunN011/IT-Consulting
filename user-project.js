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


    if (!savedEmail || !savedRole) {
        window.location.replace("login.html");
        return;
    }


    if (savedRole === "admin") {
        window.location.replace("admin-dashboard.html");
        return;
    }


    if (savedRole !== "user") {

        localStorage.removeItem("userEmail");
        localStorage.removeItem("userRole");
        localStorage.removeItem("stacklyLoggedIn");
        localStorage.removeItem("isLoggedIn");

        window.location.replace("login.html");

        return;
    }


    let sidebarOpen = false;

    let savedScrollPosition = 0;

    let pageLocked = false;


    const currentPage =
        "user-project.html";


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


    function setScrollPosition(position) {

        window.scrollTo({
            top: position,
            left: 0,
            behavior: "auto"
        });


        document.documentElement.scrollTop =
            position;


        document.body.scrollTop =
            position;

    }


    function lockPage() {

        if (pageLocked) {
            return;
        }


        savedScrollPosition =
            getScrollPosition();


        pageLocked = true;


        document.documentElement.style.overflow =
            "hidden";


        document.documentElement.style.overscrollBehavior =
            "none";


        document.body.classList.add(
            "sidebar-locked"
        );


        document.body.style.position =
            "fixed";


        document.body.style.top =
            `-${savedScrollPosition}px`;


        document.body.style.left =
            "0";


        document.body.style.right =
            "0";


        document.body.style.width =
            "100%";


        document.body.style.overflow =
            "hidden";


        document.body.style.overscrollBehavior =
            "none";


        setScrollPosition(
            savedScrollPosition
        );

    }


    function unlockPage() {

        if (!pageLocked) {
            return;
        }


        pageLocked = false;


        document.documentElement.style.overflow =
            "";

        document.documentElement.style.overscrollBehavior =
            "";


        document.body.classList.remove(
            "sidebar-locked"
        );


        document.body.style.position =
            "";


        document.body.style.top =
            "";


        document.body.style.left =
            "";


        document.body.style.right =
            "";


        document.body.style.width =
            "";


        document.body.style.overflow =
            "";


        document.body.style.overscrollBehavior =
            "";


        setScrollPosition(
            savedScrollPosition
        );


        requestAnimationFrame(() => {

            setScrollPosition(
                savedScrollPosition
            );

        });


        setTimeout(() => {

            setScrollPosition(
                savedScrollPosition
            );

        }, 80);


        setTimeout(() => {

            setScrollPosition(
                savedScrollPosition
            );

        }, 180);

    }


    function openSidebar() {

        if (!sidebar) {
            return;
        }


        if (!overlay) {
            return;
        }


        if (!menuButton) {
            return;
        }


        if (sidebarOpen) {
            return;
        }


        if (window.innerWidth > 991) {
            return;
        }


        sidebarOpen = true;


        savedScrollPosition =
            getScrollPosition();


        lockPage();


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


        if (
            typeof gsap !== "undefined"
        ) {

            gsap.killTweensOf(
                sidebar
            );


            gsap.fromTo(
                sidebar,
                {
                    x: -25,
                    opacity: .7
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: .32,
                    ease: "power3.out"
                }
            );

        }


        setScrollPosition(
            savedScrollPosition
        );

    }


    function closeSidebar() {

        if (!sidebarOpen) {
            return;
        }


        sidebarOpen = false;


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


    if (sidebar) {

        sidebar.addEventListener(
            "click",
            event => {

                event.stopPropagation();

            }
        );

    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();


                closeSidebar();

            }
        );

    }


    document.addEventListener(
        "click",
        event => {

            if (!sidebarOpen) {
                return;
            }


            if (window.innerWidth > 991) {
                return;
            }


            const target =
                event.target instanceof Element
                    ? event.target
                    : event.target?.parentElement;


            if (!target) {
                return;
            }


            if (
                sidebar &&
                sidebar.contains(target)
            ) {
                return;
            }


            if (
                menuButton &&
                menuButton.contains(target)
            ) {
                return;
            }


            closeSidebar();

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


    document.addEventListener(
        "wheel",
        event => {

            if (!sidebarOpen) {
                return;
            }


            if (window.innerWidth > 991) {
                return;
            }


            const target =
                event.target instanceof Element
                    ? event.target
                    : event.target?.parentElement;


            if (
                sidebar &&
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

            if (!sidebarOpen) {
                return;
            }


            if (window.innerWidth > 991) {
                return;
            }


            const target =
                event.target instanceof Element
                    ? event.target
                    : event.target?.parentElement;


            if (
                sidebar &&
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
        "keydown",
        event => {

            if (!sidebarOpen) {
                return;
            }


            if (window.innerWidth > 991) {
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
                blockedKeys.includes(
                    event.key
                )
            ) {

                const target =
                    event.target instanceof Element
                        ? event.target
                        : event.target?.parentElement;


                if (
                    sidebar &&
                    sidebar.contains(target)
                ) {
                    return;
                }


                event.preventDefault();

            }

        },
        true
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


    const sidebarLinks =
        sidebar
            ? sidebar.querySelectorAll(
                ".sidebar-link"
            )
            : [];


    sidebarLinks.forEach(
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


    function getDisplayName(email) {

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
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
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
                currentPage,

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
            currentPage
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


    const filterButtons =
        document.querySelectorAll(
            ".filter-button"
        );


    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    filterButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const filter =
                        button.dataset.filter ||
                        "all";


                    filterButtons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    projectCards.forEach(
                        card => {

                            const status =
                                card.dataset.status ||
                                "";


                            if (
                                filter === "all" ||
                                filter === status
                            ) {

                                card.classList.remove(
                                    "hidden"
                                );

                            } else {

                                card.classList.add(
                                    "hidden"
                                );

                            }

                        }
                    );

                }
            );

        }
    );


    if (
        typeof gsap !== "undefined"
    ) {

        const intro =
            document.querySelector(
                ".project-intro"
            );


        const summaryCards =
            document.querySelectorAll(
                ".summary-card"
            );


        const cards =
            document.querySelectorAll(
                ".project-card"
            );


        const bottomCards =
            document.querySelectorAll(
                ".timeline-card, .next-milestone-card"
            );


        if (intro) {

            gsap.fromTo(
                intro,
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

        }


        if (summaryCards.length) {

            gsap.fromTo(
                summaryCards,
                {
                    opacity: 0,
                    y: 18
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: .45,
                    stagger: .06,
                    delay: .1,
                    ease: "power3.out"
                }
            );

        }


        if (cards.length) {

            gsap.fromTo(
                cards,
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: .5,
                    stagger: .07,
                    delay: .2,
                    ease: "power3.out"
                }
            );


            cards.forEach(
                card => {

                    const icon =
                        card.querySelector(
                            ".project-card-icon"
                        );


                    card.addEventListener(
                        "mouseenter",
                        () => {

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
                                        scale: 1.06,
                                        rotation: -4,
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

        }


        if (bottomCards.length) {

            gsap.fromTo(
                bottomCards,
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: .5,
                    stagger: .08,
                    delay: .3,
                    ease: "power3.out"
                }
            );

        }

    }


    function getRestoreScroll() {

        const params =
            new URLSearchParams(
                window.location.search
            );


        let value =
            params.get(
                "restoreScroll"
            );


        if (
            value === null ||
            value === ""
        ) {

            value =
                sessionStorage.getItem(
                    "stacklyReturnScroll"
                );

        }


        if (
            value === null ||
            value === ""
        ) {

            return null;

        }


        const position =
            Number(value);


        if (
            !Number.isFinite(position)
        ) {

            return null;

        }


        return Math.max(
            0,
            position
        );

    }


    function restoreProjectPosition() {

        const position =
            getRestoreScroll();


        if (position === null) {
            return;
        }


        const restore =
            () => {

                setScrollPosition(
                    position
                );

            };


        restore();


        requestAnimationFrame(
            restore
        );


        setTimeout(
            restore,
            50
        );


        setTimeout(
            restore,
            120
        );


        setTimeout(
            restore,
            250
        );


        setTimeout(
            restore,
            450
        );


        setTimeout(
            restore,
            700
        );


        setTimeout(
            restore,
            1000
        );


        setTimeout(
            restore,
            1400
        );


        history.replaceState(
            null,
            "",
            currentPage
        );

    }


    restoreProjectPosition();


    window.addEventListener(
        "pageshow",
        () => {

            const position =
                getRestoreScroll();


            if (position === null) {
                return;
            }


            const restore =
                () => {

                    setScrollPosition(
                        position
                    );

                };


            restore();


            requestAnimationFrame(
                restore
            );


            setTimeout(
                restore,
                100
            );


            setTimeout(
                restore,
                300
            );


            setTimeout(
                restore,
                600
            );


            setTimeout(
                restore,
                1000
            );

        }
    );


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