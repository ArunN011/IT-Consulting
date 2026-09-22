document.addEventListener("DOMContentLoaded", () => {

    const backButton = document.getElementById("backButton");

    if (typeof gsap !== "undefined") {

        gsap.from(".error-label", {
            opacity: 0,
            y: 25,
            duration: 0.8,
            ease: "power3.out"
        });

        gsap.from(".error-divider", {
            opacity: 0,
            scaleX: 0,
            duration: 0.7,
            delay: 0.15,
            ease: "power3.out"
        });

        gsap.from(".error-title", {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 0.2,
            ease: "power4.out"
        });

        gsap.from(".error-description", {
            opacity: 0,
            y: 25,
            duration: 0.8,
            delay: 0.4,
            ease: "power3.out"
        });

        gsap.from(".error-buttons", {
            opacity: 0,
            y: 25,
            duration: 0.8,
            delay: 0.55,
            ease: "power3.out"
        });

        gsap.from(".error-background-number", {
            opacity: 0,
            scale: 1.08,
            duration: 1.4,
            ease: "power3.out"
        });

        gsap.to(".error-background-number", {
            y: -12,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    if (backButton) {

        backButton.addEventListener("click", () => {

            const params =
                new URLSearchParams(window.location.search);

            const returnPage =
                params.get("returnPage");

            const restoreScroll =
                params.get("restoreScroll");

            if (returnPage) {

                let url = returnPage;

                if (
                    restoreScroll !== null &&
                    restoreScroll !== ""
                ) {
                    url += "?restoreScroll=" +
                        encodeURIComponent(restoreScroll);
                }

                window.location.href = url;

            } else {

                window.location.href = "index.html";

            }

        });
    }

});