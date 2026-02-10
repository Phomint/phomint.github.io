export function drawGeminiStar(ctx, x, y, size, r, g, b, a) {
    ctx.beginPath();
    const s = size / 15;
    ctx.moveTo(x, y - 15 * s);
    ctx.quadraticCurveTo(x + 2 * s, y - 2 * s, x + 15 * s, y);
    ctx.quadraticCurveTo(x + 2 * s, y + 2 * s, x, y + 15 * s);
    ctx.quadraticCurveTo(x - 2 * s, y + 2 * s, x - 15 * s, y);
    ctx.quadraticCurveTo(x - 2 * s, y - 2 * s, x, y - 15 * s);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    ctx.fill();
}
