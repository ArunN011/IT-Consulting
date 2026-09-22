if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("pageLoader");
    const progress = document.getElementById("loaderProgress");
    const percentage = document.getElementById("loaderPercent");

    const params = new URLSearchParams(window.location.search);
    const restoreScrollParam = params.get("restoreScroll");

    const parsedRestoreScroll =
        restoreScrollParam !== null
            ? parseInt(restoreScrollParam, 10)
            : NaN;

    const shouldRestoreScroll =
        restoreScrollParam !== null &&
        Number.isFinite(parsedRestoreScroll) &&
        parsedRestoreScroll >= 0;

    const targetScroll = shouldRestoreScroll
        ? parsedRestoreScroll
        : 0;

    const saveReturnPosition = () => {

        document.querySelectorAll("a[href*='error.html']").forEach(link => {

            if (link.dataset.returnPositionBound === "true") {
                return;
            }

            link.dataset.returnPositionBound = "true";

            link.addEventListener("click", () => {

                const href = link.getAttribute("href");

                if (!href || !href.includes("error.html")) {
                    return;
                }

                const currentPage =
                    window.location.pathname +
                    window.location.search +
                    window.location.hash;

                const currentScroll =
                    Math.max(0, Math.round(window.scrollY));

                sessionStorage.setItem(
                    "stacklyReturnPage",
                    currentPage
                );

                sessionStorage.setItem(
                    "stacklyReturnScroll",
                    String(currentScroll)
                );

                const destination =
                    new URL(href, window.location.href);

                destination.searchParams.set(
                    "returnPage",
                    currentPage
                );

                destination.searchParams.set(
                    "restoreScroll",
                    String(currentScroll)
                );

                sessionStorage.setItem(
                    "stacklyReturnUrl",
                    destination.href
                );

                link.setAttribute(
                    "href",
                    destination.href
                );
            });
        });
    };

    saveReturnPosition();

    document.addEventListener("click", event => {

        const link =
            event.target.closest("a[href*='error.html']");

        if (!link) {
            return;
        }

        if (link.dataset.returnPositionBound === "true") {
            return;
        }

        const href = link.getAttribute("href");

        if (!href || !href.includes("error.html")) {
            return;
        }

        const currentPage =
            window.location.pathname +
            window.location.search +
            window.location.hash;

        const currentScroll =
            Math.max(0, Math.round(window.scrollY));

        sessionStorage.setItem(
            "stacklyReturnPage",
            currentPage
        );

        sessionStorage.setItem(
            "stacklyReturnScroll",
            String(currentScroll)
        );

        const destination =
            new URL(href, window.location.href);

        destination.searchParams.set(
            "returnPage",
            currentPage
        );

        destination.searchParams.set(
            "restoreScroll",
            String(currentScroll)
        );

        sessionStorage.setItem(
            "stacklyReturnUrl",
            destination.href
        );

        link.setAttribute(
            "href",
            destination.href
        );
    });

    if (!loader || !progress || !percentage) {

        if (shouldRestoreScroll) {

            const restoreWithoutLoader = () => {

                if (
                    typeof ScrollTrigger !== "undefined" &&
                    typeof ScrollTrigger.refresh === "function"
                ) {
                    ScrollTrigger.refresh();
                }

                window.scrollTo({
                    top: targetScroll,
                    left: 0,
                    behavior: "auto"
                });

            };

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTimeout(restoreWithoutLoader, 80);
                });
            });
        }

        return;
    }

    let loaderActive = true;

    const preventLoaderScroll = event => {

        if (!loaderActive) {
            return;
        }

        event.preventDefault();
    };

    const preventLoaderKeys = event => {

        if (!loaderActive) {
            return;
        }

        const blockedKeys = [
            "ArrowUp",
            "ArrowDown",
            "PageUp",
            "PageDown",
            "Home",
            "End",
            " ",
            "Spacebar"
        ];

        if (blockedKeys.includes(event.key)) {
            event.preventDefault();
        }
    };

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
    });

    document.documentElement.style.overflow = "hidden";

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = "0";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.classList.add("loader-active");

    window.addEventListener(
        "wheel",
        preventLoaderScroll,
        { passive: false }
    );

    window.addEventListener(
        "touchmove",
        preventLoaderScroll,
        { passive: false }
    );

    window.addEventListener(
        "keydown",
        preventLoaderKeys,
        { passive: false }
    );

    const duration = 3000;
    const startTime = performance.now();

    function restoreScrollPosition() {

        if (!shouldRestoreScroll) {
            return;
        }

        const applyScroll = () => {

            if (
                typeof ScrollTrigger !== "undefined" &&
                typeof ScrollTrigger.refresh === "function"
            ) {
                ScrollTrigger.refresh();
            }

            window.scrollTo({
                top: targetScroll,
                left: 0,
                behavior: "auto"
            });

            const cleanUrl =
                window.location.pathname +
                window.location.hash;

            window.history.replaceState(
                null,
                document.title,
                cleanUrl
            );

            sessionStorage.removeItem(
                "stacklyReturnPage"
            );

            sessionStorage.removeItem(
                "stacklyReturnScroll"
            );
        };

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                setTimeout(() => {
                    applyScroll();
                }, 80);

            });

        });
    }

    function finishLoader() {

        loaderActive = false;

        window.removeEventListener(
            "wheel",
            preventLoaderScroll
        );

        window.removeEventListener(
            "touchmove",
            preventLoaderScroll
        );

        window.removeEventListener(
            "keydown",
            preventLoaderKeys
        );

        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";

        document.body.classList.remove("loader-active");

        restoreScrollPosition();

        loader.classList.add("loader-complete");

        setTimeout(() => {
            if (loader && loader.parentNode) {
                loader.remove();
            }
        }, 600);
    }

    function updateLoader(currentTime) {

        const elapsed =
            currentTime - startTime;

        let value =
            (elapsed / duration) * 100;

        value = Math.min(value, 100);

        progress.style.width =
            value + "%";

        percentage.textContent =
            Math.floor(value) + "%";

        if (value < 100) {

            requestAnimationFrame(updateLoader);

        } else {

            progress.style.width = "100%";
            percentage.textContent = "100%";

            setTimeout(finishLoader, 150);
        }
    }

    requestAnimationFrame(updateLoader);

});

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menuButton");
    const mobileNavigation = document.getElementById("mobileNavigation");
    const mobileOverlay = document.getElementById("mobileOverlay");
    const mobileClose = document.getElementById("mobileClose");

    let savedScrollPosition = 0;
    let menuOpen = false;

    function lockScroll() {

        savedScrollPosition = window.scrollY;

        document.body.style.position = "fixed";
        document.body.style.top = `-${savedScrollPosition}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";

        document.body.classList.add("menu-open");

        menuOpen = true;
    }

    function unlockScroll() {

        document.body.classList.remove("menu-open");

        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        window.scrollTo({
            top: savedScrollPosition,
            left: 0,
            behavior: "auto"
        });

        menuOpen = false;
    }

    function openMenu() {

        if (!mobileNavigation || !mobileOverlay || menuOpen) {
            return;
        }

        mobileNavigation.classList.add("active");
        mobileOverlay.classList.add("active");

        lockScroll();
    }

    function closeMenu() {

        if (!mobileNavigation || !mobileOverlay || !menuOpen) {
            return;
        }

        mobileNavigation.classList.remove("active");
        mobileOverlay.classList.remove("active");

        unlockScroll();
    }

    if (menuButton) {
        menuButton.addEventListener("click", openMenu);
    }

    if (mobileClose) {
        mobileClose.addEventListener("click", closeMenu);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener("click", closeMenu);
    }

    document.querySelectorAll(
        ".mobile-nav-link, .mobile-login, .mobile-register"
    ).forEach(link => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 991 && menuOpen) {
            closeMenu();
        }

    });


    const cursorGlow = document.getElementById("cursorGlow");
    const cursorDot = document.getElementById("cursorDot");

    if (
        cursorGlow &&
        cursorDot &&
        window.matchMedia("(min-width: 992px)").matches
    ) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let glowX = mouseX;
        let glowY = mouseY;

        let dotX = mouseX;
        let dotY = mouseY;

        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorGlow.style.opacity = "1";
            cursorDot.style.opacity = "1";
        });

        function animateCursor() {

            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;

            dotX += (mouseX - dotX) * 0.23;
            dotY += (mouseY - dotY) * 0.23;

            cursorGlow.style.transform =
                `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;

            cursorDot.style.transform =
                `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        document.addEventListener("mouseleave", () => {
            cursorGlow.style.opacity = "0";
            cursorDot.style.opacity = "0";
        });

        document.addEventListener("mouseenter", () => {
            cursorGlow.style.opacity = "1";
            cursorDot.style.opacity = "1";
        });

        document.querySelectorAll("a, button").forEach(element => {

            element.addEventListener("mouseenter", () => {

                cursorGlow.style.width = "280px";
                cursorGlow.style.height = "280px";

            });

            element.addEventListener("mouseleave", () => {

                cursorGlow.style.width = "220px";
                cursorGlow.style.height = "220px";

            });

        });
    }


    if (typeof gsap === "undefined") {
        console.error("GSAP is not loaded.");
        return;
    }
});