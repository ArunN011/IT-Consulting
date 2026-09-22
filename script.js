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


    const hero = document.querySelector(".stackly-hero");
    const letters = document.querySelectorAll(".stackly-word span");
    const heroImage = document.querySelector(".stackly-hero-image");
    const heroDescription = document.querySelector(".stackly-hero-description");
    const heroStats = document.querySelectorAll(".hero-stat");
    const marquee = document.querySelector(".stackly-marquee");


    if (hero && letters.length) {

        gsap.set(letters, {
            color: "#373737",
            opacity: 0,
            y: 40,
            scale: 1
        });

        gsap.to(letters, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });


        if (heroDescription) {

            gsap.set(heroDescription, {
                opacity: 0,
                y: 25
            });

            gsap.to(heroDescription, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                delay: 0.55,
                ease: "power3.out"
            });
        }


        if (heroStats.length) {

            gsap.set(heroStats, {
                opacity: 0,
                y: 20
            });

            gsap.to(heroStats, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.9,
                stagger: 0.12,
                ease: "power3.out"
            });
        }


        if (marquee) {

            gsap.set(marquee, {
                opacity: 0,
                y: 20
            });

            gsap.to(marquee, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 1.1,
                ease: "power3.out"
            });
        }


        if (heroImage) {

            gsap.fromTo(
                heroImage,
                {
                    scale: 1.12,
                    x: 30
                },
                {
                    scale: 1.04,
                    x: 0,
                    duration: 2,
                    ease: "power3.out"
                }
            );
        }


        const letterTimeline = gsap.timeline({
            repeat: -1,
            repeatDelay: 0.6
        });

        letters.forEach(letter => {

            letterTimeline.to(letter, {
                color: "#ff3b19",
                scale: 1.08,
                duration: 0.42,
                ease: "power2.out"
            });

            letterTimeline.to(letter, {
                color: "#373737",
                scale: 1,
                duration: 0.48,
                ease: "power2.inOut"
            });

            letterTimeline.to({}, {
                duration: 0.08
            });

        });


        if (heroImage) {

            hero.addEventListener("mousemove", event => {

                if (window.innerWidth <= 991) {
                    return;
                }

                const rect = hero.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height - 0.5;

                gsap.to(heroImage, {
                    x: x * -16,
                    y: y * -8,
                    duration: 1,
                    ease: "power3.out",
                    overwrite: true
                });

            });


            hero.addEventListener("mouseleave", () => {

                gsap.to(heroImage, {
                    x: 0,
                    y: 0,
                    duration: 1.1,
                    ease: "power3.out",
                    overwrite: true
                });

            });
        }
    }


    const clientItems = document.querySelectorAll(".client-item");

    if (clientItems.length) {

        gsap.set(clientItems, {
            opacity: 0,
            y: 18
        });

        const clientSection = document.querySelector(".client-strip");

        if (clientSection) {

            const clientObserver = new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        gsap.to(clientItems, {
                            opacity: 1,
                            y: 0,
                            duration: 0.7,
                            stagger: 0.12,
                            ease: "power3.out"
                        });

                        clientObserver.unobserve(clientSection);
                    });

                },
                {
                    threshold: 0.15
                }
            );

            clientObserver.observe(clientSection);
        }
    }


    const deploymentsSection =
        document.querySelector(".deployments-section");

    if (deploymentsSection) {

        const eyebrow =
            deploymentsSection.querySelector(".deployments-eyebrow");

        const title =
            deploymentsSection.querySelector(".deployments-title");

        const description =
            deploymentsSection.querySelector(".deployments-description");

        const divider =
            deploymentsSection.querySelector(".deployments-divider");

        const cards =
            deploymentsSection.querySelectorAll(".deployment-card");


        gsap.set(
            [
                eyebrow,
                title,
                description,
                divider,
                ...cards
            ].filter(Boolean),
            {
                opacity: 0,
                y: 35
            }
        );


        const deploymentObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const tl = gsap.timeline();

                        if (eyebrow) {

                            tl.to(eyebrow, {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                ease: "power3.out"
                            });
                        }

                        if (title) {

                            tl.to(
                                title,
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.8,
                                    ease: "power3.out"
                                },
                                "-=0.3"
                            );
                        }

                        if (description) {

                            tl.to(
                                description,
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.7,
                                    ease: "power3.out"
                                },
                                "-=0.55"
                            );
                        }

                        if (divider) {

                            tl.to(
                                divider,
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.45,
                                    ease: "power2.out"
                                },
                                "-=0.35"
                            );
                        }

                        if (cards.length) {

                            tl.to(
                                cards,
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.8,
                                    stagger: 0.13,
                                    ease: "power3.out"
                                },
                                "-=0.15"
                            );
                        }

                        deploymentObserver.unobserve(
                            deploymentsSection
                        );
                    });

                },
                {
                    threshold: 0.12
                }
            );

        deploymentObserver.observe(
            deploymentsSection
        );


        cards.forEach(card => {

            const image =
                card.querySelector(".deployment-image");

            const arrow =
                card.querySelector(".deployment-arrow");

            if (!image) {
                return;
            }

            card.addEventListener("mouseenter", () => {

                if (window.innerWidth >= 992) {

                    gsap.to(image, {
                        scale: 1.055,
                        duration: 0.6,
                        ease: "power3.out",
                        overwrite: true
                    });

                }

            });


            card.addEventListener("mousemove", event => {

                if (window.innerWidth < 992) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height - 0.5;

                gsap.to(image, {
                    x: x * -10,
                    y: y * -7,
                    scale: 1.09,
                    duration: 0.7,
                    ease: "power3.out",
                    overwrite: true
                });

                if (arrow) {

                    gsap.to(arrow, {
                        x: x * 4,
                        y: y * 3,
                        duration: 0.5,
                        ease: "power3.out",
                        overwrite: true
                    });

                }

            });


            card.addEventListener("mouseleave", () => {

                gsap.to(image, {
                    x: 0,
                    y: 0,
                    scale: 1.01,
                    duration: 0.9,
                    ease: "power3.out",
                    overwrite: true
                });

                if (arrow) {

                    gsap.to(arrow, {
                        x: 0,
                        y: 0,
                        duration: 0.6,
                        ease: "power3.out",
                        overwrite: true
                    });

                }

            });

        });
    }


    const stagesSection =
        document.querySelector(".stages-section");

    if (stagesSection) {

        const eyebrow =
            stagesSection.querySelector(".stages-eyebrow");

        const title =
            stagesSection.querySelector(".stages-title");

        const intro =
            stagesSection.querySelector(".stages-intro");

        const divider =
            stagesSection.querySelector(".stages-divider");

        const rows =
            stagesSection.querySelectorAll(".stage-row");


        gsap.set(
            [
                eyebrow,
                title,
                intro,
                divider,
                ...rows
            ].filter(Boolean),
            {
                opacity: 0,
                y: 30
            }
        );


        const stagesObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const tl = gsap.timeline();

                        if (eyebrow) {

                            tl.to(eyebrow, {
                                opacity: 1,
                                y: 0,
                                duration: 0.5,
                                ease: "power3.out"
                            });
                        }

                        if (title) {

                            tl.to(
                                title,
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.75,
                                    ease: "power3.out"
                                },
                                "-=0.3"
                            );
                        }

                        if (intro) {

                            tl.to(
                                intro,
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.65,
                                    ease: "power3.out"
                                },
                                "-=0.45"
                            );
                        }

                        if (divider) {

                            tl.to(
                                divider,
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.4,
                                    ease: "power2.out"
                                },
                                "-=0.3"
                            );
                        }

                        if (rows.length) {

                            tl.to(
                                rows,
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.7,
                                    stagger: 0.13,
                                    ease: "power3.out"
                                },
                                "-=0.15"
                            );
                        }

                        stagesObserver.unobserve(
                            stagesSection
                        );
                    });

                },
                {
                    threshold: 0.15
                }
            );

        stagesObserver.observe(
            stagesSection
        );


        rows.forEach(row => {

            const number =
                row.querySelector(".stage-number");

            const name =
                row.querySelector(".stage-name");


            row.addEventListener("mouseenter", () => {

                if (number) {

                    gsap.to(number, {
                        color: "#ff3b19",
                        scale: 1.08,
                        duration: 0.25,
                        ease: "power2.out"
                    });
                }

                if (name) {

                    gsap.to(name, {
                        color: "#ff3b19",
                        x: 5,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }

            });


            row.addEventListener("mouseleave", () => {

                if (number) {

                    gsap.to(number, {
                        color: "#e63b19",
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }

                if (name) {

                    gsap.to(name, {
                        color: "#eeeeee",
                        x: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }

            });

        });

    }

});

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") {
        return;
    }

    const section = document.querySelector(".about-stackly-section");

    if (!section) {
        return;
    }

    const eyebrow = section.querySelector(".about-stackly-eyebrow");
    const title = section.querySelector(".about-stackly-title");
    const rightContent = section.querySelector(".about-stackly-right");
    const stats = section.querySelectorAll(".about-stat");
    const link = section.querySelector(".about-stackly-link");

    gsap.set(
        [eyebrow, title, rightContent, ...stats, link].filter(Boolean),
        {
            opacity: 0,
            y: 35
        }
    );

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const tl = gsap.timeline();

                tl.to(eyebrow, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out"
                });

                tl.to(
                    title,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        ease: "power3.out"
                    },
                    "-=0.25"
                );

                tl.to(
                    stats,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.65,
                        stagger: 0.1,
                        ease: "power3.out"
                    },
                    "-=0.5"
                );

                tl.to(
                    rightContent,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out"
                    },
                    "-=0.55"
                );

                tl.to(
                    link,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power3.out"
                    },
                    "-=0.35"
                );

                observer.unobserve(section);
            });

        },
        {
            threshold: 0.2
        }
    );

    observer.observe(section);


    const counters = section.querySelectorAll(".about-stat-number");

    counters.forEach(counter => {

        const target = parseFloat(counter.dataset.target);
        const decimal = parseInt(
            counter.dataset.decimal || "0",
            10
        );

        const suffix = counter.dataset.suffix || "";

        const counterObject = {
            value: 0
        };

        gsap.to(counterObject, {
            value: target,
            duration: 2,
            delay: 0.35,
            ease: "power2.out",
            paused: true,
            onUpdate: () => {

                counter.textContent =
                    counterObject.value.toFixed(decimal) + suffix;

            }
        });

    });


    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                counters.forEach(counter => {

                    const target = parseFloat(counter.dataset.target);
                    const decimal = parseInt(
                        counter.dataset.decimal || "0",
                        10
                    );

                    const suffix = counter.dataset.suffix || "";

                    const object = {
                        value: 0
                    };

                    gsap.to(object, {
                        value: target,
                        duration: 2,
                        ease: "power2.out",
                        onUpdate: () => {

                            counter.textContent =
                                object.value.toFixed(decimal) + suffix;

                        },
                        onComplete: () => {

                            counter.textContent =
                                target.toFixed(decimal) + suffix;

                        }
                    });

                });

                counterObserver.unobserve(section);
            });

        },
        {
            threshold: 0.25
        }
    );

    counterObserver.observe(section);


    stats.forEach(stat => {

        const number = stat.querySelector(".about-stat-number");

        stat.addEventListener("mouseenter", () => {

            gsap.to(number, {
                color: "#e63b19",
                scale: 1.04,
                duration: 0.3,
                ease: "power2.out"
            });

        });

        stat.addEventListener("mouseleave", () => {

            gsap.to(number, {
                color: "#eeeeee",
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    });

});

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") {
        return;
    }

    const section = document.querySelector(".services-section");

    if (!section) {
        return;
    }

    const eyebrow = section.querySelector(".services-eyebrow");
    const title = section.querySelector(".services-title");
    const intro = section.querySelector(".services-intro");
    const divider = section.querySelector(".services-divider");
    const cards = section.querySelectorAll(".service-card");

    gsap.set(
        [
            eyebrow,
            title,
            intro,
            divider,
            ...cards
        ].filter(Boolean),
        {
            opacity: 0,
            y: 40
        }
    );

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const tl = gsap.timeline();

                tl.to(eyebrow, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out"
                });

                tl.to(
                    title,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out"
                    },
                    "-=0.3"
                );

                tl.to(
                    intro,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.65,
                        ease: "power3.out"
                    },
                    "-=0.5"
                );

                tl.to(
                    divider,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out"
                    },
                    "-=0.3"
                );

                tl.to(
                    cards,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.75,
                        stagger: 0.12,
                        ease: "power3.out"
                    },
                    "-=0.1"
                );

                observer.unobserve(section);
            });

        },
        {
            threshold: 0.12
        }
    );

    observer.observe(section);


    cards.forEach(card => {

        const image = card.querySelector(".service-image");
        const heading = card.querySelector(".service-content h3");
        const description = card.querySelector(".service-content p");
        const label = card.querySelector(".service-label");

        card.addEventListener("mouseenter", () => {

            gsap.to(image, {
                scale: 1.1,
                duration: 0.8,
                ease: "power3.out",
                overwrite: true
            });

            gsap.to(label, {
                color: "#ff4a25",
                x: 3,
                duration: 0.25,
                ease: "power2.out"
            });

            gsap.to(heading, {
                color: "#ff4a25",
                x: 5,
                duration: 0.35,
                ease: "power2.out"
            });

            gsap.to(description, {
                x: 3,
                duration: 0.35,
                ease: "power2.out"
            });

        });

        card.addEventListener("mousemove", event => {

            if (window.innerWidth < 992) {
                return;
            }

            const rect = card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width - 0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height - 0.5;

            gsap.to(image, {
                x: x * -10,
                y: y * -7,
                scale: 1.1,
                duration: 0.7,
                ease: "power3.out",
                overwrite: true
            });

        });

        card.addEventListener("mouseleave", () => {

            gsap.to(image, {
                x: 0,
                y: 0,
                scale: 1.02,
                duration: 0.9,
                ease: "power3.out",
                overwrite: true
            });

            gsap.to(label, {
                color: "#e63b19",
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(heading, {
                color: "#eeeeee",
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(description, {
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    });

});

    document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") {
        return;
    }

    const section = document.querySelector(".stackly-testimonials-section");

    if (!section) {
        return;
    }

    const stage = section.querySelector("#testimonialStage");
    const track = section.querySelector("#testimonialTrack");
    const cards = Array.from(
        section.querySelectorAll(".stackly-testimonial-card")
    );

    const progressBar =
        section.querySelector("#testimonialProgressBar");

    const currentCounter =
        section.querySelector("#testimonialCurrent");

    if (!stage || !track || !cards.length) {
        return;
    }

    gsap.set(
        [
            section.querySelector(".stackly-testimonials-header"),
            section.querySelector(".stackly-testimonials-divider"),
            stage,
            section.querySelector(".stackly-testimonials-bottom")
        ].filter(Boolean),
        {
            opacity: 0,
            y: 35
        }
    );

    const intro = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true
        }
    });

    intro.to(
        section.querySelector(".stackly-testimonials-header"),
        {
            opacity: 1,
            y: 0,
            duration: .8,
            ease: "power3.out"
        }
    );

    intro.to(
        section.querySelector(".stackly-testimonials-divider"),
        {
            opacity: 1,
            y: 0,
            duration: .5,
            ease: "power2.out"
        },
        "-=.45"
    );

    intro.to(
        stage,
        {
            opacity: 1,
            y: 0,
            duration: .7,
            ease: "power3.out"
        },
        "-=.35"
    );

    intro.to(
        section.querySelector(".stackly-testimonials-bottom"),
        {
            opacity: 1,
            y: 0,
            duration: .5,
            ease: "power2.out"
        },
        "-=.4"
    );


    function setActiveCard(index) {

        index = Math.max(
            0,
            Math.min(index, cards.length - 1)
        );

        cards.forEach((card, cardIndex) => {

            if (cardIndex === index) {

                card.classList.add("is-active");

                if (window.innerWidth <= 991) {

                    gsap.set(card, {
                        scale: 1,
                        opacity: 1
                    });

                } else {

                    gsap.to(card, {
                        scale: 1,
                        opacity: 1,
                        duration: .35,
                        ease: "power2.out",
                        overwrite: true
                    });

                }

            } else {

                card.classList.remove("is-active");

                if (window.innerWidth <= 991) {

                    gsap.set(card, {
                        scale: 1,
                        opacity: 1
                    });

                } else {

                    gsap.to(card, {
                        scale: .94,
                        opacity: .5,
                        duration: .35,
                        ease: "power2.out",
                        overwrite: true
                    });

                }
            }

        });

        if (currentCounter) {

            currentCounter.textContent =
                String(index + 1).padStart(2, "0");

        }

        if (progressBar) {

            const value =
                ((index + 1) / cards.length) * 100;

            gsap.to(progressBar, {
                width: `${value}%`,
                duration: .35,
                ease: "power2.out"
            });

        }
    }


    if (typeof ScrollTrigger !== "undefined") {

        gsap.registerPlugin(ScrollTrigger);

        if (window.innerWidth > 991) {

            const getDistance = () => {

                return Math.max(
                    0,
                    track.scrollWidth - stage.clientWidth
                );

            };

            gsap.to(track, {

                x: () => -getDistance(),

                ease: "none",

                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => {
                        return `+=${getDistance() + window.innerHeight}`;
                    },
                    pin: true,
                    scrub: 1.2,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,

                    onUpdate: self => {

                        const progress =
                            self.progress;

                        const index =
                            Math.round(
                                progress *
                                (cards.length - 1)
                            );

                        setActiveCard(index);
                    }
                }

            });

        }

    } else {

        setActiveCard(0);

    }


    if (window.innerWidth <= 991) {

        let scrollTimer = null;

        stage.addEventListener(
            "scroll",
            () => {

                clearTimeout(scrollTimer);

                scrollTimer = setTimeout(() => {

                    const cardWidth =
                        cards[0].getBoundingClientRect().width;

                    const gap =
                        parseFloat(
                            getComputedStyle(track).gap
                        ) || 0;

                    const itemWidth =
                        cardWidth + gap;

                    const index =
                        Math.round(
                            stage.scrollLeft /
                            itemWidth
                        );

                    setActiveCard(index);

                }, 50);

            },
            {
                passive: true
            }
        );


        let dragging = false;
        let pointerStartX = 0;
        let startScrollLeft = 0;

        stage.addEventListener(
            "pointerdown",
            event => {

                if (
                    event.pointerType === "mouse" &&
                    event.button !== 0
                ) {
                    return;
                }

                dragging = true;

                pointerStartX =
                    event.clientX;

                startScrollLeft =
                    stage.scrollLeft;

                stage.setPointerCapture(
                    event.pointerId
                );

            }
        );


        stage.addEventListener(
            "pointermove",
            event => {

                if (!dragging) {
                    return;
                }

                const distance =
                    event.clientX -
                    pointerStartX;

                stage.scrollLeft =
                    startScrollLeft -
                    distance;

            }
        );


        const finishDrag = event => {

            if (!dragging) {
                return;
            }

            dragging = false;

            if (
                event.pointerId !== undefined &&
                stage.hasPointerCapture(event.pointerId)
            ) {

                stage.releasePointerCapture(
                    event.pointerId
                );

            }

            const cardWidth =
                cards[0].getBoundingClientRect().width;

            const gap =
                parseFloat(
                    getComputedStyle(track).gap
                ) || 0;

            const itemWidth =
                cardWidth + gap;

            let index =
                Math.round(
                    stage.scrollLeft /
                    itemWidth
                );

            index = Math.max(
                0,
                Math.min(
                    index,
                    cards.length - 1
                )
            );

            stage.scrollTo({
                left: index * itemWidth,
                behavior: "smooth"
            });

            setActiveCard(index);

        };


        stage.addEventListener(
            "pointerup",
            finishDrag
        );

        stage.addEventListener(
            "pointercancel",
            finishDrag
        );


        cards.forEach(card => {

            card.addEventListener(
                "click",
                event => {

                    const link =
                        event.target.closest(
                            ".stackly-testimonial-arrow"
                        );

                    if (!link) {
                        return;
                    }

                    event.stopPropagation();

                }
            );

        });

        setActiveCard(0);
    }


    cards.forEach(card => {

        const icon =
            card.querySelector(
                ".stackly-testimonial-top > i"
            );

        const arrow =
            card.querySelector(
                ".stackly-testimonial-arrow"
            );

        if (window.innerWidth > 991) {

            card.addEventListener(
                "mouseenter",
                () => {

                    gsap.to(card, {
                        y: -7,
                        duration: .35,
                        ease: "power2.out",
                        overwrite: true
                    });

                    if (icon) {

                        gsap.to(icon, {
                            color: "#e63b19",
                            rotation: -8,
                            duration: .3,
                            ease: "power2.out"
                        });

                    }

                    if (arrow) {

                        gsap.to(arrow, {
                            scale: 1.1,
                            duration: .3,
                            ease: "power2.out"
                        });

                    }

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(card, {
                        y: 0,
                        duration: .4,
                        ease: "power2.out",
                        overwrite: true
                    });

                    if (icon) {

                        gsap.to(icon, {
                            color: "#383838",
                            rotation: 0,
                            duration: .3,
                            ease: "power2.out"
                        });

                    }

                    if (arrow) {

                        gsap.to(arrow, {
                            scale: 1,
                            duration: .3,
                            ease: "power2.out"
                        });

                    }

                }
            );

        }

    });


    window.addEventListener(
        "resize",
        () => {

            if (
                typeof ScrollTrigger !== "undefined"
            ) {

                ScrollTrigger.refresh();

            }

        }
    );

});

    document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".journal-section");

    if (!section) {
        return;
    }

    const header = section.querySelector(".journal-header");
    const divider = section.querySelector(".journal-divider");
    const cards = section.querySelectorAll(".journal-card");
    const footer = section.querySelector(".journal-footer");

    const animateSection = () => {

        if (typeof gsap === "undefined") {
            return;
        }

        gsap.fromTo(
            header,
            {
                opacity: 0,
                y: 45
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            }
        );

        gsap.fromTo(
            divider,
            {
                opacity: 0,
                scaleX: 0
            },
            {
                opacity: 1,
                scaleX: 1,
                duration: 0.7,
                transformOrigin: "left center",
                ease: "power3.out"
            }
        );

        gsap.fromTo(
            cards,
            {
                opacity: 0,
                y: 45
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.75,
                stagger: 0.12,
                ease: "power3.out"
            }
        );

        gsap.fromTo(
            footer,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.55,
                ease: "power3.out"
            }
        );
    };


    if (typeof gsap !== "undefined") {

        gsap.set(
            [header, divider, ...cards, footer],
            {
                opacity: 0,
                y: 35
            }
        );

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        animateSection();

                        observer.unobserve(section);
                    });

                },
                {
                    threshold: 0.15
                }
            );

        observer.observe(section);

    } else {

        header.style.opacity = "1";
        divider.style.opacity = "1";

        cards.forEach(card => {
            card.style.opacity = "1";
        });

        footer.style.opacity = "1";
    }


    cards.forEach(card => {

        const number =
            card.querySelector(".journal-card-number");

        const read =
            card.querySelector(".journal-read");

        card.addEventListener("mouseenter", () => {

            if (typeof gsap === "undefined") {
                return;
            }

            gsap.to(number, {
                scale: 1.08,
                color: "#ff4a25",
                duration: 0.25,
                ease: "power2.out"
            });

            gsap.to(read, {
                x: 4,
                duration: 0.3,
                ease: "power2.out"
            });

        });

        card.addEventListener("mouseleave", () => {

            if (typeof gsap === "undefined") {
                return;
            }

            gsap.to(number, {
                scale: 1,
                color: "#e63b19",
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.to(read, {
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    });

});

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") {
        return;
    }

    const section = document.querySelector(".stackly-cta-v2");

    if (!section) {
        return;
    }

    const top = section.querySelector(".stackly-cta-v2-top");
    const line = section.querySelector(".stackly-cta-v2-line");
    const main = section.querySelector(".stackly-cta-v2-main");
    const smallText = section.querySelector(".stackly-cta-v2-small");
    const title = section.querySelector(".stackly-cta-v2-title");
    const button = section.querySelector(".stackly-cta-v2-button");
    const emailSection = section.querySelector(".stackly-cta-v2-email-section");
    const email = section.querySelector(".stackly-cta-v2-email");
    const bottom = section.querySelector(".stackly-cta-v2-bottom");

    gsap.set(
        [
            top,
            line,
            smallText,
            title,
            button,
            emailSection,
            email,
            bottom
        ].filter(Boolean),
        {
            opacity: 0,
            y: 35
        }
    );

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const tl = gsap.timeline();

                tl.to(top, {
                    opacity: 1,
                    y: 0,
                    duration: .5,
                    ease: "power3.out"
                });

                tl.to(
                    line,
                    {
                        opacity: 1,
                        y: 0,
                        scaleX: 1,
                        transformOrigin: "left center",
                        duration: .55,
                        ease: "power3.out"
                    },
                    "-=.25"
                );

                tl.to(
                    smallText,
                    {
                        opacity: 1,
                        y: 0,
                        duration: .5,
                        ease: "power3.out"
                    },
                    "-=.2"
                );

                tl.to(
                    title,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out"
                    },
                    "-=.3"
                );

                tl.to(
                    button,
                    {
                        opacity: 1,
                        y: 0,
                        duration: .55,
                        ease: "back.out(1.4)"
                    },
                    "-=.4"
                );

                tl.to(
                    emailSection,
                    {
                        opacity: 1,
                        y: 0,
                        duration: .65,
                        ease: "power3.out"
                    },
                    "-=.15"
                );

                tl.to(
                    email,
                    {
                        opacity: 1,
                        y: 0,
                        duration: .7,
                        ease: "power3.out"
                    },
                    "-=.35"
                );

                tl.to(
                    bottom,
                    {
                        opacity: 1,
                        y: 0,
                        duration: .45,
                        ease: "power2.out"
                    },
                    "-=.3"
                );

                observer.unobserve(section);
            });

        },
        {
            threshold: .15
        }
    );

    observer.observe(section);


    if (button) {

        button.addEventListener("mouseenter", () => {

            gsap.to(button, {
                scale: 1.02,
                y: -3,
                duration: .3,
                ease: "power2.out"
            });

        });

        button.addEventListener("mouseleave", () => {

            gsap.to(button, {
                scale: 1,
                y: 0,
                duration: .3,
                ease: "power2.out"
            });

        });
    }


    if (email) {

        email.addEventListener("mouseenter", () => {

            gsap.to(email, {
                x: 7,
                duration: .45,
                ease: "power3.out"
            });

        });

        email.addEventListener("mouseleave", () => {

            gsap.to(email, {
                x: 0,
                duration: .45,
                ease: "power3.out"
            });

        });
    }


    window.addEventListener("resize", () => {

        if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.refresh();
        }

    });

});


