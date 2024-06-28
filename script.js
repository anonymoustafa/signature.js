const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let points = [];

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    points.push({ x, y });
    drawPointsAndLines();
});

function drawPointsAndLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    if (points.length > 1) {
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            const midPointX = (points[i - 1].x + points[i].x) / 2;
            const midPointY = (points[i - 1].y + points[i].y) / 2;
            ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, midPointX, midPointY);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.stroke();
    }

    points.forEach((point) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}
