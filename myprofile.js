document.addEventListener("DOMContentLoaded", () => {

    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    const PAGE_NAME = "myprofile.html";
    const RETURN_STATE_KEY = "stacklyReturnState";
    const RETURN_PAGE_KEY = "stacklyReturnPage";
    const RETURN_SCROLL_KEY = "stacklyReturnScroll";
    const PAGE_SCROLL_KEY = "stacklyMyProfileScroll";

    const sidebar =
        document.getElementById("consultingSidebar");

    const overlay =
        document.getElementById("sidebarOverlay");

    const menuButton =
        document.getElementById("mobileMenuButton");

    const logoutButton =
        document.getElementById("logoutButton");

    const header =
        document.querySelector(".consulting-header");

    const savedEmail =
        localStorage.getItem("userEmail");

    const savedRole =
        (localStorage.getItem("userRole") || "")
            .trim()
            .toLowerCase();

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
    let historyDrawerAdded = false;
    let scrollLocked = false;
    let savedScrollPosition = 0;
    let returnRestoreActive = false;
    let returnTimers = [];

    const originalBody = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        right: document.body.style.right,
        width: document.body.style.width,
        height: document.body.style.height,
        overflow: document.body.style.overflow,
        touchAction: document.body.style.touchAction,
        overscrollBehavior: document.body.style.overscrollBehavior
    };

    const originalHtml = {
        overflow: document.documentElement.style.overflow,
        height: document.documentElement.style.height,
        overscrollBehavior: document.documentElement.style.overscrollBehavior
    };

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

    function setScrollPosition(value) {

        if (!Number.isFinite(Number(value))) {
            return;
        }

        const position =
            Math.max(
                0,
                Math.round(Number(value))
            );

        window.scrollTo({
            top: position,
            left: 0,
            behavior: "auto"
        });

        document.documentElement.scrollTop = position;
        document.body.scrollTop = position;

        if (document.scrollingElement) {
            document.scrollingElement.scrollTop = position;
        }
    }

    function clearReturnTimers() {

        returnTimers.forEach(
            timer => clearTimeout(timer)
        );

        returnTimers = [];
    }

    function removeReturnParameters() {

        const url =
            new URL(window.location.href);

        url.searchParams.delete("returnPage");
        url.searchParams.delete("restoreScroll");

        history.replaceState(
            history.state,
            "",
            url.pathname +
            url.search +
            url.hash
        );
    }

    function clearReturnStorage() {

        sessionStorage.removeItem(
            RETURN_STATE_KEY
        );

        sessionStorage.removeItem(
            RETURN_PAGE_KEY
        );

        sessionStorage.removeItem(
            RETURN_SCROLL_KEY
        );

        sessionStorage.removeItem(
            PAGE_SCROLL_KEY
        );

        sessionStorage.removeItem(
            "stacklyReturnTarget"
        );

        sessionStorage.removeItem(
            "stacklyReturnSection"
        );
    }

    function getStoredReturnState() {

        const raw =
            sessionStorage.getItem(
                RETURN_STATE_KEY
            );

        if (!raw) {
            return null;
        }

        try {

            const state =
                JSON.parse(raw);

            if (!state) {
                return null;
            }

            const returnPage =
                state.returnPage ||
                sessionStorage.getItem(
                    RETURN_PAGE_KEY
                );

            if (returnPage !== PAGE_NAME) {
                return null;
            }

            const restoreScroll =
                Number(
                    state.restoreScroll ??
                    sessionStorage.getItem(
                        RETURN_SCROLL_KEY
                    )
                );

            if (!Number.isFinite(restoreScroll)) {
                return null;
            }

            return {
                ...state,
                returnPage: PAGE_NAME,
                restoreScroll:
                    Math.max(
                        0,
                        Math.round(
                            restoreScroll
                        )
                    )
            };

        } catch (error) {

            return null;
        }
    }

    function getUrlReturnState() {

        const params =
            new URLSearchParams(
                window.location.search
            );

        const returnPage =
            params.get("returnPage");

        const restoreScroll =
            params.get("restoreScroll");

        if (
            returnPage &&
            returnPage !== PAGE_NAME
        ) {
            return null;
        }

        if (
            restoreScroll === null ||
            restoreScroll === ""
        ) {
            return null;
        }

        const scroll =
            Number(restoreScroll);

        if (!Number.isFinite(scroll)) {
            return null;
        }

        return {
            returnPage: PAGE_NAME,
            restoreScroll:
                Math.max(
                    0,
                    Math.round(scroll)
                ),
            targetId: null,
            targetSelector: null
        };
    }

    function buildElementSelector(element) {

        if (!element) {
            return null;
        }

        if (element.id) {

            if (
                window.CSS &&
                typeof CSS.escape === "function"
            ) {
                return "#" +
                    CSS.escape(
                        element.id
                    );
            }

            return "#" + element.id;
        }

        const parts = [];
        let current = element;

        while (
            current &&
            current !== document.body &&
            current.nodeType === 1
        ) {

            if (current.id) {

                const id =
                    window.CSS &&
                    typeof CSS.escape === "function"
                        ? CSS.escape(
                            current.id
                        )
                        : current.id;

                parts.unshift(
                    "#" + id
                );

                break;
            }

            const tag =
                current.tagName.toLowerCase();

            const parent =
                current.parentElement;

            if (!parent) {
                break;
            }

            const siblings =
                Array.from(
                    parent.children
                ).filter(
                    child =>
                        child.tagName &&
                        child.tagName.toLowerCase() ===
                        tag
                );

            const index =
                siblings.indexOf(
                    current
                ) + 1;

            parts.unshift(
                `${tag}:nth-of-type(${index})`
            );

            current =
                parent;
        }

        return parts.length
            ? parts.join(" > ")
            : null;
    }

    function findReturnTarget(state) {

        if (!state) {
            return null;
        }

        if (state.targetId) {

            const target =
                document.getElementById(
                    state.targetId
                );

            if (target) {
                return target;
            }
        }

        if (state.targetSelector) {

            try {

                const target =
                    document.querySelector(
                        state.targetSelector
                    );

                if (target) {
                    return target;
                }

            } catch (error) {
            }
        }

        const storedSelector =
            sessionStorage.getItem(
                "stacklyReturnTarget"
            );

        if (storedSelector) {

            try {

                return document.querySelector(
                    storedSelector
                );

            } catch (error) {
            }
        }

        return null;
    }

    function getHeaderHeight() {

        if (!header) {
            return 0;
        }

        return Math.round(
            header.getBoundingClientRect().height
        );
    }

    function targetVisible(target) {

        if (!target) {
            return false;
        }

        const rect =
            target.getBoundingClientRect();

        const top =
            getHeaderHeight() + 15;

        const bottom =
            window.innerHeight - 15;

        return (
            rect.bottom > top &&
            rect.top < bottom
        );
    }

    function moveTargetIntoView(target) {

        if (!target) {
            return;
        }

        const current =
            getCurrentScroll();

        const rect =
            target.getBoundingClientRect();

        const targetPosition =
            Math.max(
                0,
                Math.round(
                    current +
                    rect.top -
                    getHeaderHeight() -
                    25
                )
            );

        setScrollPosition(
            targetPosition
        );
    }

    function saveReturnState(errorLink) {

        const scroll =
            getCurrentScroll();

        const state = {
            returnPage: PAGE_NAME,
            restoreScroll: scroll,
            targetId:
                errorLink.id || null,
            targetSelector:
                buildElementSelector(
                    errorLink
                ),
            targetSectionId:
                errorLink.closest(
                    "section"
                )?.id || null,
            time: Date.now()
        };

        sessionStorage.setItem(
            RETURN_STATE_KEY,
            JSON.stringify(state)
        );

        sessionStorage.setItem(
            RETURN_PAGE_KEY,
            PAGE_NAME
        );

        sessionStorage.setItem(
            RETURN_SCROLL_KEY,
            String(scroll)
        );

        sessionStorage.setItem(
            PAGE_SCROLL_KEY,
            String(scroll)
        );

        if (state.targetSelector) {

            sessionStorage.setItem(
                "stacklyReturnTarget",
                state.targetSelector
            );
        }

        if (state.targetSectionId) {

            sessionStorage.setItem(
                "stacklyReturnSection",
                state.targetSectionId
            );
        }

        return state;
    }

    function restoreReturnPosition(state) {

        if (!state) {
            return false;
        }

        const scroll =
            Number(
                state.restoreScroll
            );

        if (!Number.isFinite(scroll)) {
            return false;
        }

        clearReturnTimers();

        returnRestoreActive = true;

        const forceRestore =
            () => {

                if (!returnRestoreActive) {
                    return;
                }

                setScrollPosition(
                    scroll
                );
            };

        forceRestore();

        requestAnimationFrame(
            forceRestore
        );

        [
            20,
            50,
            100,
            150,
            220,
            300,
            450,
            650,
            850,
            1100,
            1400,
            1800,
            2200,
            2700
        ].forEach(
            delay => {

                returnTimers.push(
                    setTimeout(
                        forceRestore,
                        delay
                    )
                );
            }
        );

        const targetCheck =
            () => {

                const target =
                    findReturnTarget(
                        state
                    );

                if (
                    target &&
                    !targetVisible(
                        target
                    )
                ) {

                    moveTargetIntoView(
                        target
                    );

                    forceRestore();
                }
            };

        [
            350,
            700,
            1100,
            1600,
            2200,
            2800
        ].forEach(
            delay => {

                returnTimers.push(
                    setTimeout(
                        targetCheck,
                        delay
                    )
                );
            }
        );

        if (
            document.fonts &&
            document.fonts.ready
        ) {

            document.fonts.ready
                .then(
                    forceRestore
                )
                .catch(
                    () => {}
                );
        }

        document
            .querySelectorAll("img")
            .forEach(
                image => {

                    if (!image.complete) {

                        image.addEventListener(
                            "load",
                            forceRestore,
                            {
                                once: true
                            }
                        );

                        image.addEventListener(
                            "error",
                            forceRestore,
                            {
                                once: true
                            }
                        );
                    }
                }
            );

        window.addEventListener(
            "load",
            forceRestore,
            {
                once: true
            }
        );

        returnTimers.push(
            setTimeout(
                () => {

                    targetCheck();

                    forceRestore();

                    removeReturnParameters();

                },
                3000
            )
        );

        returnTimers.push(
            setTimeout(
                () => {

                    returnRestoreActive =
                        false;

                    clearReturnStorage();

                    returnTimers = [];

                },
                3400
            )
        );

        return true;
    }

    function initializeReturnPosition() {

        const urlState =
            getUrlReturnState();

        const storedState =
            getStoredReturnState();

        const state =
            urlState ||
            storedState;

        if (!state) {
            return false;
        }

        return restoreReturnPosition(
            state
        );
    }

    function lockScroll() {

        if (scrollLocked) {
            return;
        }

        savedScrollPosition =
            getCurrentScroll();

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

        document.body.classList.add(
            "sidebar-open"
        );

        document.documentElement.classList.add(
            "sidebar-is-locked"
        );

        scrollLocked = true;
    }

    function unlockScroll() {

        if (!scrollLocked) {
            return;
        }

        document.body.classList.remove(
            "sidebar-open"
        );

        document.documentElement.classList.remove(
            "sidebar-is-locked"
        );

        if (originalHtml.overflow) {

            document.documentElement.style.overflow =
                originalHtml.overflow;

        } else {

            document.documentElement.style.removeProperty(
                "overflow"
            );
        }

        if (originalHtml.height) {

            document.documentElement.style.height =
                originalHtml.height;

        } else {

            document.documentElement.style.removeProperty(
                "height"
            );
        }

        if (
            originalHtml.overscrollBehavior
        ) {

            document.documentElement.style.overscrollBehavior =
                originalHtml.overscrollBehavior;

        } else {

            document.documentElement.style.removeProperty(
                "overscroll-behavior"
            );
        }

        document.body.style.position =
            originalBody.position;

        document.body.style.top =
            originalBody.top;

        document.body.style.left =
            originalBody.left;

        document.body.style.right =
            originalBody.right;

        document.body.style.width =
            originalBody.width;

        document.body.style.height =
            originalBody.height;

        document.body.style.overflow =
            originalBody.overflow;

        document.body.style.touchAction =
            originalBody.touchAction;

        document.body.style.overscrollBehavior =
            originalBody.overscrollBehavior;

        scrollLocked = false;

        requestAnimationFrame(
            () => {
                setScrollPosition(
                    savedScrollPosition
                );
            }
        );

        setTimeout(
            () => {
                setScrollPosition(
                    savedScrollPosition
                );
            },
            50
        );

        setTimeout(
            () => {
                setScrollPosition(
                    savedScrollPosition
                );
            },
            150
        );
    }

    function updateMenuButton(open) {

        if (!menuButton) {
            return;
        }

        if (open) {

            menuButton.innerHTML =
                '<i class="bi bi-x-lg"></i>';

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

            menuButton.setAttribute(
                "aria-label",
                "Close navigation"
            );

        } else {

            menuButton.innerHTML =
                '<i class="bi bi-list"></i>';

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation"
            );
        }
    }

    function addDrawerHistory() {

        if (
            historyDrawerAdded ||
            window.innerWidth > 991
        ) {
            return;
        }

        history.pushState(
            {
                stacklySidebar: true
            },
            "",
            window.location.href
        );

        historyDrawerAdded = true;
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
            getCurrentScroll();

        lockScroll();

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

        updateMenuButton(
            true
        );

        if (header) {
            header.style.zIndex =
                "3100";
        }

        addDrawerHistory();

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
                    opacity: 0.8
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power3.out"
                }
            );
        }

        setScrollPosition(
            savedScrollPosition
        );
    }

    function closeSidebar(
        fromPopState = false
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

        updateMenuButton(
            false
        );

        if (header) {
            header.style.removeProperty(
                "z-index"
            );
        }

        unlockScroll();

        if (
            !fromPopState &&
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

    overlay?.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            closeSidebar();
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
        "keydown",
        event => {

            if (!sidebarOpen) {
                return;
            }

            if (
                event.key === "Escape"
            ) {

                event.preventDefault();

                closeSidebar();

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
                sidebar &&
                sidebar.contains(target)
            ) {
                return;
            }

            event.preventDefault();
        },
        true
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

    window.addEventListener(
        "popstate",
        () => {

            if (sidebarOpen) {

                historyDrawerAdded =
                    false;

                closeSidebar(true);

                return;
            }

            historyDrawerAdded =
                false;
        }
    );

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 991 &&
                sidebarOpen
            ) {

                closeSidebar(true);
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
                            window.innerWidth <= 991 &&
                            sidebarOpen
                        ) {

                            closeSidebar(true);

                            historyDrawerAdded =
                                false;
                        }
                    }
                );
            }
        );

    function getDisplayName(email) {

        if (!email) {
            return "User";
        }

        const cleanName =
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

        if (!cleanName) {
            return "User";
        }

        return cleanName
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

    [
        "sidebarUserName",
        "headerUserName",
        "profileDisplayName",
        "detailName"
    ].forEach(
        id => {

            const element =
                document.getElementById(
                    id
                );

            if (element) {
                element.textContent =
                    displayName;
            }
        }
    );

    [
        "sidebarUserEmail",
        "profileDisplayEmail",
        "detailEmail"
    ].forEach(
        id => {

            const element =
                document.getElementById(
                    id
                );

            if (element) {
                element.textContent =
                    savedEmail;
            }
        }
    );

    const formattedRole =
        savedRole.charAt(0).toUpperCase() +
        savedRole.slice(1);

    [
        "profileRole",
        "detailRole"
    ].forEach(
        id => {

            const element =
                document.getElementById(
                    id
                );

            if (element) {
                element.textContent =
                    formattedRole;
            }
        }
    );

    const errorLinks =
        document.querySelectorAll(
            'a[href="error.html"], a[href$="/error.html"], a[data-error-link]'
        );

    errorLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();
                    event.stopPropagation();

                    const state =
                        saveReturnState(
                            link
                        );

                    if (sidebarOpen) {

                        closeSidebar(true);

                        historyDrawerAdded =
                            false;
                    }

                    const errorUrl =
                        new URL(
                            "error.html",
                            window.location.href
                        );

                    errorUrl.searchParams.set(
                        "returnPage",
                        PAGE_NAME
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
                },
                true
            );
        }
    );

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                closeSidebar(true);

                clearReturnTimers();

                returnRestoreActive =
                    false;

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

                clearReturnStorage();

                window.location.replace(
                    "login.html"
                );
            }
        );
    }

    const returningFromError =
        initializeReturnPosition();

    if (
        typeof gsap !== "undefined"
    ) {

        if (!returningFromError) {

            gsap.fromTo(
                ".profile-hero-content",
                {
                    opacity: 0,
                    y: 28
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out"
                }
            );

            gsap.fromTo(
                ".profile-status-card",
                {
                    opacity: 0,
                    x: 22
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    delay: 0.1,
                    ease: "power3.out"
                }
            );

            gsap.fromTo(
                ".profile-summary-card",
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: 0.18,
                    ease: "power3.out"
                }
            );

            gsap.fromTo(
                ".security-card",
                {
                    opacity: 0,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.45,
                    stagger: 0.07,
                    delay: 0.3,
                    ease: "power3.out"
                }
            );

            gsap.fromTo(
                ".preference-row",
                {
                    opacity: 0,
                    y: 15
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.06,
                    delay: 0.36,
                    ease: "power3.out"
                }
            );

            gsap.fromTo(
                ".quick-card",
                {
                    opacity: 0,
                    y: 18
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.42,
                    stagger: 0.06,
                    delay: 0.42,
                    ease: "power3.out"
                }
            );

            gsap.fromTo(
                ".support-panel",
                {
                    opacity: 0,
                    y: 18
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: 0.48,
                    ease: "power3.out"
                }
            );

        } else {

            gsap.set(
                [
                    ".profile-hero-content",
                    ".profile-status-card",
                    ".profile-summary-card",
                    ".summary-stat",
                    ".security-card",
                    ".preference-row",
                    ".quick-card",
                    ".support-panel"
                ],
                {
                    opacity: 1,
                    clearProps: "transform"
                }
            );
        }

        document
            .querySelectorAll(
                ".security-card, .quick-card"
            )
            .forEach(
                card => {

                    card.addEventListener(
                        "mouseenter",
                        () => {

                            gsap.to(
                                card,
                                {
                                    y: -4,
                                    duration: 0.25,
                                    ease: "power2.out"
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
                                    y: 0,
                                    duration: 0.3,
                                    ease: "power2.out"
                                }
                            );
                        }
                    );
                }
            );
    }

    window.addEventListener(
        "scroll",
        () => {

            if (
                returnRestoreActive ||
                sidebarOpen
            ) {
                return;
            }

            sessionStorage.setItem(
                PAGE_SCROLL_KEY,
                String(
                    getCurrentScroll()
                )
            );
        },
        {
            passive: true
        }
    );
});