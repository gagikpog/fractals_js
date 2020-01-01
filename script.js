function Pos(x, y) {
    return {
        x, y,
        getLength() {
            return Math.sqrt(sqr(this.x) + sqr(this.y));
        }
    };
}

function sqr(x) {
    return x*x;
}
let angle = 320 * Math.PI / 180;

let canvas = null;
let ctx = null;
document.addEventListener("DOMContentLoaded", function() {
    canvas = document.getElementById("draw");
    ctx = canvas.getContext("2d");

    drawFractal(700);
});

function tg(start, end, n = 0) {
    
    const L = Math.sqrt(sqr(start.x - end.x) + sqr(start.y - end.y));
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

function drawFractal(length) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const _angle = +(document.querySelector('#angle').value || 60);
    angle = _angle * Math.PI / 180;
    const h = Math.sqrt(3 * sqr(length)/4);
    const A = Pos(centerX - length / 2, centerY + h / 3);
    const B = Pos(centerX + length / 2, centerY + h / 3);
    const C = Pos(centerX, centerY - h * 2 / 3);
    const n = +(document.querySelector('#deep').value || 5);
    tg(A, B, n);
    tg(C, A, n);
    tg(B, C, n);
}

function show() {
    const length = +(document.querySelector('#size').value || 700);
    drawFractal(length);
}