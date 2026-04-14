export function initTypewriter() {
    const logoName = document.querySelector('.logo-name');
    if (!logoName) return;

    const texts = ["Phomint", "Data Scientist", "Astronomy Enthusiast"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    const pauseTime = 5000;

    function typewriter() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            charIndex--;
            typeSpeed = 50;
        } else {
            charIndex++;
            typeSpeed = 100;
        }

        logoName.textContent = currentText.substring(0, charIndex);

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = pauseTime;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typewriter, typeSpeed);
    }

    // Start the action immediately
    typewriter();
}
