document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".about-hero-section");

    if (!section) {
        return;
    }

    const label = section.querySelector(".about-hero-label");
    const titleLines = section.querySelectorAll(".about-hero-title span");
    const description = section.querySelector(".about-hero-description");

    const panel = section.querySelector(".about-signal-panel");
    const panelTop = section.querySelector(".about-signal-top");
    const visual = section.querySelector(".about-signal-visual");
    const copy = section.querySelector(".about-signal-copy");

    const stats = section.querySelectorAll(".about-signal-stat");
    const counters = section.querySelectorAll(".about-counter");

    const bottom = section.querySelector(".about-hero-bottom");

    const rings = section.querySelectorAll(".signal-ring");
    const core = section.querySelector(".signal-core");
    const nodes = section.querySelectorAll(".signal-node");

    counters.forEach(counter => {
        counter.textContent = "0";
    });

    if (typeof gsap === "undefined") {

        label.style.opacity = "1";

        titleLines.forEach(line => {
            line.style.opacity = "1";
            line.style.transform = "translateY(0)";
        });

        description.style.opacity = "1";
        panel.style.opacity = "1";
        panelTop.style.opacity = "1";
        visual.style.opacity = "1";
        copy.style.opacity = "1";
        bottom.style.opacity = "1";

        stats.forEach(stat => {
            stat.style.opacity = "1";
        });

        counters.forEach(counter => {
            const target = parseFloat(counter.dataset.target || "0");
            const decimals = parseInt(
                counter.dataset.decimals || "0",
                10
            );

            counter.textContent = target.toFixed(decimals);
        });

        return;
    }

    gsap.set(label, {
        opacity: 0,
        y: 20
    });

    gsap.set(titleLines, {
        opacity: 0,
        y: 50
    });

    gsap.set(description, {
        opacity: 0,
        y: 20
    });

    gsap.set(panel, {
        opacity: 0,
        x: 50
    });

    gsap.set(
        [panelTop, visual, copy, ...stats],
        {
            opacity: 0,
            y: 20
        }
    );

    gsap.set(core, {
        opacity: 0,
        scale: 0.75
    });

    gsap.set(rings, {
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


    tl.to(label, {
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
        duration: 0.6,
        ease: "power3.out"
    }, "-=0.4");


    tl.to(panel, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power4.out"
    }, "-=0.5");


    tl.to(panelTop, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out"
    }, "-=0.45");


    tl.to(rings, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out"
    }, "-=0.2");


    tl.to(core, {
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: "back.out(1.5)"
    }, "-=0.5");


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


    tl.to(copy, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
    }, "-=0.2");


    tl.to(stats, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=0.25");


    counters.forEach((counter, index) => {

        const target = parseFloat(
            counter.dataset.target || "0"
        );

        const decimals = parseInt(
            counter.dataset.decimals || "0",
            10
        );

        const counterValue = {
            value: 0
        };

        tl.to(
            counterValue,
            {
                value: target,
                duration: 1.8,
                ease: "power2.out",

                onUpdate: () => {

                    counter.textContent =
                        counterValue.value.toFixed(decimals);

                },

                onComplete: () => {

                    counter.textContent =
                        target.toFixed(decimals);

                }
            },
            index === 0 ? "-=0.15" : "-=1.5"
        );

    });


    tl.to(bottom, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.6");


    gsap.to(rings, {
        rotation: 360,
        duration: 28,
        repeat: -1,
        ease: "none"
    });


    gsap.to(core, {
        boxShadow: "0 0 60px rgba(230,59,25,0.22)",
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    nodes.forEach((node, index) => {

        gsap.to(node, {
            scale: 1.35,
            opacity: 0.55,
            duration: 1.2 + index * 0.15,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.15
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
                x: x * 12,
                y: y * 8,
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
                ease: "power3.out",
                overwrite: true
            });

        });

    }

});

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".about-history-section");

    if (!section || typeof gsap === "undefined") {
        return;
    }

    const label = section.querySelector(".about-history-label");
    const title = section.querySelector(".about-history-title");
    const intro = section.querySelector(".about-history-intro");
    const rows = section.querySelectorAll(".about-history-row");
    const bottom = section.querySelector(".about-history-bottom");

    gsap.set(
        [label, title, intro, ...rows, bottom].filter(Boolean),
        {
            opacity: 0,
            y: 35
        }
    );

    const timeline = gsap.timeline({
        scrollTrigger: typeof ScrollTrigger !== "undefined"
            ? {
                trigger: section,
                start: "top 80%",
                once: true
            }
            : undefined
    });

    timeline.to(label, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
    });

    timeline.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power4.out"
    }, "-=0.25");

    timeline.to(intro, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out"
    }, "-=0.4");

    timeline.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out"
    }, "-=0.25");

    timeline.to(bottom, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.3");

});

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".about-decisions-section");

    if (!section || typeof gsap === "undefined") {
        return;
    }

    const eyebrow = section.querySelector(".about-decisions-eyebrow");
    const title = section.querySelector(".about-decisions-title");
    const headerText = section.querySelector(".about-decisions-header-right");
    const intro = section.querySelector(".about-decisions-intro");
    const cards = section.querySelectorAll(".decision-card");
    const footer = section.querySelector(".about-decisions-footer");

    gsap.set(
        [eyebrow, title, headerText, intro, ...cards, footer].filter(Boolean),
        {
            opacity: 0,
            y: 35
        }
    );

    const tl = gsap.timeline({
        scrollTrigger: typeof ScrollTrigger !== "undefined"
            ? {
                trigger: section,
                start: "top 80%",
                once: true
            }
            : undefined
    });

    tl.to(eyebrow, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out"
    });

    tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power4.out"
    }, "-=0.25");

    tl.to(headerText, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out"
    }, "-=0.45");

    tl.to(intro, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
    }, "-=0.35");

    tl.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out"
    }, "-=0.25");

    tl.to(footer, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.2");


    cards.forEach((card, index) => {

        const icon = card.querySelector(".decision-card-icon");
        const number = card.querySelector(".decision-number");

        if (icon) {

            card.addEventListener("mouseenter", () => {

                gsap.to(icon, {
                    rotation: -6,
                    scale: 1.08,
                    duration: 0.3,
                    ease: "power2.out"
                });

                if (number) {
                    gsap.to(number, {
                        x: 4,
                        duration: 0.25,
                        ease: "power2.out"
                    });
                }

            });

            card.addEventListener("mouseleave", () => {

                gsap.to(icon, {
                    rotation: 0,
                    scale: 1,
                    duration: 0.35,
                    ease: "power2.out"
                });

                if (number) {
                    gsap.to(number, {
                        x: 0,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }

            });

        }

    });

});

document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-leadership-section");

    if (!section || typeof gsap === "undefined") {
        return;
    }

    const header =
        section.querySelector(".stackly-leadership-header");

    const cards =
        section.querySelectorAll(".stackly-leader-card");

    const stats =
        section.querySelectorAll(".stackly-leadership-stat");

    const bottom =
        section.querySelector(".stackly-leadership-bottom");

    const counters =
        section.querySelectorAll(".leadership-counter");


    gsap.set(
        [header, ...cards, ...stats, bottom].filter(Boolean),
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


    tl.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out"
    }, "-=0.35");


    tl.to(stats, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=0.3");


    tl.to(bottom, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out"
    }, "-=0.25");


    counters.forEach((counter, index) => {

        const target =
            parseFloat(counter.dataset.target || "0");

        const decimals =
            parseInt(
                counter.dataset.decimals || "0",
                10
            );

        const value = {
            number: 0
        };

        gsap.to(value, {

            number: target,

            duration: 2.2,

            delay: 0.9 + index * 0.12,

            ease: "power2.out",

            onUpdate: () => {

                counter.textContent =
                    value.number.toFixed(decimals);

            },

            onComplete: () => {

                counter.textContent =
                    target.toFixed(decimals);

            }

        });

    });


    cards.forEach(card => {

        const image =
            card.querySelector(".stackly-leader-image");

        const socials =
            card.querySelectorAll(
                ".stackly-leader-socials a"
            );

        if (!image) {
            return;
        }


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

                x: x * -7,
                y: y * -5,

                scale: 1.075,

                duration: 0.65,

                ease: "power3.out",

                overwrite: true

            });

        });


        card.addEventListener("mouseleave", () => {

            gsap.to(image, {

                x: 0,
                y: 0,

                scale: 1.01,

                duration: 0.8,

                ease: "power3.out",

                overwrite: true

            });

        });


        socials.forEach((social, index) => {

            social.addEventListener("mouseenter", () => {

                gsap.to(social, {

                    scale: 1.12,

                    duration: 0.25,

                    ease: "power2.out"

                });

            });


            social.addEventListener("mouseleave", () => {

                gsap.to(social, {

                    scale: 1,

                    duration: 0.25,

                    ease: "power2.out"

                });

            });

        });

    });

});

document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-careers-section");

    if (!section || typeof gsap === "undefined") {
        return;
    }

    const header =
        section.querySelector(".stackly-careers-header");

    const statement =
        section.querySelector(".stackly-careers-statement");

    const roles =
        section.querySelectorAll(".stackly-role-card");

    const values =
        section.querySelectorAll(".stackly-careers-value");

    const stats =
        section.querySelectorAll(".stackly-career-stat");

    const bottom =
        section.querySelector(".stackly-careers-bottom");

    const counters =
        section.querySelectorAll(".careers-counter");


    gsap.set(
        [
            header,
            statement,
            ...roles,
            ...values,
            ...stats,
            bottom
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
        duration: 0.8,
        ease: "power3.out"
    });


    timeline.to(statement, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out"
    }, "-=0.35");


    timeline.to(roles, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out"
    }, "-=0.3");


    timeline.to(values, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=0.25");


    timeline.to(stats, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=0.25");


    timeline.to(bottom, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.2");


    counters.forEach((counter, index) => {

        const target =
            parseFloat(counter.dataset.target || "0");

        const value = {
            number: 0
        };

        gsap.to(value, {

            number: target,

            duration: 2,

            delay: 0.8 + index * 0.12,

            ease: "power2.out",

            onUpdate: () => {

                counter.textContent =
                    Math.round(value.number);

            },

            onComplete: () => {

                counter.textContent =
                    Math.round(target);

            }

        });

    });


    roles.forEach(role => {

        const arrow =
            role.querySelector(".stackly-role-arrow");

        const index =
            role.querySelector(".stackly-role-index");

        if (!arrow) {
            return;
        }


        role.addEventListener("mouseenter", () => {

            gsap.to(arrow, {
                scale: 1.1,
                x: 3,
                y: -3,
                duration: 0.3,
                ease: "power2.out"
            });

            if (index) {

                gsap.to(index, {
                    x: 4,
                    duration: 0.25,
                    ease: "power2.out"
                });

            }

        });


        role.addEventListener("mouseleave", () => {

            gsap.to(arrow, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });

            if (index) {

                gsap.to(index, {
                    x: 0,
                    duration: 0.25,
                    ease: "power2.out"
                });

            }

        });

    });


    values.forEach(valueCard => {

        const icon =
            valueCard.querySelector(".stackly-value-icon");

        if (!icon) {
            return;
        }

        valueCard.addEventListener("mouseenter", () => {

            gsap.to(icon, {
                rotation: -7,
                scale: 1.08,
                duration: 0.3,
                ease: "power2.out"
            });

        });

        valueCard.addEventListener("mouseleave", () => {

            gsap.to(icon, {
                rotation: 0,
                scale: 1,
                duration: 0.35,
                ease: "power2.out"
            });

        });

    });

});
document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-locations-section");

    if (!section || typeof gsap === "undefined") {
        return;
    }

    const header =
        section.querySelector(".stackly-locations-header");

    const primary =
        section.querySelector(".stackly-primary-location");

    const secondary =
        section.querySelectorAll(".stackly-location-item");

    const capabilities =
        section.querySelectorAll(".stackly-location-capability");

    const capabilityIntro =
        section.querySelector(".stackly-location-capability-intro");

    const footer =
        section.querySelector(".stackly-locations-footer");

    const orbits =
        section.querySelectorAll(".stackly-location-orbit");

    const signals =
        section.querySelectorAll(".stackly-location-signal");


    gsap.set(
        [
            header,
            primary,
            ...secondary,
            capabilityIntro,
            ...capabilities,
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
        duration: 0.8,
        ease: "power3.out"
    });


    timeline.to(primary, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.35");


    timeline.to(secondary, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out"
    }, "-=0.35");


    timeline.to(capabilityIntro, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out"
    }, "-=0.25");


    timeline.to(capabilities, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=0.3");


    timeline.to(footer, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out"
    }, "-=0.2");


    gsap.to(orbits, {
        rotation: 360,
        duration: 24,
        repeat: -1,
        ease: "none"
    });


    signals.forEach((signal, index) => {

        gsap.to(signal, {
            scale: 1.5,
            opacity: 0.4,
            duration: 1.1 + index * 0.15,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2
        });

    });


    const visual =
        section.querySelector(".stackly-location-visual");

    if (visual && window.innerWidth > 991) {

        visual.addEventListener("mousemove", event => {

            const rect =
                visual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width - 0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height - 0.5;


            gsap.to(orbits, {
                x: x * 10,
                y: y * 8,
                duration: 0.7,
                ease: "power3.out",
                overwrite: true
            });


            gsap.to(visual.querySelector(".stackly-location-pin"), {
                x: x * 7,
                y: y * 5,
                duration: 0.7,
                ease: "power3.out",
                overwrite: true
            });

        });


        visual.addEventListener("mouseleave", () => {

            gsap.to(orbits, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            });


            gsap.to(visual.querySelector(".stackly-location-pin"), {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            });

        });

    }

});

document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-optimize-section");

    if (!section || typeof gsap === "undefined") {
        return;
    }

    const header =
        section.querySelector(".stackly-optimize-header");

    const feature =
        section.querySelector(".stackly-optimize-feature");

    const cards =
        section.querySelectorAll(".stackly-optimize-card");

    const bottom =
        section.querySelector(".stackly-optimize-bottom");

    const orbit =
        section.querySelectorAll(".signal-orbit");

    const circle =
        section.querySelector(".signal-main-circle");

    const points =
        section.querySelectorAll(".signal-point");

    gsap.set(
        [header, feature, ...cards, bottom].filter(Boolean),
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

    tl.to(feature, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.3");

    tl.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=0.3");

    tl.to(bottom, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.2");


    gsap.to(orbit, {
        rotation: 360,
        duration: 26,
        repeat: -1,
        ease: "none"
    });


    gsap.to(circle, {
        boxShadow: "0 0 75px rgba(230,59,25,0.2)",
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    points.forEach((point, index) => {

        gsap.to(point, {
            scale: 1.4,
            opacity: 0.45,
            duration: 1.1 + index * 0.15,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2
        });

    });


    if (window.innerWidth > 991) {

        const signal =
            section.querySelector(".stackly-optimize-signal");

        signal.addEventListener("mousemove", event => {

            const rect =
                signal.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width - 0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height - 0.5;

            gsap.to(orbit, {
                x: x * 10,
                y: y * 8,
                duration: 0.7,
                ease: "power3.out",
                overwrite: true
            });

            gsap.to(circle, {
                x: x * 7,
                y: y * 5,
                duration: 0.7,
                ease: "power3.out",
                overwrite: true
            });

        });

        signal.addEventListener("mouseleave", () => {

            gsap.to(orbit, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            });

            gsap.to(circle, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            });

        });

    }

});
document.addEventListener("DOMContentLoaded", () => {

    const section =
        document.querySelector(".stackly-newsletter-section");

    if (!section) {
        return;
    }

    const top =
        section.querySelector(".stackly-newsletter-top");

    const heading =
        section.querySelector(".stackly-newsletter-heading");

    const formWrap =
        section.querySelector(".stackly-newsletter-form-wrap");

    const bottom =
        section.querySelector(".stackly-newsletter-bottom");

    const form =
        document.getElementById("newsletterForm");

    const email =
        document.getElementById("newsletterEmail");

    const message =
        document.getElementById("newsletterMessage");


    if (typeof gsap !== "undefined") {

        gsap.set(
            [top, heading, formWrap, bottom].filter(Boolean),
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

        tl.to(heading, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power4.out"
        }, "-=0.2");

        tl.to(formWrap, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out"
        }, "-=0.4");

        tl.to(bottom, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
        }, "-=0.2");
    }


    if (form && email) {

        form.addEventListener("submit", (event) => {

            event.preventDefault();

            const value =
                email.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!value) {

                if (message) {
                    message.textContent =
                        "Please enter your email address.";

                    message.style.color =
                        "#e63b19";
                }

                return;
            }


            if (!emailPattern.test(value)) {

                if (message) {
                    message.textContent =
                        "Please enter a valid email address.";

                    message.style.color =
                        "#e63b19";
                }

                return;
            }


            const currentPage =
                window.location.pathname;

            const currentScroll =
                Math.round(window.scrollY);


            const returnPage =
                currentPage;


            sessionStorage.setItem(
                "stacklyReturnUrl",
                returnPage +
                "?restoreScroll=" +
                currentScroll +
                "#newsletter"
            );


            window.location.href =
                "error.html?returnPage=" +
                encodeURIComponent(returnPage) +
                "&restoreScroll=" +
                encodeURIComponent(currentScroll) +
                "&returnHash=" +
                encodeURIComponent("newsletter");

        });

    }

});