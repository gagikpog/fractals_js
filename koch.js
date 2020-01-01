
function tg(start, end, n = 0) {

    const L = start.getDistance(end);
    const l = L / (2*(Math.cos(angle) + 1));
    const basicA = Pos((end.x - start.x) / L, (end.y - start.y) / L);

    const B = Pos(start.x + basicA.x * l, start.y + basicA.y * l);

    const I = L-l-l;
    const x1 = basicA.x * Math.cos(angle) - basicA.y * Math.sin(angle);
    const y1 = basicA.x * Math.sin(angle) + basicA.y * Math.cos(angle);
    const C = Pos(B.x + x1 * l,B.y + y1 * l);

    const D = Pos(end.x - basicA.x * l, end.y - basicA.y * l);

    if (!n) {
        ctx.beginPath();
        ctx.strokeStyle = '#fff';
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(B.x, B.y);
        ctx.lineTo(C.x, C.y);
        ctx.lineTo(D.x, D.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    } else {
        tg(start, B, n-1)
        tg(B, C, n-1)
        tg(C, D, n-1)
        tg(D, end, n-1)
    }
}

function drawKoch(config) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    setAngle(config.angle);
    const h = Math.sqrt(3 * sqr(config.length)/4);
    const A = Pos(centerX - config.length / 2, centerY + h / 3);
    const B = Pos(centerX + config.length / 2, centerY + h / 3);
    const C = Pos(centerX, centerY - h * 2 / 3);

    tg(A, B, config.deep);
    tg(C, A, config.deep);
    tg(B, C, config.deep);
}

function printKoch() {
    config = getConfig();
    drawKoch(config);
}