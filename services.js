document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-services-hero");

    if (!section || typeof gsap === "undefined") {
        return;
    }

    const left =
        section.querySelector(".stackly-services-hero-left");

    const right =
        section.querySelector(".stackly-services-hero-right");

    const eyebrow =
        section.querySelector(".services-hero-eyebrow");

    const titleLines =
        section.querySelectorAll(".services-hero-title span");

    const description =
        section.querySelector(".services-hero-description");

    const actions =
        section.querySelector(".services-hero-actions");

    const panel =
        section.querySelector(".services-system-panel");

    const header =
        section.querySelector(".services-system-header");

    const visual =
        section.querySelector(".services-system-visual");

    const list =
        section.querySelectorAll(".services-system-item");

    const footer =
        section.querySelector(".services-system-footer");

    const bottom =
        section.querySelector(".services-hero-bottom");

    const orbits =
        section.querySelectorAll(".services-orbit");

    const core =
        section.querySelector(".services-system-core");

    const nodes =
        section.querySelectorAll(".services-system-node");


    gsap.set(eyebrow, {
        opacity: 0,
        y: 20
    });

    gsap.set(titleLines, {
        opacity: 0,
        y: 55
    });

    gsap.set(description, {
        opacity: 0,
        y: 22
    });

    gsap.set(actions, {
        opacity: 0,
        y: 20
    });

    gsap.set(right, {
        opacity: 0,
        x: 55
    });

    gsap.set(
        [header, visual, ...list, footer].filter(Boolean),
        {
            opacity: 0,
            y: 20
        }
    );

    gsap.set(core, {
        opacity: 0,
        scale: 0.7
    });

    gsap.set(orbits, {
        opacity: 0,
        scale: 0.7
    });

    gsap.set(nodes, {
        opacity: 0,
        scale: 0
    });

    gsap.set(bottom, {
        opacity: 0,
        y: 15
    });


    const tl = gsap.timeline();


    tl.to(eyebrow, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out"
    });


    tl.to(titleLines, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power4.out"
    }, "-=0.15");


    tl.to(description, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out"
    }, "-=0.4");


    tl.to(actions, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
    }, "-=0.35");


    tl.to(right, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power4.out"
    }, "-=0.7");


    tl.to(header, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out"
    }, "-=0.5");


    tl.to(orbits, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out"
    }, "-=0.25");


    tl.to(core, {
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: "back.out(1.5)"
    }, "-=0.45");


    tl.to(nodes, {
        opacity: 1,
        scale: 1,
        duration: 0.35,
        stagger: 0.08,
        ease: "back.out(2)"
    }, "-=0.3");


    tl.to(visual, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
    }, "-=0.35");


    tl.to(list, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out"
    }, "-=0.25");


    tl.to(footer, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out"
    }, "-=0.2");


    tl.to(bottom, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.15");


    gsap.to(orbits, {
        rotation: 360,
        duration: 28,
        repeat: -1,
        ease: "none"
    });


    gsap.to(core, {
        boxShadow: "0 0 70px rgba(230,59,25,0.22)",
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    nodes.forEach((node, index) => {

        gsap.to(node, {
            scale: 1.35,
            opacity: 0.45,
            duration: 1.1 + index * 0.12,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.12
        });

    });


    if (window.innerWidth > 991) {

        section.addEventListener("mousemove", event => {

            const rect =
                section.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width - 0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height - 0.5;


            gsap.to(panel, {
                x: x * 10,
                y: y * 7,
                duration: 0.8,
                ease: "power3.out",
                overwrite: true
            });


            gsap.to(core, {
                x: x * 6,
                y: y * 5,
                duration: 0.8,
                ease: "power3.out",
                overwrite: true
            });

        });


        section.addEventListener("mouseleave", () => {

            gsap.to(panel, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "power3.out"
            });

            gsap.to(core, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "power3.out"
            });

        });

    }


    const serviceItems =
        section.querySelectorAll(".services-system-item");


    serviceItems.forEach(item => {

        const icon =
            item.querySelector("i");

        if (!icon) {
            return;
        }

        item.addEventListener("mouseenter", () => {

            gsap.to(icon, {
                x: 3,
                y: -3,
                scale: 1.15,
                duration: 0.25,
                ease: "power2.out"
            });

        });

        item.addEventListener("mouseleave", () => {

            gsap.to(icon, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    });

});

document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-core-services-section");

    if (!section) {
        return;
    }

    const header =
        section.querySelector(".stackly-core-services-header");

    const workspace =
        section.querySelector(".stackly-services-workspace");

    const experience =
        section.querySelector(".stackly-client-experience");

    const footer =
        section.querySelector(".stackly-core-services-footer");

    const indexItems =
        Array.from(
            section.querySelectorAll(".service-index-item")
        );

    const panels =
        Array.from(
            section.querySelectorAll(".service-detail")
        );

    const activeNumber =
        section.querySelector("#serviceActiveNumber");


    function activateService(index) {

        if (!panels[index]) {
            return;
        }

        indexItems.forEach((item, itemIndex) => {

            item.classList.toggle(
                "active",
                itemIndex === index
            );

        });


        panels.forEach((panel, panelIndex) => {

            if (panelIndex === index) {

                panel.classList.add("active");

                if (typeof gsap !== "undefined") {

                    gsap.fromTo(
                        panel,
                        {
                            opacity: 0,
                            y: 18
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.45,
                            ease: "power3.out"
                        }
                    );

                }

            } else {

                panel.classList.remove("active");

            }

        });


        if (activeNumber) {

            activeNumber.textContent =
                String(index + 1).padStart(2, "0") +
                " / 06";

        }

    }


    indexItems.forEach((item, index) => {

        item.addEventListener("click", () => {

            activateService(index);

            if (window.innerWidth <= 991) {

                const details =
                    section.querySelector(
                        ".stackly-services-details"
                    );

                if (details) {

                    details.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    if (typeof gsap !== "undefined") {

        gsap.set(
            [
                header,
                workspace,
                experience,
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


        timeline.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out"
        });


        timeline.to(workspace, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.3");


        timeline.to(experience, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out"
        }, "-=0.25");


        timeline.to(footer, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.2");


        const firstPanel =
            panels[0];

        if (firstPanel) {

            gsap.fromTo(
                firstPanel,
                {
                    opacity: 0,
                    x: 20
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.7,
                    delay: 0.35,
                    ease: "power3.out"
                }
            );

        }


        indexItems.forEach((item, index) => {

            item.addEventListener("mouseenter", () => {

                gsap.to(item.querySelector("span"), {
                    x: 4,
                    duration: 0.25,
                    ease: "power2.out"
                });

            });


            item.addEventListener("mouseleave", () => {

                gsap.to(item.querySelector("span"), {
                    x: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });

        });


        const experienceItems =
            section.querySelectorAll(
                ".client-experience-item"
            );

        experienceItems.forEach(item => {

            const icon =
                item.querySelector(
                    ".client-experience-icon"
                );

            if (!icon) {
                return;
            }

            item.addEventListener("mouseenter", () => {

                gsap.to(icon, {
                    scale: 1.08,
                    rotation: -6,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });


            item.addEventListener("mouseleave", () => {

                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.35,
                    ease: "power2.out"
                });

            });

        });

    }


    activateService(0);

});
document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-engagement-section");

    if (!section) {
        return;
    }

    const header =
        section.querySelector(".stackly-engagement-header");

    const layout =
        section.querySelector(".stackly-engagement-layout");

    const comparison =
        section.querySelector(".stackly-engagement-comparison");

    const footer =
        section.querySelector(".stackly-engagement-footer");

    const selectorItems =
        Array.from(
            section.querySelectorAll(
                ".engagement-selector-item"
            )
        );

    const panels =
        Array.from(
            section.querySelectorAll(
                ".engagement-detail"
            )
        );

    const count =
        section.querySelector("#engagementCount");

    const comparisonScope =
        section.querySelector("#comparisonScope");

    const comparisonTime =
        section.querySelector("#comparisonTime");

    const comparisonTeam =
        section.querySelector("#comparisonTeam");

    const comparisonBest =
        section.querySelector("#comparisonBest");


    const comparisonData = [

        {
            scope: "FIXED",
            time: "SHORT",
            team: "STACKLY LED",
            best: "DELIVERABLE"
        },

        {
            scope: "EVOLVING",
            time: "LONG TERM",
            team: "SHARED",
            best: "CONTINUOUS WORK"
        },

        {
            scope: "FLEXIBLE",
            time: "ADAPTIVE",
            team: "CLIENT LED",
            best: "CAPABILITY GAP"
        }

    ];


    function activateEngagement(index) {

        if (!panels[index]) {
            return;
        }

        selectorItems.forEach((item, itemIndex) => {

            item.classList.toggle(
                "active",
                itemIndex === index
            );

        });


        panels.forEach((panel, panelIndex) => {

            if (panelIndex === index) {

                panel.classList.add("active");

                if (typeof gsap !== "undefined") {

                    gsap.fromTo(
                        panel,
                        {
                            opacity: 0,
                            y: 18
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.45,
                            ease: "power3.out"
                        }
                    );

                }

            } else {

                panel.classList.remove("active");

            }

        });


        if (count) {

            count.textContent =
                String(index + 1).padStart(2, "0") +
                " / 03";

        }


        const data =
            comparisonData[index];

        if (data) {

            if (comparisonScope) {
                comparisonScope.textContent =
                    data.scope;
            }

            if (comparisonTime) {
                comparisonTime.textContent =
                    data.time;
            }

            if (comparisonTeam) {
                comparisonTeam.textContent =
                    data.team;
            }

            if (comparisonBest) {
                comparisonBest.textContent =
                    data.best;
            }

        }

    }


    selectorItems.forEach((item, index) => {

        item.addEventListener("click", () => {

            activateEngagement(index);

            if (window.innerWidth <= 991) {

                const details =
                    section.querySelector(
                        ".stackly-engagement-details"
                    );

                if (details) {

                    details.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    if (typeof gsap !== "undefined") {

        gsap.set(
            [
                header,
                layout,
                comparison,
                footer
            ].filter(Boolean),
            {
                opacity: 0,
                y: 35
            }
        );


        const timeline = gsap.timeline({

            scrollTrigger:
                typeof ScrollTrigger !== "undefined"
                    ? {
                        trigger: section,
                        start: "top 80%",
                        once: true
                    }
                    : undefined

        });


        timeline.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out"
        });


        timeline.to(layout, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.3");


        timeline.to(comparison, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.25");


        timeline.to(footer, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.2");

    }


    activateEngagement(0);

});
document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-four-stages-section");

    if (!section) {
        return;
    }

    const header =
        section.querySelector(".stackly-four-stages-header");

    const progress =
        section.querySelector(".stackly-stage-progress");

    const workspace =
        section.querySelector(".stackly-stages-workspace");

    const principles =
        section.querySelectorAll(".stage-principle");

    const footer =
        section.querySelector(".stackly-four-stages-footer");

    const selectorItems =
        Array.from(
            section.querySelectorAll(".stage-selector-item")
        );

    const panels =
        Array.from(
            section.querySelectorAll(".stage-detail")
        );

    const progressBar =
        section.querySelector("#stageProgress");

    const progressLabels =
        Array.from(
            section.querySelectorAll(".stage-progress-labels span")
        );


    function activateStage(index) {

        if (!panels[index]) {
            return;
        }

        selectorItems.forEach((item, itemIndex) => {

            item.classList.toggle(
                "active",
                itemIndex === index
            );

        });


        panels.forEach((panel, panelIndex) => {

            if (panelIndex === index) {

                panel.classList.add("active");

                if (typeof gsap !== "undefined") {

                    gsap.fromTo(
                        panel,
                        {
                            opacity: 0,
                            y: 20
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.45,
                            ease: "power3.out"
                        }
                    );

                }

            } else {

                panel.classList.remove("active");

            }

        });


        progressLabels.forEach((label, labelIndex) => {

            label.classList.toggle(
                "active",
                labelIndex === index
            );

        });


        if (progressBar) {

            progressBar.style.width =
                ((index + 1) / panels.length * 100) + "%";

        }

    }


    selectorItems.forEach((item, index) => {

        item.addEventListener("click", () => {

            activateStage(index);

            if (window.innerWidth <= 991) {

                const details =
                    section.querySelector(
                        ".stackly-stage-details"
                    );

                if (details) {

                    details.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    if (typeof gsap !== "undefined") {

        gsap.set(
            [
                header,
                progress,
                workspace,
                ...principles,
                footer
            ].filter(Boolean),
            {
                opacity: 0,
                y: 35
            }
        );


        const tl = gsap.timeline({

            scrollTrigger:
                typeof ScrollTrigger !== "undefined"
                    ? {
                        trigger: section,
                        start: "top 80%",
                        once: true
                    }
                    : undefined

        });


        tl.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out"
        });


        tl.to(progress, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out"
        }, "-=0.3");


        tl.to(workspace, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.25");


        tl.to(principles, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
        }, "-=0.25");


        tl.to(footer, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.2");


        const firstPanel = panels[0];

        if (firstPanel) {

            gsap.fromTo(
                firstPanel,
                {
                    opacity: 0,
                    x: 18
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.65,
                    delay: 0.35,
                    ease: "power3.out"
                }
            );

        }


        selectorItems.forEach(item => {

            const icon =
                item.querySelector("i");

            item.addEventListener("mouseenter", () => {

                if (icon) {

                    gsap.to(icon, {
                        x: 4,
                        duration: 0.25,
                        ease: "power2.out"
                    });

                }

            });


            item.addEventListener("mouseleave", () => {

                if (icon) {

                    gsap.to(icon, {
                        x: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });

                }

            });

        });


        principles.forEach(card => {

            const icon =
                card.querySelector(".stage-principle-icon");

            if (!icon) {
                return;
            }

            card.addEventListener("mouseenter", () => {

                gsap.to(icon, {
                    scale: 1.08,
                    rotation: -6,
                    duration: 0.3,
                    ease: "power2.out"
                });

            });


            card.addEventListener("mouseleave", () => {

                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.35,
                    ease: "power2.out"
                });

            });

        });

    }


    activateStage(0);

});
document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-tech-section");

    if (!section || typeof gsap === "undefined") {
        return;
    }

    const header =
        section.querySelector(".stackly-tech-header");

    const overview =
        section.querySelector(".stackly-tech-overview");

    const categories =
        section.querySelectorAll(".stackly-tech-category");

    const footer =
        section.querySelector(".stackly-tech-footer");

    const items =
        section.querySelectorAll(".tech-item");


    gsap.set(
        [
            header,
            overview,
            ...categories,
            footer
        ].filter(Boolean),
        {
            opacity: 0,
            y: 35
        }
    );


    const tl = gsap.timeline({
        scrollTrigger:
            typeof ScrollTrigger !== "undefined"
                ? {
                    trigger: section,
                    start: "top 80%",
                    once: true
                }
                : undefined
    });


    tl.to(header, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out"
    });


    tl.to(overview, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
    }, "-=0.3");


    tl.to(categories, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out"
    }, "-=0.25");


    tl.to(footer, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.2");


    items.forEach(item => {

        const icon =
            item.querySelector(".tech-icon");

        const arrow =
            item.querySelector(".tech-arrow");


        item.addEventListener("mouseenter", () => {

            if (icon) {

                gsap.to(icon, {
                    scale: 1.08,
                    rotation: -6,
                    duration: 0.3,
                    ease: "power2.out"
                });

            }

            if (arrow) {

                gsap.to(arrow, {
                    x: 3,
                    y: -3,
                    duration: 0.25,
                    ease: "power2.out"
                });

            }

        });


        item.addEventListener("mouseleave", () => {

            if (icon) {

                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.35,
                    ease: "power2.out"
                });

            }

            if (arrow) {

                gsap.to(arrow, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });

            }

        });

    });

});
document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-packages-section");

    if (!section) {
        return;
    }

    const header =
        section.querySelector(".stackly-packages-header");

    const switcher =
        section.querySelector(".stackly-packages-switcher");

    const cards =
        section.querySelectorAll(".stackly-package-card");

    const trust =
        section.querySelector(".stackly-packages-trust");

    const calculator =
        section.querySelector(".stackly-packages-calculator");

    const footer =
        section.querySelector(".stackly-packages-footer");

    const toggleButtons =
        section.querySelectorAll(".package-toggle-btn");

    const priceElements =
        section.querySelectorAll(".package-price-value");

    const viewLabel =
        section.querySelector("#packageViewLabel");


    if (typeof gsap !== "undefined") {

        gsap.set(
            [
                header,
                switcher,
                ...cards,
                trust,
                calculator,
                footer
            ].filter(Boolean),
            {
                opacity: 0,
                y: 35
            }
        );

        const tl = gsap.timeline({

            scrollTrigger:
                typeof ScrollTrigger !== "undefined"
                    ? {
                        trigger: section,
                        start: "top 80%",
                        once: true
                    }
                    : undefined

        });

        tl.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out"
        });

        tl.to(switcher, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out"
        }, "-=0.3");

        tl.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out"
        }, "-=0.2");

        tl.to(trust, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.3");

        tl.to(calculator, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.25");

        tl.to(footer, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.2");

    }


    toggleButtons.forEach(button => {

        button.addEventListener("click", () => {

            const view =
                button.dataset.view;

            toggleButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");


            if (viewLabel) {

                viewLabel.textContent =
                    view === "project"
                        ? "PROJECT"
                        : "ONGOING";

            }


            priceElements.forEach(price => {

                const nextValue =
                    view === "project"
                        ? price.dataset.project
                        : price.dataset.ongoing;

                if (!nextValue) {
                    return;
                }

                if (typeof gsap !== "undefined") {

                    gsap.fromTo(
                        price,
                        {
                            opacity: 0,
                            y: 8
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.3,
                            ease: "power2.out"
                        }
                    );

                }

                setTimeout(() => {

                    price.textContent =
                        nextValue;

                }, 120);

            });

        });

    });


    const questions =
        section.querySelectorAll(".package-question");

    const recommendation =
        section.querySelector("#packageRecommendation");

    const recommendationText =
        section.querySelector("#packageRecommendationText");


    const recommendationData = {

        starter: {
            title: "STARTER",
            text:
                "Best suited for a focused deliverable with a clear scope and finish line."
        },

        growth: {
            title: "GROWTH",
            text:
                "Best suited for teams with continuous engineering, operations or product work."
        },

        enterprise: {
            title: "ENTERPRISE",
            text:
                "Best suited for larger systems, multiple teams, compliance and custom operational requirements."
        }

    };


    questions.forEach(question => {

        question.addEventListener("click", () => {

            const answer =
                question.dataset.answer;

            questions.forEach(item => {
                item.classList.remove("active");
            });

            question.classList.add("active");


            const data =
                recommendationData[answer];

            if (!data) {
                return;
            }


            if (typeof gsap !== "undefined") {

                gsap.to(
                    [recommendation, recommendationText],
                    {
                        opacity: 0,
                        y: 8,
                        duration: 0.15
                    }
                );

                setTimeout(() => {

                    recommendation.textContent =
                        data.title;

                    recommendationText.textContent =
                        data.text;

                    gsap.to(
                        [recommendation, recommendationText],
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.35,
                            stagger: 0.04,
                            ease: "power3.out"
                        }
                    );

                }, 160);

            } else {

                recommendation.textContent =
                    data.title;

                recommendationText.textContent =
                    data.text;

            }

        });

    });


    cards.forEach(card => {

        const button =
            card.querySelector(".package-button");

        const price =
            card.querySelector(".package-price-value");

        card.addEventListener("mouseenter", () => {

            if (typeof gsap !== "undefined") {

                if (price) {

                    gsap.to(price, {
                        x: 4,
                        duration: 0.25,
                        ease: "power2.out"
                    });

                }

                if (button) {

                    gsap.to(button, {
                        x: 3,
                        duration: 0.25,
                        ease: "power2.out"
                    });

                }

            }

        });


        card.addEventListener("mouseleave", () => {

            if (typeof gsap !== "undefined") {

                if (price) {

                    gsap.to(price, {
                        x: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });

                }

                if (button) {

                    gsap.to(button, {
                        x: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });

                }

            }

        });

    });

});
document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-faq-section");

    if (!section) {
        return;
    }

    const items =
        Array.from(
            section.querySelectorAll(".stackly-faq-item")
        );

    const questions =
        section.querySelectorAll(".stackly-faq-question");

    const filters =
        section.querySelectorAll(".faq-filter");

    const search =
        document.getElementById("faqSearch");

    const empty =
        document.getElementById("faqEmpty");

    const clearButton =
        document.getElementById("faqClear");


    function closeAll(exceptItem = null) {

        items.forEach(item => {

            if (item === exceptItem) {
                return;
            }

            item.classList.remove("active");

            const button =
                item.querySelector(".stackly-faq-question");

            if (button) {
                button.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    }


    questions.forEach(question => {

        question.addEventListener("click", () => {

            const item =
                question.closest(".stackly-faq-item");

            if (!item) {
                return;
            }

            const isActive =
                item.classList.contains("active");


            if (isActive) {

                item.classList.remove("active");

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                closeAll(item);

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                if (typeof gsap !== "undefined") {

                    gsap.fromTo(
                        item.querySelector(
                            ".stackly-faq-answer"
                        ),
                        {
                            opacity: 0.4
                        },
                        {
                            opacity: 1,
                            duration: 0.3,
                            ease: "power2.out"
                        }
                    );

                }

            }

        });

    });


    function filterFAQs() {

        const activeFilter =
            section.querySelector(
                ".faq-filter.active"
            );

        const filterValue =
            activeFilter
                ? activeFilter.dataset.filter
                : "all";

        const searchValue =
            search
                ? search.value.trim().toLowerCase()
                : "";

        let visibleCount = 0;


        items.forEach(item => {

            const category =
                item.dataset.category || "";

            const questionText =
                (
                    item.querySelector(
                        ".faq-question-text"
                    )?.textContent || ""
                ).toLowerCase();

            const answerText =
                (
                    item.querySelector(
                        ".stackly-faq-answer"
                    )?.textContent || ""
                ).toLowerCase();


            const categoryMatch =
                filterValue === "all" ||
                category === filterValue;

            const searchMatch =
                !searchValue ||
                questionText.includes(searchValue) ||
                answerText.includes(searchValue);


            if (categoryMatch && searchMatch) {

                item.style.display = "";

                visibleCount++;

            } else {

                item.style.display = "none";
                item.classList.remove("active");

            }

        });


        if (empty) {

            empty.classList.toggle(
                "visible",
                visibleCount === 0
            );

        }

    }


    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            filters.forEach(item => {
                item.classList.remove("active");
            });

            filter.classList.add("active");

            filterFAQs();

        });

    });


    if (search) {

        search.addEventListener(
            "input",
            filterFAQs
        );

    }


    if (clearButton) {

        clearButton.addEventListener("click", () => {

            if (search) {
                search.value = "";
            }

            filters.forEach(filter => {
                filter.classList.remove("active");
            });

            const allFilter =
                section.querySelector(
                    '.faq-filter[data-filter="all"]'
                );

            if (allFilter) {
                allFilter.classList.add("active");
            }

            filterFAQs();

        });

    }


    if (typeof gsap !== "undefined") {

        const header =
            section.querySelector(".stackly-faq-header");

        const toolbar =
            section.querySelector(".stackly-faq-toolbar");

        const workspace =
            section.querySelector(".stackly-faq-workspace");

        const footer =
            section.querySelector(".stackly-faq-footer");


        gsap.set(
            [
                header,
                toolbar,
                workspace,
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


        timeline.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out"
        });


        timeline.to(toolbar, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out"
        }, "-=0.3");


        timeline.to(workspace, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out"
        }, "-=0.25");


        timeline.to(footer, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.2");


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
                stagger: 0.08,
                delay: 0.35,
                ease: "power3.out"
            }
        );

    }


    const firstItem =
        items[0];

    if (firstItem) {

        firstItem.classList.add("active");

        const firstButton =
            firstItem.querySelector(
                ".stackly-faq-question"
            );

        if (firstButton) {
            firstButton.setAttribute(
                "aria-expanded",
                "true"
            );
        }

    }


    filterFAQs();

});
document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-services-cta");

    if (!section) {
        return;
    }

    const top =
        section.querySelector(".services-cta-top");

    const main =
        section.querySelector(".services-cta-main");

    const newsletter =
        section.querySelector(".services-cta-newsletter");

    const bottom =
        section.querySelector(".services-cta-bottom");

    const contactCard =
        section.querySelector(".services-cta-contact-card");

    const statusIcon =
        section.querySelector(".services-cta-status-icon");

    const form =
        document.getElementById("servicesNewsletterForm");

    const email =
        document.getElementById("servicesNewsletterEmail");

    const message =
        document.getElementById("servicesNewsletterMessage");


    if (typeof gsap !== "undefined") {

        gsap.set(
            [top, main, newsletter, bottom].filter(Boolean),
            {
                opacity: 0,
                y: 35
            }
        );

        const tl = gsap.timeline({

            scrollTrigger:
                typeof ScrollTrigger !== "undefined"
                    ? {
                        trigger: section,
                        start: "top 80%",
                        once: true
                    }
                    : undefined

        });

        tl.to(top, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out"
        });

        tl.to(main, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out"
        }, "-=0.2");

        tl.to(newsletter, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out"
        }, "-=0.35");

        tl.to(bottom, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.2");


        if (contactCard && statusIcon) {

            contactCard.addEventListener("mousemove", event => {

                if (window.innerWidth < 992) {
                    return;
                }

                const rect =
                    contactCard.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height - 0.5;

                gsap.to(statusIcon, {
                    x: x * 8,
                    y: y * 6,
                    duration: 0.5,
                    ease: "power3.out",
                    overwrite: true
                });

            });

            contactCard.addEventListener("mouseleave", () => {

                gsap.to(statusIcon, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out"
                });

            });

        }

    }


    if (form && email && message) {

        form.addEventListener("submit", event => {

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
                window.location.pathname;

            const currentScroll =
                Math.round(window.scrollY);


            sessionStorage.setItem(
                "stacklyReturnUrl",

                currentPage +
                "?restoreScroll=" +
                currentScroll +
                "#services-cta"
            );


            window.location.href =
                "error.html?returnPage=" +
                encodeURIComponent(currentPage) +
                "&restoreScroll=" +
                encodeURIComponent(currentScroll) +
                "&returnHash=" +
                encodeURIComponent("services-cta");

        });

    }

});