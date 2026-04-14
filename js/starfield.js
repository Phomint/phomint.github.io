import { drawGeminiStar } from './utils.js';

export function initStarfield() {
    const canvas = document.getElementById('star-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let stars = [];
    const starCount = 150;
    let mouse = { x: -100, y: -100 };
    let isMouseDown = false;
    let holdStartTime = null;
    const RESET_DURATION = 30 * 1000; // 30 seconds in milliseconds

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Star {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1; // Bigger stars
            this.baseSize = this.size;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 20) + 1;
            this.alpha = 0.5; // Solid black stars
            this.r = 0;
            this.g = 0;
            this.b = 0;
            this.isConsumed = false;
        }

        draw() {
            if (this.isConsumed) return;
            drawGeminiStar(ctx, this.x, this.y, this.size * 2, this.r, this.g, this.b, this.alpha);
        }

        update() {
            if (this.isConsumed) return;
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let maxDistance = 150;

            if (isMouseDown) {
                // Black hole effect: attract to mouse
                if (distance > 10) {
                    let force = 100 / (distance + 1);
                    if (force > 5) force = 5;
                    this.x += (dx / distance) * force;
                    this.y += (dy / distance) * force;
                } else {
                    // Star is consumed by the black hole
                    this.isConsumed = true;
                }
                // Shine effect: transition to purple
                this.size = this.baseSize;
                this.r = 106;
                this.g = 27;
                this.b = 154;
                this.alpha = 1;
            } else {
                // Normal behavior: push away
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < maxDistance) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dxBase = this.x - this.baseX;
                        this.x -= dxBase / 20;
                    }
                    if (this.y !== this.baseY) {
                        let dyBase = this.y - this.baseY;
                        this.y -= dyBase / 20;
                    }
                }
                this.size = this.baseSize;
                this.r = 0;
                this.g = 0;
                this.b = 0;
                this.alpha = 0.5;
            }

            if (this.isConsumed) return;
            // Keep stars within bounds during resize
            if (this.baseX > canvas.width) this.init();
            if (this.baseY > canvas.height) this.init();
        }
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < stars.length; i++) {
            stars[i].update();
            stars[i].draw();
        }

        if (isMouseDown) {
            // Event Horizon
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 15, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // White core for light theme
            ctx.fill();
            ctx.strokeStyle = 'rgba(106, 27, 154, 0.5)'; // Purple border
            ctx.lineWidth = 2;
            ctx.stroke();

            // Outer glow for event horizon
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(106, 27, 154, 0.2)'; // Faint purple glow
            ctx.lineWidth = 4;
            ctx.stroke();

            if (holdStartTime) {
                const elapsed = Date.now() - holdStartTime;
                if (elapsed >= RESET_DURATION) {
                    canvas.classList.add('white-out');
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            }
        }

        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    window.addEventListener('mousedown', (event) => {
        if (event.button === 0) { // Left click
            isMouseDown = true;
            holdStartTime = Date.now();
        }
    });

    window.addEventListener('mouseup', () => {
        isMouseDown = false;
        holdStartTime = null;
    });

    window.addEventListener('mouseleave', () => {
        isMouseDown = false;
        holdStartTime = null;
    });

    initStars();
    animate();
}
