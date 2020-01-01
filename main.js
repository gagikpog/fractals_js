let angle = 320 * Math.PI / 180;
let canvas = null;
let ctx = null;
let currentTab = 'koch';

function Pos(x, y) {
    return {
        x, y,
        getLength() {
            return Math.sqrt(sqr(this.x) + sqr(this.y));
        },
        getDistance(pos) {
            return Math.sqrt(sqr(this.x - pos.x) + sqr(this.y - pos.y));
        },
        getBasic() {
            const L = this.getLength();
            return Pos(this.x / L, this.y / L);
        }
    };
}

function sqr(x) {
    return x * x;
}

function setAngle(_angle) {
    return angle = _angle * Math.PI / 180;
}

document.addEventListener("DOMContentLoaded", function() {
    canvas = document.getElementById("draw");
    ctx = canvas.getContext("2d");
    const config = getConfig()
    drawKoch(config);
});

function getConfig() {
    const deep = +(document.querySelector('#deep').value || 5);
    const angle = +(document.querySelector('#angle').value || 60);
    const length = +(document.querySelector('#size').value || 700);
    return {deep, angle, length};
}

function onPaint() {
    const angleRow = document.querySelector('.row-angle');
    switch (currentTab) {
        case 'koch':
                printKoch();
                angleRow && (angleRow.hidden = false);
            break;
        case 'carpet':
                printCarpet();
                angleRow && (angleRow.hidden = true);
            break;
        default:
            break;
    }
}

function changeTab(e) {
    tabs = document.querySelectorAll('.tab') || [];
    tabs.forEach(btn => {
        btn.classList.remove('active');
    });

    currentTab = e.id;
    e.classList.add('active')
    onPaint();
}