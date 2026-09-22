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

    const sidebarAdminName =
        document.getElementById("sidebarAdminName");

    const headerAdminName =
        document.getElementById("headerAdminName");

    const welcomeAdminName =
        document.getElementById("welcomeAdminName");

    const currentDate =
        document.getElementById("currentDate");

    const savedEmail =
        localStorage.getItem("userEmail");

    const savedRole =
        (
            localStorage.getItem("userRole") || ""
        )
            .trim()
            .toLowerCase();

    if (!savedEmail || !savedRole) {
        window.location.replace("login.html");
        return;
    }

    if (savedRole !== "admin") {

        if (savedRole === "user") {
            window.location.replace("user-dashboard.html");
        } else {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userRole");
            localStorage.removeItem("stacklyLoggedIn");
            localStorage.removeItem("isLoggedIn");
            window.location.replace("login.html");
        }

        return;
    }

    let sidebarOpen = false;
    let historyDrawerAdded = false;
    let pageLocked = false;
    let savedScrollPosition = 0;
    let restoreActive = false;
    let restoreTimers = [];

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

    function setScrollPosition(value) {

        const position =
            Math.max(
                0,
                Math.round(
                    Number(value) || 0
                )
            );

        window.scrollTo(
            0,
            position
        );

        document.documentElement.scrollTop =
            position;

        document.body.scrollTop =
            position;

        if (document.scrollingElement) {
            document.scrollingElement.scrollTop =
                position;
        }
    }

    function clearRestoreTimers() {

        restoreTimers.forEach(
            timer => clearTimeout(timer)
        );

        restoreTimers = [];
    }

    function lockPage() {

        if (pageLocked) {
            return;
        }

        savedScrollPosition =
            getScrollPosition();

        pageLocked = true;

        document.documentElement.classList.add(
            "sidebar-is-locked"
        );

        document.body.classList.add(
            "sidebar-open"
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
    }

    function unlockPage() {

        if (!pageLocked) {
            return;
        }

        const position =
            savedScrollPosition;

        pageLocked = false;

        document.documentElement.classList.remove(
            "sidebar-is-locked"
        );

        document.body.classList.remove(
            "sidebar-open"
        );

        document.documentElement.style.removeProperty(
            "overflow"
        );

        document.documentElement.style.removeProperty(
            "height"
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

        requestAnimationFrame(
            () => setScrollPosition(position)
        );

        setTimeout(
            () => setScrollPosition(position),
            40
        );

        setTimeout(
            () => setScrollPosition(position),
            120
        );
    }

    function updateMenuButton(open) {

        if (!menuButton) {
            return;
        }

        menuButton.innerHTML =
            open
                ? '<i class="bi bi-x-lg"></i>'
                : '<i class="bi bi-list"></i>';

        menuButton.setAttribute(
            "aria-expanded",
            open ? "true" : "false"
        );

        menuButton.setAttribute(
            "aria-label",
            open
                ? "Close navigation"
                : "Open navigation"
        );
    }

    function openSidebar() {

        if (
            sidebarOpen ||
            window.innerWidth > 991 ||
            !sidebar ||
            !overlay
        ) {
            return;
        }

        savedScrollPosition =
            getScrollPosition();

        lockPage();

        sidebarOpen = true;

        sidebar.classList.add(
            "mobile-open"
        );

        overlay.classList.add(
            "active"
        );

        overlay.setAttribute(
            "aria-hidden",
            "false"
        );

        updateMenuButton(true);

        if (!historyDrawerAdded) {

            history.pushState(
                {
                    stacklyAdminSidebar: true
                },
                "",
                window.location.href
            );

            historyDrawerAdded = true;
        }
    }

    function closeSidebar(
        fromHistory = false
    ) {

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

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

        updateMenuButton(false);

        unlockPage();

        if (
            !fromHistory &&
            historyDrawerAdded
        ) {

            historyDrawerAdded = false;

            history.back();
        }
    }

    menuButton?.addEventListener(
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

    sidebar?.addEventListener(
        "click",
        event => {
            event.stopPropagation();
        }
    );

    overlay?.addEventListener(
        "pointerdown",
        event => {

            event.preventDefault();
            event.stopPropagation();

            closeSidebar();
        },
        {
            passive: false
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

    document.addEventListener(
        "pointerdown",
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

            if (
                event.key === "Escape" &&
                sidebarOpen
            ) {

                event.preventDefault();

                closeSidebar();

                return;
            }

            if (!sidebarOpen) {
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
                    !sidebar ||
                    !sidebar.contains(target)
                ) {
                    event.preventDefault();
                }
            }
        },
        true
    );

    window.addEventListener(
        "popstate",
        () => {

            if (sidebarOpen) {

                historyDrawerAdded =
                    false;

                closeSidebar(true);
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

                historyDrawerAdded =
                    false;

                closeSidebar(true);
            }
        }
    );

    sidebar
        ?.querySelectorAll(
            ".sidebar-link:not(.logout-link)"
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        if (
                            window.innerWidth <= 991 &&
                            sidebarOpen
                        ) {

                            historyDrawerAdded =
                                false;

                            closeSidebar(true);
                        }
                    }
                );
            }
        );

    function getDisplayName(email) {

        if (!email) {
            return "Admin";
        }

        const value =
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

        if (!value) {
            return "Admin";
        }

        return value
            .split(/\s+/)
            .map(
                word =>
                    word.charAt(0).toUpperCase() +
                    word.slice(1).toLowerCase()
            )
            .join(" ");
    }

    const displayName =
        getDisplayName(
            savedEmail
        );

    if (sidebarAdminName) {
        sidebarAdminName.textContent =
            displayName;
    }

    if (headerAdminName) {
        headerAdminName.textContent =
            displayName;
    }

    if (welcomeAdminName) {
        welcomeAdminName.textContent =
            displayName.toUpperCase();
    }

    if (currentDate) {

        currentDate.textContent =
            new Date()
                .toLocaleDateString(
                    "en-US",
                    {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                    }
                )
                .toUpperCase();
    }

    function saveDashboardScroll() {

        if (
            restoreActive ||
            sidebarOpen
        ) {
            return;
        }

        sessionStorage.setItem(
            "stacklyAdminScroll",
            String(
                getScrollPosition()
            )
        );
    }

    window.addEventListener(
        "scroll",
        saveDashboardScroll,
        {
            passive: true
        }
    );

    function getReturnScroll() {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const returnPage =
            params.get(
                "returnPage"
            );

        let value =
            params.get(
                "restoreScroll"
            );

        if (
            returnPage !==
            "admin-dashboard.html"
        ) {
            value = null;
        }

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

            value =
                sessionStorage.getItem(
                    "stacklyAdminScroll"
                );
        }

        const number =
            Number(value);

        if (
            !Number.isFinite(number)
        ) {
            return null;
        }

        return Math.max(
            0,
            Math.round(number)
        );
    }

    function cleanReturnUrl() {

        const url =
            new URL(
                window.location.href
            );

        url.searchParams.delete(
            "returnPage"
        );

        url.searchParams.delete(
            "restoreScroll"
        );

        history.replaceState(
            null,
            "",
            url.pathname +
            url.search +
            url.hash
        );
    }

    function restoreDashboardScroll() {

        const target =
            getReturnScroll();

        if (target === null) {
            return false;
        }

        clearRestoreTimers();

        restoreActive = true;

        const restore =
            () => {

                if (!restoreActive) {
                    return;
                }

                setScrollPosition(
                    target
                );
            };

        restore();

        requestAnimationFrame(
            restore
        );

        [
            20,
            50,
            100,
            150,
            220,
            300,
            400,
            550,
            700,
            900,
            1200,
            1600
        ].forEach(
            delay => {

                restoreTimers.push(
                    setTimeout(
                        restore,
                        delay
                    )
                );
            }
        );

        window.addEventListener(
            "load",
            restore,
            {
                once: true
            }
        );

        if (
            document.fonts &&
            document.fonts.ready
        ) {

            document.fonts.ready
                .then(restore)
                .catch(() => {});
        }

        document
            .querySelectorAll(
                "img"
            )
            .forEach(
                image => {

                    if (!image.complete) {

                        image.addEventListener(
                            "load",
                            restore,
                            {
                                once: true
                            }
                        );

                        image.addEventListener(
                            "error",
                            restore,
                            {
                                once: true
                            }
                        );
                    }
                }
            );

        restoreTimers.push(
            setTimeout(
                () => {

                    restore();

                    cleanReturnUrl();

                    sessionStorage.removeItem(
                        "stacklyReturnScroll"
                    );

                    sessionStorage.removeItem(
                        "stacklyReturnPage"
                    );

                    sessionStorage.removeItem(
                        "stacklyReturnState"
                    );

                    restoreActive =
                        false;

                    restoreTimers = [];

                },
                1800
            )
        );

        return true;
    }

    document
        .querySelectorAll(
            'a[href="error.html"], a[href$="/error.html"], a[data-error-link]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();
                        event.stopPropagation();

                        const scroll =
                            getScrollPosition();

                        sessionStorage.setItem(
                            "stacklyAdminScroll",
                            String(scroll)
                        );

                        sessionStorage.setItem(
                            "stacklyReturnPage",
                            "admin-dashboard.html"
                        );

                        sessionStorage.setItem(
                            "stacklyReturnScroll",
                            String(scroll)
                        );

                        sessionStorage.setItem(
                            "stacklyReturnState",
                            JSON.stringify({
                                returnPage:
                                    "admin-dashboard.html",
                                restoreScroll:
                                    scroll,
                                time:
                                    Date.now()
                            })
                        );

                        if (sidebarOpen) {

                            historyDrawerAdded =
                                false;

                            closeSidebar(true);
                        }

                        const errorUrl =
                            new URL(
                                "error.html",
                                window.location.href
                            );

                        errorUrl.searchParams.set(
                            "returnPage",
                            "admin-dashboard.html"
                        );

                        errorUrl.searchParams.set(
                            "restoreScroll",
                            String(scroll)
                        );

                        window.location.replace(
                            errorUrl.href
                        );
                    },
                    true
                );
            }
        );

    logoutButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            closeSidebar(true);

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
                "stacklyAdminScroll"
            );

            sessionStorage.removeItem(
                "stacklyReturnPage"
            );

            sessionStorage.removeItem(
                "stacklyReturnScroll"
            );

            sessionStorage.removeItem(
                "stacklyReturnState"
            );

            window.location.replace(
                "login.html"
            );
        }
    );

    const chartCanvas =
        document.getElementById(
            "adminActivityChart"
        );

    if (
        chartCanvas &&
        typeof Chart !== "undefined"
    ) {

        new Chart(
            chartCanvas,
            {
                type: "line",

                data: {

                    labels: [
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                        "Sun"
                    ],

                    datasets: [
                        {
                            data: [
                                42,
                                55,
                                48,
                                66,
                                61,
                                78,
                                86
                            ],

                            borderColor:
                                "#ff3919",

                            backgroundColor:
                                "rgba(255,57,25,.08)",

                            borderWidth: 2,

                            fill: true,

                            tension: .42,

                            pointRadius: 2,

                            pointHoverRadius: 5,

                            pointBackgroundColor:
                                "#ff3919"
                        }
                    ]
                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    animation: false,

                    plugins: {

                        legend: {
                            display: false
                        },

                        tooltip: {

                            backgroundColor:
                                "#0b0b0b",

                            borderColor:
                                "#2a2a2a",

                            borderWidth: 1,

                            titleColor:
                                "#f2f2f0",

                            bodyColor:
                                "#888",

                            displayColors:
                                false
                        }
                    },

                    scales: {

                        x: {

                            grid: {
                                display: false
                            },

                            ticks: {

                                color:
                                    "#555",

                                font: {
                                    size: 12
                                }
                            },

                            border: {
                                display: false
                            }
                        },

                        y: {

                            beginAtZero: true,

                            suggestedMax: 100,

                            grid: {

                                color:
                                    "rgba(255,255,255,.045)"
                            },

                            ticks: {

                                color:
                                    "#555",

                                font: {
                                    size: 12
                                },

                                maxTicksLimit: 5
                            },

                            border: {
                                display: false
                            }
                        }
                    }
                }
            }
        );
    }

    const restored =
        restoreDashboardScroll();

    if (
        typeof gsap !== "undefined"
    ) {

        if (!restored) {

            gsap.fromTo(
                ".admin-welcome-copy",
                {
                    opacity: 0,
                    y: 18
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: .55,
                    ease: "power3.out"
                }
            );

            gsap.fromTo(
                ".admin-visual",
                {
                    opacity: 0,
                    scale: .94
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: .65,
                    delay: .06,
                    ease: "power3.out"
                }
            );

            gsap.fromTo(
                ".metric-card",
                {
                    opacity: 0,
                    y: 12
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: .34,
                    stagger: .045,
                    delay: .1,
                    ease: "power3.out"
                }
            );

            gsap.fromTo(
                ".dashboard-card",
                {
                    opacity: 0,
                    y: 12
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: .38,
                    stagger: .05,
                    delay: .18,
                    ease: "power3.out"
                }
            );

            gsap.fromTo(
                ".quick-action",
                {
                    opacity: 0,
                    y: 12
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: .34,
                    stagger: .05,
                    delay: .25,
                    ease: "power3.out"
                }
            );
        } else {

            gsap.set(
                [
                    ".admin-welcome-copy",
                    ".admin-visual",
                    ".metric-card",
                    ".dashboard-card",
                    ".quick-action"
                ],
                {
                    opacity: 1,
                    clearProps: "transform"
                }
            );
        }

        gsap.to(
            ".orbit-one",
            {
                rotation: 360,
                duration: 18,
                repeat: -1,
                ease: "none"
            }
        );

        gsap.to(
            ".orbit-two",
            {
                rotation: -360,
                duration: 26,
                repeat: -1,
                ease: "none"
            }
        );

        gsap.to(
            ".orbit-three",
            {
                rotation: 360,
                duration: 34,
                repeat: -1,
                ease: "none"
            }
        );

        gsap.to(
            ".admin-core",
            {
                y: -4,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );
    }

});