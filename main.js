import { Planet } from './Planet.js';
import { PVector } from './PVector.js';

const canvas = document.getElementById('gravity-canvas');
const ctx = canvas.getContext('2d');

const centerX = (canvas.width / 2) || 0;
const centerY = (canvas.height / 2) || 0;

const planets = [
    new Planet(25, new PVector(-100, -100), new PVector(-0.5, 0.5), 'rgb(245, 35, 129, 200)'),
    new Planet(25, new PVector(100, 100), new PVector(0.5, -0.5), 'rgb(40, 237, 70, 200)')
];

let updateCounter = 0;

const update = () => {
    updateCounter++;

    for (const p of planets) {
        for (const p2 of planets) {
            if (p !== p2) {
                p.calculateForce(p2);
                p.applyForce();
            }
        }
        p.update();
        if (updateCounter % 20 === 0) {
            p.createTrace();
        }
    }
}

setInterval(update, 25);

const draw = () => {
    ctx.save();

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.translate(centerX, centerY);

    for (const p of planets){
        p.draw(ctx);
    }

    for (const p of planets){
        p.drawTrace(ctx);
    }

    ctx.restore();
};

(function drawLoop() {
    draw();
    requestAnimationFrame(drawLoop);
})();
