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
        ).toLowerCase().trim();


    if (!savedEmail || !savedRole) {

        window.location.replace("login.html");

        return;

    }


    if (savedRole === "admin") {

        window.location.replace(
            "admin-dashboard.html"
        );

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


    const dashboardPage =
        window.location.pathname;


    let sidebarOpen = false;

    let savedScrollPosition = 0;


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


    function lockScroll() {

        savedScrollPosition =
            getCurrentScroll();


        document.documentElement.style.overflow =
            "hidden";

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

        document.body.style.touchAction =
            "none";

        document.body.classList.add(
            "sidebar-open"
        );

    }


    function unlockScroll() {

        document.documentElement.style.overflow =
            "";

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

        document.body.style.touchAction =
            "";

        document.body.classList.remove(
            "sidebar-open"
        );


        requestAnimationFrame(() => {

            window.scrollTo({
                top: savedScrollPosition,
                left: 0,
                behavior: "auto"
            });

        });

    }


    function openSidebar() {

        if (
            sidebarOpen ||
            !sidebar ||
            !overlay ||
            !menuButton
        ) {
            return;
        }


        sidebarOpen = true;

        lockScroll();


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

            gsap.fromTo(
                sidebar,
                {
                    x: -25,
                    opacity: .7
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: .35,
                    ease: "power3.out"
                }
            );

        }

    }


    function closeSidebar() {

        if (
            !sidebar ||
            !overlay ||
            !menuButton
        ) {
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


        unlockScroll();

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


    if (overlay) {

        overlay.addEventListener(
            "click",
            () => {

                closeSidebar();

            }
        );

    }


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


    function getDisplayName(email) {

        if (!email) {
            return "User";
        }


        const name =
            email
                .split("@")[0]
                .replace(/[0-9]+/g, "")
                .replace(/[._-]+/g, " ")
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
        getDisplayName(savedEmail);


    const welcomeUser =
        document.getElementById(
            "welcomeUser"
        );

    const sidebarUserName =
        document.getElementById(
            "sidebarUserName"
        );

    const headerUserName =
        document.getElementById(
            "headerUserName"
        );

    const profileUserName =
        document.getElementById(
            "profileUserName"
        );

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    const profileRole =
        document.getElementById(
            "profileRole"
        );


    if (welcomeUser) {

        welcomeUser.textContent =
            displayName;

    }


    if (sidebarUserName) {

        sidebarUserName.textContent =
            savedEmail;

    }


    if (headerUserName) {

        headerUserName.textContent =
            displayName;

    }


    if (profileUserName) {

        profileUserName.textContent =
            displayName;

    }


    if (profileEmail) {

        profileEmail.textContent =
            savedEmail;

    }


    if (profileRole) {

        profileRole.textContent =
            "USER";

    }


    const currentDate =
        document.getElementById(
            "currentDate"
        );


    function updateDate() {

        if (!currentDate) {
            return;
        }


        const now =
            new Date();


        currentDate.textContent =
            now
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


    updateDate();


    const liveTime =
        document.getElementById(
            "liveTime"
        );


    function updateLiveTime() {

        if (!liveTime) {
            return;
        }


        const now =
            new Date();


        liveTime.textContent =
            now
                .toLocaleTimeString(
                    "en-US",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    }
                );

    }


    updateLiveTime();


    const liveTimer =
        setInterval(
            updateLiveTime,
            1000
        );


    const eventCountdown =
        document.getElementById(
            "eventCountdown"
        );


    const eventDate =
        new Date(
            "September 28, 2026 10:30:00"
        );


    function updateCountdown() {

        if (!eventCountdown) {
            return;
        }


        const difference =
            eventDate.getTime() -
            Date.now();


        if (difference <= 0) {

            eventCountdown.textContent =
                "Event Started";

            return;

        }


        const totalSeconds =
            Math.floor(
                difference / 1000
            );


        const days =
            Math.floor(
                totalSeconds / 86400
            );


        const hours =
            Math.floor(
                (
                    totalSeconds % 86400
                ) / 3600
            );


        const minutes =
            Math.floor(
                (
                    totalSeconds % 3600
                ) / 60
            );


        eventCountdown.textContent =
            String(days).padStart(2, "0") +
            "d " +
            String(hours).padStart(2, "0") +
            "h " +
            String(minutes).padStart(2, "0") +
            "m";

    }


    updateCountdown();


    const countdownTimer =
        setInterval(
            updateCountdown,
            30000
        );


    function saveReturnState() {

        const scroll =
            getCurrentScroll();


        const state = {
            returnPage: dashboardPage,
            restoreScroll: scroll,
            time: Date.now()
        };


        sessionStorage.setItem(
            "stacklyReturnState",
            JSON.stringify(state)
        );


        sessionStorage.setItem(
            "stacklyReturnPage",
            dashboardPage
        );


        sessionStorage.setItem(
            "stacklyReturnScroll",
            String(scroll)
        );


        return state;

    }


    function redirectToError(event) {

        const target =
            event.target.closest(
                'a[href="error.html"], a[href$="error.html"]'
            );


        if (!target) {
            return;
        }


        event.preventDefault();
        event.stopPropagation();


        const state =
            saveReturnState();


        if (sidebarOpen) {
            closeSidebar();
        }


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


        const number =
            Number(value);


        if (
            !Number.isFinite(
                number
            )
        ) {

            return null;

        }


        return Math.max(
            0,
            number
        );

    }


    function restoreDashboardPosition() {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const returnPage =
            params.get(
                "returnPage"
            );


        const restoreScroll =
            getRestoreScroll();


        if (
            !returnPage ||
            restoreScroll === null
        ) {

            return;

        }


        let restored =
            false;


        let attempts =
            0;


        const maxAttempts =
            120;


        function forceRestore() {

            if (restored) {
                return;
            }


            window.scrollTo({
                top: restoreScroll,
                left: 0,
                behavior: "auto"
            });


            if (
                document.scrollingElement
            ) {

                document.scrollingElement.scrollTop =
                    restoreScroll;

            }

        }


        function waitForLoader() {

            const loader =
                document.getElementById(
                    "pageLoader"
                ) ||
                document.querySelector(
                    ".page-loader"
                );


            const loaderComplete =
                !loader ||
                loader.classList.contains(
                    "loader-complete"
                );


            if (!loaderComplete) {

                attempts++;


                if (
                    attempts <
                    maxAttempts
                ) {

                    requestAnimationFrame(
                        waitForLoader
                    );

                }


                return;

            }


            forceRestore();


            requestAnimationFrame(
                forceRestore
            );


            setTimeout(
                forceRestore,
                50
            );


            setTimeout(
                forceRestore,
                120
            );


            setTimeout(
                forceRestore,
                250
            );


            setTimeout(
                forceRestore,
                450
            );


            setTimeout(
                forceRestore,
                700
            );


            setTimeout(
                forceRestore,
                1000
            );


            setTimeout(
                () => {

                    forceRestore();

                    restored = true;

                },
                1400
            );


            history.replaceState(
                null,
                "",
                dashboardPage
            );

        }


        waitForLoader();

    }


    restoreDashboardPosition();


    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            event => {

                event.preventDefault();


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


    if (
        typeof gsap !== "undefined"
    ) {

        const welcome =
            document.querySelector(
                ".consulting-welcome"
            );

        const metrics =
            document.querySelectorAll(
                ".metric-card"
            );

        const cards =
            document.querySelectorAll(
                ".dashboard-card"
            );

        const quickActions =
            document.querySelectorAll(
                ".quick-action"
            );

        const insight =
            document.querySelector(
                ".consulting-insight"
            );


        if (welcome) {

            gsap.fromTo(
                welcome,
                {
                    opacity: 0,
                    y: 28
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: .7,
                    ease: "power3.out"
                }
            );

        }


        if (metrics.length) {

            gsap.fromTo(
                metrics,
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: .45,
                    stagger: .07,
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
                    stagger: .06,
                    delay: .2,
                    ease: "power3.out"
                }
            );

        }


        if (quickActions.length) {

            gsap.fromTo(
                quickActions,
                {
                    opacity: 0,
                    y: 18
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: .4,
                    stagger: .06,
                    delay: .35,
                    ease: "power3.out"
                }
            );

        }


        if (insight) {

            gsap.fromTo(
                insight,
                {
                    opacity: 0,
                    y: 15
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: .45,
                    delay: .45,
                    ease: "power3.out"
                }
            );

        }


        const orbitElements =
            document.querySelectorAll(
                ".visual-orbit"
            );


        if (orbitElements.length) {

            gsap.to(
                orbitElements,
                {
                    rotation: 360,
                    duration: 28,
                    repeat: -1,
                    ease: "none"
                }
            );

        }


        const visualCore =
            document.querySelector(
                ".visual-core"
            );


        if (visualCore) {

            gsap.to(
                visualCore,
                {
                    y: -6,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );

        }


        const visualNodes =
            document.querySelectorAll(
                ".visual-node"
            );


        if (visualNodes.length) {

            gsap.to(
                visualNodes,
                {
                    scale: 1.35,
                    opacity: .55,
                    duration: 1.15,
                    repeat: -1,
                    yoyo: true,
                    stagger: .15,
                    ease: "sine.inOut"
                }
            );

        }


        const insightIcon =
            document.querySelector(
                ".insight-icon"
            );


        if (insightIcon) {

            gsap.to(
                insightIcon,
                {
                    boxShadow:
                        "0 0 0 7px rgba(255,59,25,.06)",
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );

        }


        quickActions.forEach(
            card => {

                const icon =
                    card.querySelector(
                        ".quick-action-icon"
                    );


                const arrow =
                    card.querySelector(
                        "> i"
                    );


                card.addEventListener(
                    "mouseenter",
                    () => {

                        if (icon) {

                            gsap.to(
                                icon,
                                {
                                    scale: 1.08,
                                    rotation: -6,
                                    duration: .25,
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
                                    duration: .3,
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

            }
        );

    }


    const chartCanvas =
        document.getElementById(
            "consultingChart"
        );


    if (
        chartCanvas &&
        typeof Chart !== "undefined"
    ) {

        const chartContext =
            chartCanvas.getContext(
                "2d"
            );


        new Chart(
            chartContext,
            {
                type: "line",

                data: {

                    labels: [
                        "APR",
                        "MAY",
                        "JUN",
                        "JUL",
                        "AUG",
                        "SEP"
                    ],

                    datasets: [
                        {
                            data: [
                                18,
                                24,
                                21,
                                31,
                                28,
                                42
                            ],

                            borderColor:
                                "#ff3b19",

                            backgroundColor:
                                "rgba(255,59,25,.06)",

                            borderWidth: 2,

                            tension: .4,

                            fill: true,

                            pointRadius: 3,

                            pointHoverRadius: 6,

                            pointBackgroundColor:
                                "#ff3b19"
                        }
                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        }

                    },

                    scales: {

                        x: {

                            grid: {
                                display: false
                            },

                            ticks: {
                                color: "#555",
                                font: {
                                    size: 9
                                }
                            },

                            border: {
                                display: false
                            }

                        },

                        y: {

                            beginAtZero: true,

                            suggestedMax: 50,

                            grid: {
                                color:
                                    "rgba(255,255,255,.05)"
                            },

                            ticks: {
                                color: "#555",
                                font: {
                                    size: 9
                                }
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


    const ring =
        document.querySelector(
            ".ring-value"
        );


    if (
        ring &&
        typeof gsap !== "undefined"
    ) {

        gsap.fromTo(
            ring,
            {
                strokeDashoffset: 314
            },
            {
                strokeDashoffset: 44,
                duration: 1.5,
                delay: .5,
                ease: "power3.out"
            }
        );

    }


    const metricNumbers =
        document.querySelectorAll(
            ".metric-card > strong"
        );


    if (
        typeof gsap !== "undefined"
    ) {

        metricNumbers.forEach(
            number => {

                const original =
                    number.textContent.trim();


                let numeric =
                    parseInt(
                        original.replace(
                            /\D/g,
                            ""
                        ),
                        10
                    );


                if (
                    Number.isNaN(
                        numeric
                    )
                ) {
                    return;
                }


                const hasHourSuffix =
                    original.includes("h");


                const padded =
                    original.length >= 2 &&
                    numeric < 100;


                const counter = {
                    value: 0
                };


                gsap.to(
                    counter,
                    {
                        value: numeric,
                        duration: 1.15,
                        delay: .35,
                        ease: "power2.out",

                        onUpdate: () => {

                            let value =
                                Math.floor(
                                    counter.value
                                ).toString();


                            if (padded) {

                                value =
                                    value.padStart(
                                        2,
                                        "0"
                                    );

                            }


                            if (hasHourSuffix) {

                                value += "h";

                            }


                            number.textContent =
                                value;

                        },

                        onComplete: () => {

                            number.textContent =
                                original;

                        }

                    }
                );

            }
        );

    }


    window.addEventListener(
        "pageshow",
        () => {

            const position =
                getRestoreScroll();


            if (
                position === null
            ) {
                return;
            }


            const restore =
                () => {

                    window.scrollTo({
                        top: position,
                        left: 0,
                        behavior: "auto"
                    });

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


    window.addEventListener(
        "beforeunload",
        () => {

            clearInterval(
                liveTimer
            );

            clearInterval(
                countdownTimer
            );

        }
    );

});