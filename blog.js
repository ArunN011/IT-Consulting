(function () {

    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    const RETURN_KEY = "stacklyReturnState";

    function getCurrentPageUrl() {
        return window.location.pathname +
            window.location.search +
            window.location.hash;
    }

    function getActiveFilter() {
        const filter = document.querySelector(
            ".stackly-recent-posts-section .blog-filter-btn.active"
        );

        return filter
            ? filter.dataset.filter || "all"
            : "all";
    }

    function saveReturnState(link) {

        const card =
            link.closest(".recent-post-card");

        const section =
            link.closest("section[id]");

        const state = {
            url: getCurrentPageUrl(),

            scroll:
                Math.max(
                    0,
                    Math.round(window.scrollY)
                ),

            sectionId:
                section
                    ? section.id
                    : "",

            filter:
                getActiveFilter(),

            cardIndex:
                card
                    ? Array.from(
                        document.querySelectorAll(
                            ".stackly-recent-posts-section .recent-post-card"
                        )
                    ).indexOf(card)
                    : -1,

            cardTop:
                card
                    ? Math.round(
                        card.getBoundingClientRect().top
                    )
                    : null,

            time:
                Date.now()
        };

        sessionStorage.setItem(
            RETURN_KEY,
            JSON.stringify(state)
        );

        return state;
    }

    function addReturnParamsToErrorLink(link, state) {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }

        let targetUrl;

        try {

            targetUrl =
                new URL(
                    href,
                    window.location.href
                );

        } catch (error) {

            return;

        }

        if (
            !/\/error\.html$/i.test(
                targetUrl.pathname
            )
        ) {
            return;
        }

        targetUrl.searchParams.set(
            "_stacklyReturn",
            "1"
        );

        targetUrl.searchParams.set(
            "returnPage",
            state.url
        );

        targetUrl.searchParams.set(
            "restoreScroll",
            String(state.scroll)
        );

        targetUrl.searchParams.set(
            "returnSection",
            state.sectionId || ""
        );

        targetUrl.searchParams.set(
            "returnFilter",
            state.filter || "all"
        );

        if (state.cardIndex >= 0) {

            targetUrl.searchParams.set(
                "returnCard",
                String(state.cardIndex)
            );

        }

        link.setAttribute(
            "href",
            targetUrl.href
        );
    }

    document.addEventListener(
        "click",
        event => {

            const link =
                event.target.closest("a[href]");

            if (!link) {
                return;
            }

            if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            const href =
                link.getAttribute("href");

            if (!href) {
                return;
            }

            let targetUrl;

            try {

                targetUrl =
                    new URL(
                        href,
                        window.location.href
                    );

            } catch (error) {

                return;

            }

            const isErrorPage =
                /\/error\.html$/i.test(
                    targetUrl.pathname
                );

            if (!isErrorPage) {
                return;
            }

            const state =
                saveReturnState(link);

            addReturnParamsToErrorLink(
                link,
                state
            );

        },
        true
    );

    window.stacklySaveReturnState = function () {

        const section =
            document.elementFromPoint(
                window.innerWidth / 2,
                Math.min(
                    window.innerHeight / 2,
                    Math.max(
                        0,
                        window.innerHeight - 1
                    )
                )
            )?.closest("section[id]");

        const state = {
            url:
                getCurrentPageUrl(),

            scroll:
                Math.max(
                    0,
                    Math.round(window.scrollY)
                ),

            sectionId:
                section
                    ? section.id
                    : "",

            filter:
                getActiveFilter(),

            cardIndex:
                -1,

            cardTop:
                null,

            time:
                Date.now()
        };

        sessionStorage.setItem(
            RETURN_KEY,
            JSON.stringify(state)
        );

        return state;
    };

    const params =
        new URLSearchParams(
            window.location.search
        );

    const isReturnPage =
        params.get("_stacklyReturn") === "1";

    if (!isReturnPage) {
        return;
    }

    let savedState = null;

    try {

        savedState =
            JSON.parse(
                sessionStorage.getItem(
                    RETURN_KEY
                ) || "null"
            );

    } catch (error) {

        savedState = null;

    }

    const returnPage =
        params.get("returnPage");

    const returnScroll =
        params.get("restoreScroll");

    const returnSection =
        params.get("returnSection");

    const returnFilter =
        params.get("returnFilter");

    const returnCard =
        params.get("returnCard");

    if (!savedState) {

        savedState = {

            url:
                returnPage || "",

            scroll:
                Number(returnScroll),

            sectionId:
                returnSection || "",

            filter:
                returnFilter || "all",

            cardIndex:
                Number(returnCard),

            cardTop:
                null,

            time:
                Date.now()

        };

    } else {

        if (returnPage) {

            savedState.url =
                returnPage;

        }

        if (returnScroll !== null) {

            savedState.scroll =
                Number(returnScroll);

        }

        if (returnSection !== null) {

            savedState.sectionId =
                returnSection;

        }

        if (returnFilter !== null) {

            savedState.filter =
                returnFilter || "all";

        }

        if (returnCard !== null) {

            savedState.cardIndex =
                Number(returnCard);

        }

    }

    let restored = false;

    function restoreRecentFilter() {

        const section =
            document.querySelector(
                ".stackly-recent-posts-section"
            );

        if (!section) {
            return;
        }

        const filter =
            savedState.filter || "all";

        let button = null;

        try {

            button =
                section.querySelector(
                    `.blog-filter-btn[data-filter="${CSS.escape(filter)}"]`
                );

        } catch (error) {

            button =
                section.querySelector(
                    '.blog-filter-btn[data-filter="all"]'
                );

        }

        if (button) {

            const current =
                section.querySelector(
                    ".blog-filter-btn.active"
                );

            if (current !== button) {
                button.click();
            }

        } else {

            const allButton =
                section.querySelector(
                    '.blog-filter-btn[data-filter="all"]'
                );

            if (allButton) {

                const current =
                    section.querySelector(
                        ".blog-filter-btn.active"
                    );

                if (current !== allButton) {
                    allButton.click();
                }

            }

        }

    }

    function getScrollTarget() {

        let scrollPosition =
            Number(
                savedState.scroll
            );

        if (
            !Number.isFinite(
                scrollPosition
            ) ||
            scrollPosition < 0
        ) {

            scrollPosition = 0;

        }

        const cardIndex =
            Number(
                savedState.cardIndex
            );

        if (
            Number.isInteger(cardIndex) &&
            cardIndex >= 0
        ) {

            const cards =
                Array.from(
                    document.querySelectorAll(
                        ".stackly-recent-posts-section .recent-post-card"
                    )
                );

            const targetCard =
                cards[cardIndex];

            if (targetCard) {

                const style =
                    window.getComputedStyle(
                        targetCard
                    );

                const savedCardTop =
                    Number(
                        savedState.cardTop
                    );

                if (
                    style.display !== "none" &&
                    Number.isFinite(
                        savedCardTop
                    )
                ) {

                    return Math.max(
                        0,
                        Math.round(
                            targetCard.getBoundingClientRect().top +
                            window.scrollY -
                            savedCardTop
                        )
                    );

                }

            }

        }

        if (savedState.sectionId) {

            const section =
                document.getElementById(
                    savedState.sectionId
                );

            if (
                section &&
                scrollPosition === 0
            ) {

                return Math.max(
                    0,
                    Math.round(
                        section.getBoundingClientRect().top +
                        window.scrollY
                    )
                );

            }

        }

        return Math.max(
            0,
            Math.round(
                scrollPosition
            )
        );

    }

    function performRestore() {

        if (restored) {
            return true;
        }

        if (!document.body) {
            return false;
        }

        restoreRecentFilter();

        const target =
            getScrollTarget();

        window.scrollTo({
            top: target,
            left: 0,
            behavior: "auto"
        });

        restored = true;

        const cleanUrl =
            new URL(
                window.location.href
            );

        cleanUrl.searchParams.delete(
            "_stacklyReturn"
        );

        cleanUrl.searchParams.delete(
            "_stacklyScroll"
        );

        cleanUrl.searchParams.delete(
            "returnPage"
        );

        cleanUrl.searchParams.delete(
            "restoreScroll"
        );

        cleanUrl.searchParams.delete(
            "returnSection"
        );

        cleanUrl.searchParams.delete(
            "returnFilter"
        );

        cleanUrl.searchParams.delete(
            "returnCard"
        );

        history.replaceState(
            null,
            "",
            cleanUrl.pathname +
            cleanUrl.search +
            cleanUrl.hash
        );

        requestAnimationFrame(() => {

            window.scrollTo({
                top: target,
                left: 0,
                behavior: "auto"
            });

        });

        setTimeout(() => {

            window.scrollTo({
                top: target,
                left: 0,
                behavior: "auto"
            });

        }, 100);

        setTimeout(() => {

            window.scrollTo({
                top: target,
                left: 0,
                behavior: "auto"
            });

        }, 350);

        setTimeout(() => {

            window.scrollTo({
                top: target,
                left: 0,
                behavior: "auto"
            });

        }, 800);

        setTimeout(() => {

            sessionStorage.removeItem(
                RETURN_KEY
            );

        }, 1200);

        return true;
    }

    function waitForLoaderAndRestore() {

        const tryRestore =
            () => {

                const loader =
                    document.getElementById(
                        "pageLoader"
                    );

                if (
                    loader &&
                    !loader.classList.contains(
                        "loader-complete"
                    )
                ) {

                    return false;

                }

                return performRestore();

            };


        if (tryRestore()) {
            return;
        }


        const observer =
            new MutationObserver(
                () => {

                    if (tryRestore()) {
                        observer.disconnect();
                    }

                }
            );


        if (document.body) {

            observer.observe(
                document.body,
                {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: [
                        "class",
                        "style"
                    ]
                }
            );

        }


        const delays = [
            50,
            100,
            250,
            500,
            900,
            1400,
            2000,
            3000,
            4500
        ];


        delays.forEach(delay => {

            setTimeout(() => {

                if (tryRestore()) {
                    observer.disconnect();
                }

            }, delay);

        });


        setTimeout(() => {

            observer.disconnect();

            if (!restored) {
                performRestore();
            }

        }, 5000);

    }

    function startRestore() {

        const start =
            () => {

                restoreRecentFilter();

                waitForLoaderAndRestore();

            };


        if (
            document.readyState ===
            "loading"
        ) {

            document.addEventListener(
                "DOMContentLoaded",
                start,
                {
                    once: true
                }
            );

        } else {

            start();

        }


        window.addEventListener(
            "load",
            () => {

                if (!restored) {
                    waitForLoaderAndRestore();
                }

            },
            {
                once: true
            }
        );


        window.addEventListener(
            "pageshow",
            () => {

                if (!restored) {
                    waitForLoaderAndRestore();
                }

            },
            {
                once: true
            }
        );

    }

    startRestore();

})();


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const section =
            document.querySelector(
                ".stackly-blog-hero"
            );

        if (
            !section ||
            typeof gsap === "undefined"
        ) {
            return;
        }

        const left =
            section.querySelector(
                ".stackly-blog-hero-left"
            );

        const right =
            section.querySelector(
                ".stackly-blog-hero-right"
            );

        const eyebrow =
            section.querySelector(
                ".blog-hero-eyebrow"
            );

        const title =
            section.querySelector(
                ".blog-hero-title"
            );

        const description =
            section.querySelector(
                ".blog-hero-description"
            );

        const meta =
            section.querySelector(
                ".blog-hero-meta"
            );

        const scroll =
            section.querySelector(
                ".blog-hero-scroll"
            );

        const card =
            section.querySelector(
                ".blog-featured-card"
            );

        const image =
            section.querySelector(
                ".blog-featured-image"
            );

        const topicBar =
            section.querySelector(
                ".blog-hero-topic-bar"
            );

        const metaItems =
            section.querySelectorAll(
                ".blog-hero-meta div"
            );


        gsap.set(
            [
                eyebrow,
                title,
                description,
                meta,
                scroll,
                right,
                topicBar
            ].filter(Boolean),
            {
                opacity: 0,
                y: 35
            }
        );


        const tl =
            gsap.timeline();


        tl.to(
            eyebrow,
            {
                opacity: 1,
                y: 0,
                duration: .55,
                ease: "power3.out"
            }
        );


        tl.to(
            title,
            {
                opacity: 1,
                y: 0,
                duration: .85,
                ease: "power4.out"
            },
            "-=.2"
        );


        tl.to(
            description,
            {
                opacity: 1,
                y: 0,
                duration: .6,
                ease: "power3.out"
            },
            "-=.4"
        );


        tl.to(
            meta,
            {
                opacity: 1,
                y: 0,
                duration: .55,
                ease: "power3.out"
            },
            "-=.25"
        );


        tl.to(
            scroll,
            {
                opacity: 1,
                y: 0,
                duration: .5,
                ease: "power3.out"
            },
            "-=.2"
        );


        tl.to(
            right,
            {
                opacity: 1,
                y: 0,
                duration: .85,
                ease: "power3.out"
            },
            "-=.75"
        );


        tl.to(
            topicBar,
            {
                opacity: 1,
                y: 0,
                duration: .5,
                ease: "power2.out"
            },
            "-=.3"
        );


        gsap.fromTo(
            metaItems,
            {
                opacity: 0,
                y: 12
            },
            {
                opacity: 1,
                y: 0,
                duration: .45,
                stagger: .1,
                delay: 1,
                ease: "power3.out"
            }
        );


        if (
            card &&
            image &&
            window.innerWidth > 991
        ) {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width -
                        .5;

                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height -
                        .5;


                    gsap.to(
                        image,
                        {
                            x: x * -7,
                            y: y * -5,
                            scale: 1.07,
                            duration: .6,
                            ease: "power3.out",
                            overwrite: true
                        }
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(
                        image,
                        {
                            x: 0,
                            y: 0,
                            scale: 1.02,
                            duration: .8,
                            ease: "power3.out"
                        }
                    );

                }
            );

        }

    }
);


document.addEventListener(
    "DOMContentLoaded",
    () => {

        const section =
            document.querySelector(
                ".stackly-recent-posts-section"
            );

        if (!section) {
            return;
        }


        const buttons =
            Array.from(
                section.querySelectorAll(
                    ".blog-filter-btn"
                )
            );


        const cards =
            Array.from(
                section.querySelectorAll(
                    ".recent-post-card"
                )
            );


        const resultCount =
            document.getElementById(
                "blogFilterResultCount"
            );


        const empty =
            document.getElementById(
                "recentPostsEmpty"
            );


        const clearButton =
            document.getElementById(
                "recentPostsClear"
            );


        function updateCards(filter) {

            const visibleCards =
                cards.filter(
                    card => {

                        const category =
                            card.dataset.category ||
                            "";

                        return (
                            filter === "all" ||
                            category === filter
                        );

                    }
                );


            const hiddenCards =
                cards.filter(
                    card =>
                        !visibleCards.includes(card)
                );


            if (
                typeof gsap !== "undefined"
            ) {

                gsap.to(
                    cards,
                    {
                        opacity: 0,
                        y: 15,
                        duration: 0.2,
                        ease: "power2.out",
                        overwrite: true,
                        onComplete: () => {

                            hiddenCards.forEach(
                                card => {

                                    card.classList.add(
                                        "filter-hidden"
                                    );

                                    card.style.display =
                                        "none";

                                }
                            );


                            visibleCards.forEach(
                                card => {

                                    card.classList.remove(
                                        "filter-hidden"
                                    );

                                    card.style.display =
                                        "flex";

                                }
                            );


                            gsap.fromTo(
                                visibleCards,
                                {
                                    opacity: 0,
                                    y: 20
                                },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.45,
                                    stagger: 0.08,
                                    ease: "power3.out",
                                    clearProps: "transform"
                                }
                            );

                        }
                    }
                );

            } else {

                hiddenCards.forEach(
                    card => {

                        card.classList.add(
                            "filter-hidden"
                        );

                        card.style.display =
                            "none";

                    }
                );


                visibleCards.forEach(
                    card => {

                        card.classList.remove(
                            "filter-hidden"
                        );

                        card.style.display =
                            "flex";

                    }
                );

            }


            if (resultCount) {

                resultCount.textContent =
                    String(
                        visibleCards.length
                    ).padStart(
                        2,
                        "0"
                    );

            }


            if (empty) {

                empty.classList.toggle(
                    "visible",
                    visibleCards.length === 0
                );

            }

        }


        buttons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const filter =
                            button.dataset.filter ||
                            "all";


                        buttons.forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        updateCards(
                            filter
                        );

                    }
                );

            }
        );


        if (clearButton) {

            clearButton.addEventListener(
                "click",
                () => {

                    buttons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    const allButton =
                        section.querySelector(
                            '.blog-filter-btn[data-filter="all"]'
                        );


                    if (allButton) {

                        allButton.classList.add(
                            "active"
                        );

                    }


                    updateCards(
                        "all"
                    );

                }
            );

        }


        if (
            typeof gsap !== "undefined"
        ) {

            const header =
                section.querySelector(
                    ".recent-posts-header"
                );


            const filters =
                section.querySelector(
                    ".blog-filter-system"
                );


            const grid =
                section.querySelector(
                    ".recent-posts-grid"
                );


            const footer =
                section.querySelector(
                    ".recent-posts-footer"
                );


            gsap.set(
                [
                    header,
                    filters,
                    grid,
                    footer
                ].filter(Boolean),
                {
                    opacity: 0,
                    y: 35
                }
            );


            const timeline =
                gsap.timeline({

                    scrollTrigger:
                        typeof ScrollTrigger !==
                        "undefined"

                            ? {
                                trigger:
                                    section,

                                start:
                                    "top 80%",

                                once:
                                    true
                            }

                            : undefined

                });


            timeline.to(
                header,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.75,
                    ease: "power3.out"
                }
            );


            timeline.to(
                filters,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.55,
                    ease: "power3.out"
                },
                "-=0.3"
            );


            timeline.to(
                grid,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power3.out"
                },
                "-=0.25"
            );


            timeline.to(
                footer,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out"
                },
                "-=0.2"
            );


            const images =
                section.querySelectorAll(
                    ".recent-post-image"
                );


            images.forEach(
                image => {

                    image.addEventListener(
                        "mousemove",
                        event => {

                            if (
                                window.innerWidth <=
                                991
                            ) {
                                return;
                            }


                            const card =
                                image.closest(
                                    ".recent-post-card"
                                );


                            if (!card) {
                                return;
                            }


                            const rect =
                                card.getBoundingClientRect();


                            const x =
                                (
                                    event.clientX -
                                    rect.left
                                ) /
                                rect.width -
                                0.5;


                            const y =
                                (
                                    event.clientY -
                                    rect.top
                                ) /
                                rect.height -
                                0.5;


                            gsap.to(
                                image,
                                {
                                    x: x * -5,
                                    y: y * -4,
                                    scale: 1.07,
                                    duration: 0.5,
                                    ease: "power3.out",
                                    overwrite: true
                                }
                            );

                        }
                    );


                    image.addEventListener(
                        "mouseleave",
                        () => {

                            gsap.to(
                                image,
                                {
                                    x: 0,
                                    y: 0,
                                    scale: 1.02,
                                    duration: 0.7,
                                    ease: "power3.out"
                                }
                            );

                        }
                    );

                }
            );


            const cardsForHover =
                section.querySelectorAll(
                    ".recent-post-card"
                );


            cardsForHover.forEach(
                card => {

                    const arrow =
                        card.querySelector(
                            ".recent-post-link i"
                        );


                    card.addEventListener(
                        "mouseenter",
                        () => {

                            if (!arrow) {
                                return;
                            }


                            gsap.to(
                                arrow,
                                {
                                    x: 4,
                                    duration: 0.25,
                                    ease: "power2.out"
                                }
                            );

                        }
                    );


                    card.addEventListener(
                        "mouseleave",
                        () => {

                            if (!arrow) {
                                return;
                            }


                            gsap.to(
                                arrow,
                                {
                                    x: 0,
                                    duration: 0.3,
                                    ease: "power2.out"
                                }
                            );

                        }
                    );

                }
            );

        }


        let initialFilter =
            "all";


        try {

            const currentParams =
                new URLSearchParams(
                    window.location.search
                );


            if (
                currentParams.get(
                    "_stacklyReturn"
                ) === "1"
            ) {

                initialFilter =
                    currentParams.get(
                        "returnFilter"
                    ) || "all";

            }

        } catch (error) {

            initialFilter =
                "all";

        }


        let initialButton =
            null;


        try {

            initialButton =
                section.querySelector(
                    `.blog-filter-btn[data-filter="${CSS.escape(initialFilter)}"]`
                );

        } catch (error) {

            initialButton =
                section.querySelector(
                    '.blog-filter-btn[data-filter="all"]'
                );

        }


        if (initialButton) {

            buttons.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );

            initialButton.classList.add(
                "active"
            );

            updateCards(
                initialFilter
            );

        } else {

            updateCards(
                "all"
            );

        }

    }
);

document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-popular-section");

    if (!section) {
        return;
    }

    const items =
        Array.from(
            section.querySelectorAll(".popular-item")
        );

    const feature =
        section.querySelector(".popular-feature");

    const featureNumber =
        section.querySelector(".popular-feature-number");

    const featureLabel =
        section.querySelector(".popular-feature-label");

    const featureTitle =
        section.querySelector(".popular-feature h3");

    const featureDescription =
        section.querySelector(".popular-feature > p");

    const featureStack =
        section.querySelector(".popular-feature-stack");

    const featureStats =
        section.querySelector(".popular-feature-stats");


    const featureData = [

        {
            number: "01",
            label: "MOST READ NOTE",
            title:
                'MIGRATING A CORE <span>BANKING LEDGER.</span>',
            description:
                "A production migration without an outage window requires more than a cutover plan. This note covers system boundaries, validation steps and rollback thinking behind the approach.",
            tags: [
                "CLOUD",
                "DATABASE",
                "RELIABILITY"
            ],
            reads: "12.4K",
            minutes: "09",
            year: "2026"
        },

        {
            number: "02",
            label: "SECURITY PICK",
            title:
                'ZERO-TRUST: <span>WHAT ACTUALLY MATTERS.</span>',
            description:
                "A practical look at identity, segmentation, visibility and the security boundaries that create useful protection without unnecessary complexity.",
            tags: [
                "SECURITY",
                "IDENTITY",
                "NETWORK"
            ],
            reads: "9.8K",
            minutes: "07",
            year: "2026"
        },

        {
            number: "03",
            label: "RELIABILITY PICK",
            title:
                'BLAMELESS <span>POSTMORTEMS.</span>',
            description:
                "How incident reviews can create system-level learning, improve reliability and give teams better signals for the next production event.",
            tags: [
                "RELIABILITY",
                "INCIDENTS",
                "OPERATIONS"
            ],
            reads: "7.8K",
            minutes: "08",
            year: "2026"
        },

        {
            number: "04",
            label: "ENGINEERING PICK",
            title:
                'TERRAFORM MODULE <span>REVIEW CHECKLIST.</span>',
            description:
                "A practical checklist for reviewing infrastructure modules before production, from reuse and naming to dependencies and operational clarity.",
            tags: [
                "TERRAFORM",
                "INFRASTRUCTURE",
                "DEVOPS"
            ],
            reads: "6.2K",
            minutes: "05",
            year: "2026"
        }

    ];


    function updateFeature(index) {

        const data =
            featureData[index];

        if (!data) {
            return;
        }


        if (typeof gsap !== "undefined") {

            gsap.to(
                feature,
                {
                    opacity: 0,
                    y: 10,
                    duration: 0.18,
                    ease: "power2.out",
                    onComplete: () => {

                        renderFeature(data);

                        gsap.to(
                            feature,
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.35,
                                ease: "power3.out"
                            }
                        );

                    }
                }
            );

        } else {

            renderFeature(data);

        }

    }


    function renderFeature(data) {

        if (featureNumber) {
            featureNumber.textContent =
                data.number;
        }

        if (featureLabel) {
            featureLabel.textContent =
                data.label;
        }

        if (featureTitle) {
            featureTitle.innerHTML =
                data.title;
        }

        if (featureDescription) {
            featureDescription.textContent =
                data.description;
        }

        if (featureStack) {

            featureStack.innerHTML =
                data.tags
                    .map(tag =>
                        `<span>${tag}</span>`
                    )
                    .join("");

        }

        if (featureStats) {

            const stats =
                featureStats.querySelectorAll(
                    "div strong"
                );

            if (stats[0]) {
                stats[0].textContent =
                    data.reads;
            }

            if (stats[1]) {
                stats[1].textContent =
                    data.minutes;
            }

            if (stats[2]) {
                stats[2].textContent =
                    data.year;
            }

        }

    }


    items.forEach((item, index) => {

        item.addEventListener("mouseenter", () => {

            items.forEach(card => {
                card.classList.remove("active");
            });

            item.classList.add("active");

            updateFeature(index);

        });


        item.addEventListener("focusin", () => {

            items.forEach(card => {
                card.classList.remove("active");
            });

            item.classList.add("active");

            updateFeature(index);

        });

    });


    if (typeof gsap !== "undefined") {

        const header =
            section.querySelector(".popular-header");

        const content =
            section.querySelector(".popular-content");

        const insight =
            section.querySelector(".popular-insight-strip");

        const footer =
            section.querySelector(".popular-footer");


        gsap.set(
            [
                header,
                content,
                insight,
                footer
            ].filter(Boolean),
            {
                opacity: 0,
                y: 35
            }
        );


        const timeline =
            gsap.timeline({

                scrollTrigger:
                    typeof ScrollTrigger !== "undefined"
                        ? {
                            trigger: section,
                            start: "top 80%",
                            once: true
                        }
                        : undefined

            });


        timeline.to(
            header,
            {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power3.out"
            }
        );


        timeline.to(
            content,
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            },
            "-=0.25"
        );


        timeline.to(
            insight,
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out"
            },
            "-=0.3"
        );


        timeline.to(
            footer,
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            },
            "-=0.2"
        );


        gsap.fromTo(
            items,
            {
                opacity: 0,
                x: -15
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.09,
                delay: 0.3,
                ease: "power3.out"
            }
        );


        const bars =
            section.querySelectorAll(
                ".popular-reading-bar span"
            );


        bars.forEach((bar, index) => {

            gsap.fromTo(
                bar,
                {
                    width: "0%"
                },
                {
                    width:
                        bar.style.width || "50%",
                    duration: 1,
                    delay: 0.7 + index * 0.1,
                    ease: "power3.out"
                }
            );

        });


        const featureNumberElement =
            section.querySelector(
                ".popular-feature-number"
            );


        if (featureNumberElement) {

            gsap.to(
                featureNumberElement,
                {
                    y: -7,
                    duration: 2.8,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );

        }


        const insightItems =
            section.querySelectorAll(
                ".popular-insight-items > div"
            );


        insightItems.forEach(item => {

            const icon =
                item.querySelector("i");


            if (!icon) {
                return;
            }


            item.addEventListener(
                "mouseenter",
                () => {

                    gsap.to(
                        icon,
                        {
                            scale: 1.15,
                            rotation: -7,
                            duration: .3,
                            ease: "power2.out"
                        }
                    );

                }
            );


            item.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(
                        icon,
                        {
                            scale: 1,
                            rotation: 0,
                            duration: .35,
                            ease: "power2.out"
                        }
                    );

                }
            );

        });

    }


    items[0]?.classList.add("active");

    updateFeature(0);

});

document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-blog-topics-section");

    if (!section) {
        return;
    }

    const cards =
        section.querySelectorAll(".blog-topic-card");

    const explorer =
        section.querySelector(".blog-topics-explorer");

    const rings =
        section.querySelectorAll(".topic-signal-rings > span");

    const core =
        section.querySelector(".topic-signal-core");


    if (typeof gsap !== "undefined") {

        const header =
            section.querySelector(".blog-topics-header");

        const grid =
            section.querySelector(".blog-topics-grid");

        const footer =
            section.querySelector(".blog-topics-footer");


        gsap.set(
            [
                header,
                grid,
                explorer,
                footer
            ].filter(Boolean),
            {
                opacity: 0,
                y: 35
            }
        );


        const tl =
            gsap.timeline({

                scrollTrigger:
                    typeof ScrollTrigger !== "undefined"
                        ? {
                            trigger: section,
                            start: "top 80%",
                            once: true
                        }
                        : undefined

            });


        tl.to(
            header,
            {
                opacity: 1,
                y: 0,
                duration: .75,
                ease: "power3.out"
            }
        );


        tl.to(
            grid,
            {
                opacity: 1,
                y: 0,
                duration: .75,
                ease: "power3.out"
            },
            "-=.25"
        );


        tl.to(
            explorer,
            {
                opacity: 1,
                y: 0,
                duration: .65,
                ease: "power3.out"
            },
            "-=.3"
        );


        tl.to(
            footer,
            {
                opacity: 1,
                y: 0,
                duration: .5,
                ease: "power2.out"
            },
            "-=.2"
        );


        gsap.fromTo(
            cards,
            {
                opacity: 0,
                y: 18
            },
            {
                opacity: 1,
                y: 0,
                duration: .55,
                stagger: .08,
                delay: .45,
                ease: "power3.out"
            }
        );


        if (rings.length) {

            gsap.to(
                rings,
                {
                    rotation: 360,
                    duration: 24,
                    repeat: -1,
                    ease: "none"
                }
            );

        }


        if (core) {

            gsap.to(
                core,
                {
                    boxShadow:
                        "0 0 55px rgba(230,59,25,.22)",
                    duration: 1.8,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );

        }


        cards.forEach(card => {

            const icon =
                card.querySelector(
                    ".blog-topic-card-top > i"
                );

            const arrow =
                card.querySelector(
                    ".blog-topic-card-bottom i"
                );


            card.addEventListener(
                "mouseenter",
                () => {

                    if (icon) {

                        gsap.to(
                            icon,
                            {
                                scale: 1.08,
                                rotation: -7,
                                duration: .3,
                                ease: "power2.out"
                            }
                        );

                    }


                    if (arrow) {

                        gsap.to(
                            arrow,
                            {
                                x: 3,
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
                                duration: .35,
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

        });

    }

});
document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-blog-cta-section");

    if (!section) {
        return;
    }

    const top =
        section.querySelector(".blog-cta-top");

    const main =
        section.querySelector(".blog-cta-main");

    const lower =
        section.querySelector(".blog-cta-lower");

    const footer =
        section.querySelector(".blog-cta-footer");

    const signal =
        section.querySelectorAll(".blog-cta-signal > span");

    const core =
        section.querySelector(".blog-cta-signal > div");

    const form =
        document.getElementById("blogNewsletterForm");

    const email =
        document.getElementById("blogNewsletterEmail");

    const message =
        document.getElementById("blogNewsletterMessage");


    if (typeof gsap !== "undefined") {

        gsap.set(
            [
                top,
                main,
                lower,
                footer
            ].filter(Boolean),
            {
                opacity: 0,
                y: 35
            }
        );

        const tl =
            gsap.timeline({
                scrollTrigger:
                    typeof ScrollTrigger !== "undefined"
                        ? {
                            trigger: section,
                            start: "top 80%",
                            once: true
                        }
                        : undefined
            });

        tl.to(
            top,
            {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: "power3.out"
            }
        );

        tl.to(
            main,
            {
                opacity: 1,
                y: 0,
                duration: 0.85,
                ease: "power3.out"
            },
            "-=0.2"
        );

        tl.to(
            lower,
            {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power3.out"
            },
            "-=0.3"
        );

        tl.to(
            footer,
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            },
            "-=0.2"
        );


        if (signal.length) {

            gsap.to(
                signal,
                {
                    rotation: 360,
                    duration: 24,
                    repeat: -1,
                    ease: "none"
                }
            );

        }


        if (core) {

            gsap.to(
                core,
                {
                    boxShadow:
                        "0 0 45px rgba(230,59,25,0.25)",
                    duration: 1.7,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );

        }


        const topics =
            section.querySelectorAll(
                ".blog-cta-topic-list > div"
            );

        topics.forEach(topic => {

            const icon =
                topic.querySelector("i");

            if (!icon) {
                return;
            }

            topic.addEventListener(
                "mouseenter",
                () => {

                    gsap.to(
                        icon,
                        {
                            scale: 1.15,
                            rotation: -6,
                            duration: 0.3,
                            ease: "power2.out"
                        }
                    );

                }
            );

            topic.addEventListener(
                "mouseleave",
                () => {

                    gsap.to(
                        icon,
                        {
                            scale: 1,
                            rotation: 0,
                            duration: 0.35,
                            ease: "power2.out"
                        }
                    );

                }
            );

        });

    }


    if (
        !form ||
        !email ||
        !message
    ) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const value =
                email.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!value) {

                message.textContent =
                    "Please enter your email address.";

                message.style.color =
                    "#e63b19";

                return;

            }


            if (!emailPattern.test(value)) {

                message.textContent =
                    "Please enter a valid email address.";

                message.style.color =
                    "#e63b19";

                return;

            }


            const currentPage =
                window.location.pathname +
                window.location.search +
                window.location.hash;


            const currentScroll =
                Math.max(
                    0,
                    Math.round(
                        window.scrollY
                    )
                );


            const state = {

                url:
                    currentPage,

                scroll:
                    currentScroll,

                sectionId:
                    "blog-cta",

                filter:
                    "all",

                cardIndex:
                    -1,

                cardTop:
                    null,

                time:
                    Date.now()

            };


            sessionStorage.setItem(
                "stacklyReturnState",
                JSON.stringify(state)
            );


            const returnUrl =
                new URL(
                    "error.html",
                    window.location.href
                );


            returnUrl.searchParams.set(
                "_stacklyReturn",
                "1"
            );


            returnUrl.searchParams.set(
                "returnPage",
                currentPage
            );


            returnUrl.searchParams.set(
                "restoreScroll",
                String(currentScroll)
            );


            returnUrl.searchParams.set(
                "returnSection",
                "blog-cta"
            );


            returnUrl.searchParams.set(
                "returnFilter",
                "all"
            );


            message.textContent =
                "Redirecting...";


            message.style.color =
                "#777";


            window.location.href =
                returnUrl.href;

        }
    );

});

