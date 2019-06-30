import { PVector } from './PVector.js'

const G = 2;

export class Planet {
    constructor(mass, position, velocity, color) {
        this.color = color;
        this.mass = mass;
        this.position = position;
        this.velocity = velocity;
        this.acceleration = new PVector();
        this.trails = [];
    }

    calculateForce(p) {
        this.r = this.position.sub(p.position).mag();
        let forceMag = -(G * this.mass * p.mass) / (this.r * this.r);
        this.force = this.position.sub(p.position).normalize().mult(forceMag);
    }

    applyForce() {
        this.velocity = this.velocity.add(this.force.div(this.mass));
        this.velocity.x = constrain(this.velocity.x, -1, 1);
        this.velocity.y = constrain(this.velocity.y, -1, 1);
        this.force = new PVector();
    }

    update() {
        this.position = this.position.add(this.velocity);
    }

    createTrace() {
        this.trails.push(new PVector(this.position));
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, (this.mass / 2) | 0, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    drawTrace(ctx) {
        ctx.save();
        ctx.strokeStyle = this.color;
        for (var p = 0; p < this.trails.length; p++) {
            ctx.strokeRect(this.trails[p].x, this.trails[p].y, 1, 1);
        }
        ctx.restore();
    }
}

const constrain = (n, l, h) => Math.max(Math.min(n, h), l);
