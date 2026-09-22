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

            window.location.replace(
                "user-dashboard.html"
            );

        } else {

            localStorage.removeItem("userEmail");
            localStorage.removeItem("userRole");
            localStorage.removeItem("stacklyLoggedIn");
            localStorage.removeItem("isLoggedIn");

            window.location.replace(
                "login.html"
            );
        }

        return;
    }

    let sidebarOpen = false;
    let historyDrawerAdded = false;
    let pageLocked = false;
    let savedScrollPosition = 0;
    let restoreTimerIds = [];
    let restoringScroll = false;

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

    function setScrollPosition(value) {

        const position =
            Math.max(
                0,
                Math.round(
                    Number(value) || 0
                )
            );

        window.scrollTo({
            top: position,
            left: 0,
            behavior: "auto"
        });

        document.documentElement.scrollTop =
            position;

        document.body.scrollTop =
            position;

        if (document.scrollingElement) {

            document.scrollingElement.scrollTop =
                position;
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
            () => {
                setScrollPosition(position);
            }
        );

        setTimeout(
            () => {
                setScrollPosition(position);
            },
            40
        );

        setTimeout(
            () => {
                setScrollPosition(position);
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
                    stacklyAdminUsersSidebar: true
                },
                "",
                window.location.href
            );

            historyDrawerAdded =
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

            if (
                event.key === "Escape"
            ) {

                closeUserModal();
            }
        }
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

    const userSearch =
        document.getElementById(
            "userSearch"
        );

    const statusFilter =
        document.getElementById(
            "statusFilter"
        );

    const projectFilter =
        document.getElementById(
            "projectFilter"
        );

    const usersTable =
        document.getElementById(
            "usersTable"
        );

    const visibleUserCount =
        document.getElementById(
            "visibleUserCount"
        );

    const emptyState =
        document.getElementById(
            "emptyState"
        );

    function filterUsers() {

        if (!usersTable) {
            return;
        }

        const rows =
            Array.from(
                usersTable.querySelectorAll(
                    "tbody tr"
                )
            );

        const searchValue =
            (
                userSearch?.value || ""
            )
                .trim()
                .toLowerCase();

        const statusValue =
            (
                statusFilter?.value || "all"
            )
                .toLowerCase();

        const projectValue =
            (
                projectFilter?.value || "all"
            )
                .toLowerCase();

        let visible = 0;

        rows.forEach(
            row => {

                const text =
                    row.textContent
                        .toLowerCase();

                const rowStatus =
                    (
                        row.dataset.status ||
                        ""
                    )
                        .toLowerCase();

                const rowProject =
                    (
                        row.dataset.project ||
                        ""
                    )
                        .toLowerCase();

                const matchesSearch =
                    !searchValue ||
                    text.includes(
                        searchValue
                    );

                const matchesStatus =
                    statusValue === "all" ||
                    rowStatus === statusValue;

                const matchesProject =
                    projectValue === "all" ||
                    rowProject === projectValue;

                const show =
                    matchesSearch &&
                    matchesStatus &&
                    matchesProject;

                row.style.display =
                    show
                        ? ""
                        : "none";

                if (show) {
                    visible++;
                }
            }
        );

        if (visibleUserCount) {

            visibleUserCount.textContent =
                `${visible} USER${visible === 1 ? "" : "S"}`;
        }

        if (emptyState) {

            emptyState.classList.toggle(
                "visible",
                visible === 0
            );
        }
    }

    userSearch?.addEventListener(
        "input",
        filterUsers
    );

    statusFilter?.addEventListener(
        "change",
        filterUsers
    );

    projectFilter?.addEventListener(
        "change",
        filterUsers
    );

    const userModal =
        document.getElementById(
            "userModal"
        );

    const userModalOverlay =
        document.getElementById(
            "userModalOverlay"
        );

    const closeUserModalButton =
        document.getElementById(
            "closeUserModal"
        );

    const cancelUserModalButton =
        document.getElementById(
            "cancelUserModal"
        );

    const addUserButton =
        document.getElementById(
            "addUserButton"
        );

    const userForm =
        document.getElementById(
            "userForm"
        );

    const modalTitle =
        document.getElementById(
            "modalTitle"
        );

    let modalMode =
        "add";

    function openUserModal(
        mode = "add"
    ) {

        if (!userModal) {
            return;
        }

        modalMode =
            mode;

        if (modalTitle) {

            modalTitle.textContent =
                mode === "edit"
                    ? "EDIT USER"
                    : "ADD NEW USER";
        }

        userModal.classList.add(
            "active"
        );

        userModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );
    }

    function closeUserModal() {

        if (!userModal) {
            return;
        }

        userModal.classList.remove(
            "active"
        );

        userModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

        modalMode =
            "add";
    }

    addUserButton?.addEventListener(
        "click",
        () => {

            if (userForm) {
                userForm.reset();
            }

            openUserModal(
                "add"
            );
        }
    );

    closeUserModalButton?.addEventListener(
        "click",
        closeUserModal
    );

    cancelUserModalButton?.addEventListener(
        "click",
        closeUserModal
    );

    userModalOverlay?.addEventListener(
        "click",
        closeUserModal
    );

    document
        .querySelectorAll(
            "[data-edit-user]"
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

                        if (!row) {
                            return;
                        }

                        const name =
                            row.querySelector(
                                ".user-cell strong"
                            )?.textContent.trim() ||
                            "";

                        const email =
                            row.children[1]
                                ?.textContent.trim() ||
                            "";

                        const nameInput =
                            document.getElementById(
                                "userName"
                            );

                        const emailInput =
                            document.getElementById(
                                "userEmail"
                            );

                        if (nameInput) {
                            nameInput.value =
                                name;
                        }

                        if (emailInput) {
                            emailInput.value =
                                email;
                        }

                        openUserModal(
                            "edit"
                        );
                    }
                );
            }
        );

    document
        .querySelectorAll(
            "[data-view-user]"
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

                        if (!row) {
                            return;
                        }

                        const name =
                            row.querySelector(
                                ".user-cell strong"
                            )?.textContent.trim() ||
                            "User";

                        openInfoModal(
                            name
                        );
                    }
                );
            }
        );

    function openInfoModal(
        name
    ) {

        const message =
            document.createElement(
                "div"
            );

        message.className =
            "temporary-user-message";

        message.innerHTML =
            `
            <div class="temporary-user-message-overlay"></div>
            <div class="temporary-user-message-box">
                <span>USER PROFILE</span>
                <strong>${escapeHtml(name)}</strong>
                <p>User details are available in the account workspace.</p>
                <button type="button">CLOSE</button>
            </div>
            `;

        document.body.appendChild(
            message
        );

        const style =
            document.createElement(
                "style"
            );

        style.textContent = `
            .temporary-user-message {
                position: fixed;
                inset: 0;
                z-index: 8000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }

            .temporary-user-message-overlay {
                position: absolute;
                inset: 0;
                background: rgba(0,0,0,.78);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
            }

            .temporary-user-message-box {
                position: relative;
                z-index: 2;
                width: min(420px,100%);
                padding: 24px;
                background: #0b0b0b;
                border: 1px solid #303030;
                border-radius: 14px;
                text-align: center;
            }

            .temporary-user-message-box span {
                display: block;
                margin-bottom: 6px;
                color: #ff3919;
                font-size: 12px;
                font-weight: 800;
                letter-spacing: 1px;
            }

            .temporary-user-message-box strong {
                display: block;
                color: #f2f2f0;
                font-family: "Barlow Condensed",sans-serif;
                font-size: 30px;
            }

            .temporary-user-message-box p {
                margin: 10px 0 18px;
                color: #777;
                font-size: 12px;
            }

            .temporary-user-message-box button {
                min-height: 42px;
                padding: 0 16px;
                color: #050505;
                background: #ff3919;
                border: 1px solid #ff3919;
                border-radius: 7px;
                font-size: 12px;
                font-weight: 800;
                cursor: pointer;
            }
        `;

        document.head.appendChild(
            style
        );

        const close =
            () => {

                message.remove();
                style.remove();
            };

        message
            .querySelector(
                "button"
            )
            ?.addEventListener(
                "click",
                close
            );

        message
            .querySelector(
                ".temporary-user-message-overlay"
            )
            ?.addEventListener(
                "click",
                close
            );
    }

    function escapeHtml(
        value
    ) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );
    }

    userForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            closeUserModal();

            userForm.reset();

            filterUsers();
        }
    );

    function saveReturnPosition() {

        const position =
            getScrollPosition();

        sessionStorage.setItem(
            "stacklyReturnPage",
            "admin-user.html"
        );

        sessionStorage.setItem(
            "stacklyReturnScroll",
            String(position)
        );

        sessionStorage.setItem(
            "stacklyAdminUsersScroll",
            String(position)
        );

        sessionStorage.setItem(
            "stacklyReturnState",
            JSON.stringify({
                returnPage:
                    "admin-user.html",
                restoreScroll:
                    position,
                time:
                    Date.now()
            })
        );

        return position;
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

            const position =
                saveReturnPosition();

            if (sidebarOpen) {

                historyDrawerAdded =
                    false;

                closeSidebar(true);
            }

            closeUserModal();

            const errorUrl =
                new URL(
                    "error.html",
                    window.location.href
                );

            errorUrl.searchParams.set(
                "returnPage",
                "admin-user.html"
            );

            errorUrl.searchParams.set(
                "restoreScroll",
                String(position)
            );

            window.location.assign(
                errorUrl.href
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
            closeUserModal();

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
                "stacklyReturnPage"
            );

            sessionStorage.removeItem(
                "stacklyReturnScroll"
            );

            sessionStorage.removeItem(
                "stacklyAdminUsersScroll"
            );

            sessionStorage.removeItem(
                "stacklyReturnState"
            );

            window.location.replace(
                "login.html"
            );
        }
    );

    function createRegistrationChart() {

        const canvas =
            document.getElementById(
                "userRegistrationChart"
            );

        if (
            !canvas ||
            typeof Chart === "undefined"
        ) {
            return;
        }

        const existing =
            Chart.getChart(
                canvas
            );

        if (existing) {
            existing.destroy();
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
                                    21,
                                    31,
                                    38,
                                    44,
                                    51,
                                    67
                                ],

                                borderColor:
                                    "#ff3919",

                                backgroundColor:
                                    "rgba(255,57,25,.08)",

                                borderWidth: 2,

                                fill: true,

                                tension: .4,

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
                                    "#2b2b2b",

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

                                grid: {

                                    color:
                                        "rgba(255,255,255,.045)"
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
                            }
                        }
                    }
                }
            );

        setTimeout(
            () => {
                chart.resize();
            },
            50
        );
    }

    function createStatusChart() {

        const canvas =
            document.getElementById(
                "userStatusChart"
            );

        if (
            !canvas ||
            typeof Chart === "undefined"
        ) {
            return;
        }

        const existing =
            Chart.getChart(
                canvas
            );

        if (existing) {
            existing.destroy();
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
                    type: "doughnut",

                    data: {

                        labels: [
                            "Active",
                            "Review",
                            "Inactive"
                        ],

                        datasets: [
                            {
                                data: [
                                    214,
                                    7,
                                    27
                                ],

                                backgroundColor: [
                                    "#51bb82",
                                    "#d5a148",
                                    "#555555"
                                ],

                                borderWidth: 0,

                                hoverOffset: 5
                            }
                        ]
                    },

                    options: {

                        responsive: true,

                        maintainAspectRatio: false,

                        cutout: "74%",

                        animation: false,

                        plugins: {

                            legend: {
                                display: false
                            },

                            tooltip: {

                                backgroundColor:
                                    "#0b0b0b",

                                borderColor:
                                    "#2b2b2b",

                                borderWidth: 1,

                                titleColor:
                                    "#f2f2f0",

                                bodyColor:
                                    "#888"
                            }
                        }
                    }
                }
            );

        setTimeout(
            () => {
                chart.resize();
            },
            50
        );
    }

    function initializeCharts() {

        if (
            typeof Chart !== "undefined"
        ) {

            createRegistrationChart();

            createStatusChart();

            return;
        }

        const script =
            document.createElement(
                "script"
            );

        script.src =
            "https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.min.js";

        script.async =
            true;

        script.onload =
            () => {

                createRegistrationChart();

                createStatusChart();
            };

        document.head.appendChild(
            script
        );
    }

    function restorePreviousScroll() {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const returnPage =
            params.get(
                "returnPage"
            );

        let scrollValue =
            params.get(
                "restoreScroll"
            );

        if (
            (
                scrollValue === null ||
                scrollValue === ""
            ) &&
            returnPage === "admin-user.html"
        ) {

            scrollValue =
                sessionStorage.getItem(
                    "stacklyReturnScroll"
                );
        }

        if (
            scrollValue === null ||
            scrollValue === ""
        ) {

            scrollValue =
                sessionStorage.getItem(
                    "stacklyAdminUsersScroll"
                );
        }

        const targetPosition =
            Number(
                scrollValue
            );

        if (
            !Number.isFinite(
                targetPosition
            )
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

                const maxScroll =
                    getMaximumScroll();

                const safePosition =
                    Math.min(
                        Math.max(
                            0,
                            targetPosition
                        ),
                        maxScroll
                    );

                setScrollPosition(
                    safePosition
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
            450,
            600,
            800,
            1000,
            1300,
            1600
        ].forEach(
            delay => {

                restoreTimerIds.push(
                    setTimeout(
                        restore,
                        delay
                    )
                );
            }
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
                        "stacklyReturnPage"
                    );

                    sessionStorage.removeItem(
                        "stacklyReturnScroll"
                    );

                    sessionStorage.removeItem(
                        "stacklyAdminUsersScroll"
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

            restorePreviousScroll();
        }
    );

    window.addEventListener(
        "resize",
        () => {

            if (!restoringScroll) {
                return;
            }

            restorePreviousScroll();
        }
    );

    filterUsers();

    initializeCharts();

    if (
        typeof gsap !== "undefined"
    ) {

        gsap.fromTo(
            ".users-hero-copy",
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
            ".users-hero-visual",
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
            ".user-stat-card",
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
            ".users-tools,.users-table-card,.dashboard-card",
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
            ".ring-one",
            {
                rotation: 360,
                duration: 18,
                repeat: -1,
                ease: "none"
            }
        );

        gsap.to(
            ".ring-two",
            {
                rotation: -360,
                duration: 26,
                repeat: -1,
                ease: "none"
            }
        );

        gsap.to(
            ".ring-three",
            {
                rotation: 360,
                duration: 34,
                repeat: -1,
                ease: "none"
            }
        );

        gsap.to(
            ".visual-center",
            {
                y: -4,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            }
        );
    }

    const immediateParams =
        new URLSearchParams(
            window.location.search
        );

    const immediateReturnPage =
        immediateParams.get(
            "returnPage"
        );

    const immediateScroll =
        immediateParams.get(
            "restoreScroll"
        );

    if (
        immediateReturnPage === "admin-user.html" &&
        immediateScroll !== null
    ) {

        setTimeout(
            restorePreviousScroll,
            10
        );
    }

});