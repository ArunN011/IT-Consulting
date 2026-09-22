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
    let drawerHistoryAdded = false;
    let pageLocked = false;
    let savedScrollPosition = 0;
    let restoringScroll = false;
    let restoreTimerIds = [];

    function getScrollPosition() {

        const values = [
            window.scrollY,
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
        ];

        return Math.max(
            0,
            Math.round(
                Math.max(
                    ...values.map(
                        value =>
                            Number.isFinite(value)
                                ? value
                                : 0
                    )
                )
            )
        );
    }

    function setScrollPosition(position) {

        const value =
            Math.max(
                0,
                Math.round(
                    Number(position) || 0
                )
            );

        window.scrollTo({
            top: value,
            left: 0,
            behavior: "auto"
        });

        document.documentElement.scrollTop =
            value;

        document.body.scrollTop =
            value;

        if (document.scrollingElement) {
            document.scrollingElement.scrollTop =
                value;
        }
    }

    function getMaximumScroll() {

        return Math.max(
            0,
            document.documentElement.scrollHeight -
            window.innerHeight
        );
    }

    function clearRestoreTimers() {

        restoreTimerIds.forEach(
            timerId => {
                clearTimeout(timerId);
            }
        );

        restoreTimerIds = [];
    }

    function lockBackground() {

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

    function unlockBackground() {

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
            40
        );

        setTimeout(
            () => {
                setScrollPosition(
                    position
                );
            },
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

        lockBackground();

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

        if (!drawerHistoryAdded) {

            history.pushState(
                {
                    stacklyAdminRequestSidebar: true
                },
                "",
                window.location.href
            );

            drawerHistoryAdded =
                true;
        }

        if (
            typeof gsap !== "undefined"
        ) {

            gsap.killTweensOf(
                sidebar
            );

            gsap.fromTo(
                sidebar,
                {
                    x: -20,
                    opacity: .75
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: .28,
                    ease: "power3.out"
                }
            );
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

        unlockBackground();

        if (
            !fromHistory &&
            drawerHistoryAdded
        ) {

            drawerHistoryAdded = false;

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

            if (
                event.key === "Escape"
            ) {

                closeRequestModal();
            }
        }
    );

    window.addEventListener(
        "popstate",
        () => {

            if (sidebarOpen) {

                drawerHistoryAdded = false;

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

                drawerHistoryAdded = false;

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

                            drawerHistoryAdded =
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

    const requestSearch =
        document.getElementById(
            "requestSearch"
        );

    const statusFilter =
        document.getElementById(
            "requestStatusFilter"
        );

    const serviceFilter =
        document.getElementById(
            "requestServiceFilter"
        );

    const requestTable =
        document.getElementById(
            "requestTable"
        );

    const visibleRequestCount =
        document.getElementById(
            "visibleRequestCount"
        );

    const emptyState =
        document.getElementById(
            "emptyState"
        );

    function filterRequests() {

        if (!requestTable) {
            return;
        }

        const rows =
            Array.from(
                requestTable.querySelectorAll(
                    "tbody tr"
                )
            );

        const search =
            (
                requestSearch?.value || ""
            )
                .trim()
                .toLowerCase();

        const status =
            (
                statusFilter?.value || "all"
            )
                .toLowerCase();

        const service =
            (
                serviceFilter?.value || "all"
            )
                .toLowerCase();

        let visible = 0;

        rows.forEach(
            row => {

                const rowText =
                    row.textContent.toLowerCase();

                const rowStatus =
                    (
                        row.dataset.status || ""
                    ).toLowerCase();

                const rowService =
                    (
                        row.dataset.service || ""
                    ).toLowerCase();

                const searchMatch =
                    !search ||
                    rowText.includes(search);

                const statusMatch =
                    status === "all" ||
                    rowStatus === status;

                const serviceMatch =
                    service === "all" ||
                    rowService === service;

                const show =
                    searchMatch &&
                    statusMatch &&
                    serviceMatch;

                row.style.display =
                    show
                        ? ""
                        : "none";

                if (show) {
                    visible++;
                }
            }
        );

        if (visibleRequestCount) {

            visibleRequestCount.textContent =
                `${visible} REQUEST${visible === 1 ? "" : "S"}`;
        }

        if (emptyState) {

            emptyState.classList.toggle(
                "visible",
                visible === 0
            );
        }
    }

    requestSearch?.addEventListener(
        "input",
        filterRequests
    );

    statusFilter?.addEventListener(
        "change",
        filterRequests
    );

    serviceFilter?.addEventListener(
        "change",
        filterRequests
    );

    const refreshRequests =
        document.getElementById(
            "refreshRequests"
        );

    refreshRequests?.addEventListener(
        "click",
        () => {

            refreshRequests.classList.add(
                "refreshing"
            );

            refreshRequests.innerHTML =
                'REFRESHING <i class="bi bi-arrow-repeat"></i>';

            setTimeout(
                () => {

                    refreshRequests.classList.remove(
                        "refreshing"
                    
                    );

                    refreshRequests.innerHTML =
                        'REFRESH REQUESTS <i class="bi bi-arrow-repeat"></i>';

                        window.location.href="admin-request.html";
                    filterRequests();
                },
                600
            );
        }
    );

    const requestModal =
        document.getElementById(
            "requestModal"
        );

    const requestModalOverlay =
        document.getElementById(
            "requestModalOverlay"
        );

    const closeRequestModalButton =
        document.getElementById(
            "closeRequestModal"
        );

    const cancelRequestModalButton =
        document.getElementById(
            "cancelRequestModal"
        );

    const modalRequestTitle =
        document.getElementById(
            "modalRequestTitle"
        );

    const modalClient =
        document.getElementById(
            "modalClient"
        );

    const modalService =
        document.getElementById(
            "modalService"
        );

    const modalStatus =
        document.getElementById(
            "modalStatus"
        );

    const modalDate =
        document.getElementById(
            "modalDate"
        );

    const modalDescription =
        document.getElementById(
            "modalDescription"
        );

    function openRequestModal(
        row,
        editMode = false
    ) {

        if (
            !row ||
            !requestModal
        ) {
            return;
        }

        const title =
            row.querySelector(
                ".request-cell strong"
            )?.textContent.trim() ||
            "Consulting Request";

        const client =
            row.children[1]
                ?.textContent.trim() ||
            "-";

        const service =
            row.children[2]
                ?.textContent.trim() ||
            "-";

        const status =
            row.querySelector(
                ".status-badge"
            )?.textContent.trim() ||
            "-";

        const date =
            row.children[5]
                ?.textContent.trim() ||
            "-";

        if (modalRequestTitle) {

            modalRequestTitle.textContent =
                editMode
                    ? "EDIT REQUEST"
                    : title.toUpperCase();
        }

        if (modalClient) {
            modalClient.textContent =
                client;
        }

        if (modalService) {
            modalService.textContent =
                service;
        }

        if (modalStatus) {
            modalStatus.textContent =
                status;
        }

        if (modalDate) {
            modalDate.textContent =
                date;
        }

        if (modalDescription) {

            modalDescription.textContent =
                editMode
                    ? "Update the request status and continue the administrative workflow from the request workspace."
                    : "Review the client request details, service information, current status and required administrative action.";
        }

        requestModal.classList.add(
            "active"
        );

        requestModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );
    }

    function closeRequestModal() {

        if (!requestModal) {
            return;
        }

        requestModal.classList.remove(
            "active"
        );

        requestModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );
    }

    document
        .querySelectorAll(
            "[data-view-request]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const row =
                            button.closest(
                                "tr"
                            );

                        openRequestModal(
                            row,
                            false
                        );
                    }
                );
            }
        );

    document
        .querySelectorAll(
            "[data-edit-request]"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const row =
                            button.closest(
                                "tr"
                            );

                        openRequestModal(
                            row,
                            true
                        );
                    }
                );
            }
        );

    closeRequestModalButton?.addEventListener(
        "click",
        closeRequestModal
    );

    cancelRequestModalButton?.addEventListener(
        "click",
        closeRequestModal
    );

    requestModalOverlay?.addEventListener(
        "click",
        closeRequestModal
    );

    function saveRequestReturnPosition() {

        const position =
            getScrollPosition();

        sessionStorage.setItem(
            "stacklyRequestReturnScroll",
            String(position)
        );

        sessionStorage.setItem(
            "stacklyRequestReturnPage",
            "admin-request.html"
        );

        sessionStorage.setItem(
            "stacklyReturnScroll",
            String(position)
        );

        sessionStorage.setItem(
            "stacklyReturnPage",
            "admin-request.html"
        );

        sessionStorage.setItem(
            "stacklyReturnState",
            JSON.stringify({
                returnPage:
                    "admin-request.html",
                restoreScroll:
                    position,
                time:
                    Date.now()
            })
        );

        return position;
    }

    function createErrorUrl() {

        const position =
            saveRequestReturnPosition();

        const errorUrl =
            new URL(
                "error.html",
                window.location.href
            );

        errorUrl.searchParams.set(
            "returnPage",
            "admin-request.html"
        );

        errorUrl.searchParams.set(
            "restoreScroll",
            String(position)
        );

        return errorUrl.href;
    }

    document.addEventListener(
        "click",
        event => {

            const target =
                event.target instanceof Element
                    ? event.target
                    : event.target?.parentElement;

            if (!target) {
                return;
            }

            const errorLink =
                target.closest(
                    'a[href="error.html"], a[href$="/error.html"], a[data-error-link]'
                );

            if (!errorLink) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            if (sidebarOpen) {

                drawerHistoryAdded =
                    false;

                closeSidebar(true);
            }

            closeRequestModal();

            const errorUrl =
                createErrorUrl();

            window.location.assign(
                errorUrl
            );
        },
        true
    );

    logoutButton?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            closeSidebar(true);
            closeRequestModal();

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
                "stacklyRequestReturnScroll"
            );

            sessionStorage.removeItem(
                "stacklyRequestReturnPage"
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

    function loadChartLibrary(callback) {

    if (
        typeof Chart !== "undefined"
    ) {
        callback();
        return;
    }

    const existing =
        document.querySelector(
            'script[data-chartjs]'
        );

    if (existing) {

        existing.addEventListener(
            "load",
            callback,
            {
                once: true
            }
        );

        return;
    }

    const script =
        document.createElement(
            "script"
        );

    script.src =
        "https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.min.js";

    script.async = true;

    script.dataset.chartjs =
        "true";

    script.onload =
        callback;

    script.onerror =
        () => {
            console.error(
                "Chart.js failed to load."
            );
        };

    document.head.appendChild(
        script
    );
}

function initializeRequestChart() {

    const canvas =
        document.getElementById(
            "requestActivityChart"
        );

    if (!canvas) {
        return;
    }

    if (
        typeof Chart === "undefined"
    ) {
        return;
    }

    const oldChart =
        Chart.getChart(
            canvas
        );

    if (oldChart) {
        oldChart.destroy();
    }

    const context =
        canvas.getContext(
            "2d"
        );

    if (!context) {
        return;
    }

    const chart =
        new Chart(
            context,
            {
                type: "line",

                data: {

                    labels: [
                        "MON",
                        "TUE",
                        "WED",
                        "THU",
                        "FRI",
                        "SAT",
                        "SUN"
                    ],

                    datasets: [
                        {
                            label:
                                "Requests",

                            data: [
                                5,
                                8,
                                6,
                                11,
                                9,
                                14,
                                12
                            ],

                            borderColor:
                                "#ff3919",

                            backgroundColor:
                                "rgba(255,57,25,0.10)",

                            borderWidth: 2,

                            fill: true,

                            tension: 0.4,

                            pointRadius: 3,

                            pointHoverRadius: 5,

                            pointBackgroundColor:
                                "#ff3919",

                            pointBorderColor:
                                "#ff3919",

                            pointBorderWidth: 1
                        }
                    ]
                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    resizeDelay: 0,

                    animation: {
                        duration: 700
                    },

                    interaction: {
                        intersect: false,
                        mode: "index"
                    },

                    plugins: {

                        legend: {
                            display: false
                        },

                        tooltip: {

                            enabled: true,

                            backgroundColor:
                                "#0b0b0b",

                            titleColor:
                                "#f2f2f0",

                            bodyColor:
                                "#f2f2f0",

                            borderColor:
                                "#303030",

                            borderWidth: 1,

                            padding: 10,

                            displayColors:
                                false
                        }
                    },

                    scales: {

                        x: {

                            display: true,

                            grid: {
                                display: false,
                                drawBorder: false
                            },

                            border: {
                                display: false
                            },

                            ticks: {

                                color:
                                    "#666",

                                font: {
                                    family:
                                        "Inter",
                                    size:
                                        12,
                                    weight:
                                        "500"
                                },

                                maxRotation: 0,

                                minRotation: 0,

                                padding: 8
                            }
                        },

                        y: {

                            display: true,

                            beginAtZero: true,

                            suggestedMax: 16,

                            grid: {

                                color:
                                    "rgba(255,255,255,0.06)",

                                drawBorder: false
                            },

                            border: {
                                display: false
                            },

                            ticks: {

                                color:
                                    "#666",

                                font: {
                                    family:
                                        "Inter",
                                    size:
                                        12
                                },

                                stepSize: 4,

                                padding: 8
                            }
                        }
                    }
                }
            }
        );

    setTimeout(
        () => {
            chart.resize();
            chart.update("none");
        },
        50
    );

    window.addEventListener(
        "resize",
        () => {

            if (chart) {
                chart.resize();
            }
        }
    );
}

loadChartLibrary(
    initializeRequestChart
);

    function restorePreviousPosition() {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const currentReturnPage =
            params.get(
                "returnPage"
            );

        let restoreValue =
            params.get(
                "restoreScroll"
            );

        if (
            (
                restoreValue === null ||
                restoreValue === ""
            ) &&
            currentReturnPage === "admin-request.html"
        ) {

            restoreValue =
                sessionStorage.getItem(
                    "stacklyReturnScroll"
                );
        }

        if (
            restoreValue === null ||
            restoreValue === ""
        ) {

            restoreValue =
                sessionStorage.getItem(
                    "stacklyRequestReturnScroll"
                );
        }

        const position =
            Number(
                restoreValue
            );

        if (
            !Number.isFinite(position) ||
            position <= 0
        ) {
            return;
        }

        clearRestoreTimers();

        restoringScroll =
            true;

        const restore =
            () => {

                if (!restoringScroll) {
                    return;
                }

                const max =
                    getMaximumScroll();

                const safePosition =
                    Math.min(
                        position,
                        max
                    );

                setScrollPosition(
                    safePosition
                );
            };

        restore();

        requestAnimationFrame(
            restore
        );

        restoreTimerIds.push(
            setTimeout(
                restore,
                20
            )
        );

        restoreTimerIds.push(
            setTimeout(
                restore,
                50
            )
        );

        restoreTimerIds.push(
            setTimeout(
                restore,
                100
            )
        );

        restoreTimerIds.push(
            setTimeout(
                restore,
                180
            )
        );

        restoreTimerIds.push(
            setTimeout(
                restore,
                280
            )
        );

        restoreTimerIds.push(
            setTimeout(
                restore,
                400
            )
        );

        restoreTimerIds.push(
            setTimeout(
                restore,
                600
            )
        );

        restoreTimerIds.push(
            setTimeout(
                restore,
                900
            )
        );

        restoreTimerIds.push(
            setTimeout(
                restore,
                1200
            )
        );

        restoreTimerIds.push(
            setTimeout(
                restore,
                1600
            )
        );

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

        if (
            document.fonts &&
            document.fonts.ready
        ) {

            document.fonts.ready
                .then(
                    restore
                )
                .catch(
                    () => {}
                );
        }

        restoreTimerIds.push(
            setTimeout(
                () => {

                    restore();

                    const cleanUrl =
                        new URL(
                            window.location.href
                        );

                    cleanUrl.searchParams.delete(
                        "returnPage"
                    );

                    cleanUrl.searchParams.delete(
                        "restoreScroll"
                    );

                    history.replaceState(
                        null,
                        "",
                        cleanUrl.pathname +
                        cleanUrl.search +
                        cleanUrl.hash
                    );

                    sessionStorage.removeItem(
                        "stacklyRequestReturnScroll"
                    );

                    sessionStorage.removeItem(
                        "stacklyRequestReturnPage"
                    );

                    sessionStorage.removeItem(
                        "stacklyReturnScroll"
                    );

                    sessionStorage.removeItem(
                        "stacklyReturnPage"
                    );

                    sessionStorage.removeItem(
                        "stacklyReturnState"
                    );

                    restoringScroll =
                        false;

                    clearRestoreTimers();

                },
                1800
            )
        );
    }

    window.addEventListener(
        "load",
        () => {

            restorePreviousPosition();
        }
    );

    if (
        document.readyState === "complete"
    ) {

        setTimeout(
            restorePreviousPosition,
            20
        );
    }

    if (
        typeof gsap !== "undefined"
    ) {

        gsap.fromTo(
            ".request-hero-copy",
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
            ".request-hero-visual",
            {
                opacity: 0,
                scale: .94
            },
            {
                opacity: 1,
                scale: 1,
                duration: .65,
                delay: .08,
                ease: "power3.out"
            }
        );

        gsap.fromTo(
            ".request-stat-card",
            {
                opacity: 0,
                y: 12
            },
            {
                opacity: 1,
                y: 0,
                duration: .34,
                stagger: .05,
                delay: .1,
                ease: "power3.out"
            }
        );

        gsap.fromTo(
            ".request-tools,.requests-table-card,.dashboard-card",
            {
                opacity: 0,
                y: 12
            },
            {
                opacity: 1,
                y: 0,
                duration: .4,
                stagger: .05,
                delay: .18,
                ease: "power3.out"
            }
        );

        gsap.to(
            ".hero-ring-one",
            {
                rotation: 360,
                duration: 18,
                repeat: -1,
                ease: "none"
            }
        );

        gsap.to(
            ".hero-ring-two",
            {
                rotation: -360,
                duration: 26,
                repeat: -1,
                ease: "none"
            }
        );

        gsap.to(
            ".hero-ring-three",
            {
                rotation: 360,
                duration: 34,
                repeat: -1,
                ease: "none"
            }
        );

        gsap.to(
            ".hero-center",
            {
                y: -4,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );
    }

    filterRequests();

});