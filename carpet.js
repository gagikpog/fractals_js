function printCarpet() {
    const config = getConfig();
    drawCarpet(config);
}

function drawCarpet(config) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    setAngle(config.angle);

    const A = Pos(centerX - config.length / 2, centerY - config.length / 2);
    ctx.fillStyle = '#fff'
    dc(A, config.length, config.deep);
}

function dc(start, width, n = 0) {
    const w = width / 3;
    const r5 = Pos(start.x + w    , start.y + w);
    if (n) {
        const r1 = Pos(start.x        , start.y);
        const r2 = Pos(start.x + w    , start.y);
        const r3 = Pos(start.x + 2 * w, start.y);
        const r4 = Pos(start.x        , start.y + w);

        const r6 = Pos(start.x + 2 * w, start.y + w);
        const r7 = Pos(start.x        , start.y + 2 * w);
        const r8 = Pos(start.x + w    , start.y + 2 * w);
        const r9 = Pos(start.x + 2 * w, start.y + 2 * w);
        const nn = n - 1;
        dc(r1, w, nn);
        dc(r2, w, nn);
        dc(r3, w, nn);
        dc(r4, w, nn);
        dc(r6, w, nn);
        dc(r7, w, nn);
        dc(r8, w, nn);
        dc(r9, w, nn);
    }
    ctx.fillRect(r5.x, r5.y, w, w);
}