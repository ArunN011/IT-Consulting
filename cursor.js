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

    let cursorVisible = false;

    document.addEventListener("mousemove", function (event) {

        mouseX = event.clientX;
        mouseY = event.clientY;

        if (!cursorVisible) {
            cursorVisible = true;

            cursorGlow.style.opacity = "1";
            cursorDot.style.opacity = "1";
        }
    });

    function animateCursor() {

        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;

        dotX += (mouseX - dotX) * 0.25;
        dotY += (mouseY - dotY) * 0.25;

        cursorGlow.style.transform =
            `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;

        cursorDot.style.transform =
            `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.addEventListener("mouseleave", function () {
        cursorGlow.style.opacity = "0";
        cursorDot.style.opacity = "0";
    });

    document.addEventListener("mouseenter", function () {
        cursorGlow.style.opacity = "1";
        cursorDot.style.opacity = "1";
    });

    document.querySelectorAll("a, button").forEach(function (element) {

        element.addEventListener("mouseenter", function () {
            cursorGlow.style.width = "280px";
            cursorGlow.style.height = "280px";
        });

        element.addEventListener("mouseleave", function () {
            cursorGlow.style.width = "220px";
            cursorGlow.style.height = "220px";
        });

    });
}