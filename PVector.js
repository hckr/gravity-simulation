// based on PVector from https://github.com/processing/p5.js

export class PVector {
    constructor(x = 0, y = 0, z = 0) {
        if (x instanceof PVector) {
            return new PVector(x.x, x.y, x.z);
        }
        this.x = x;
        this.y = y;
        this.z = z;
    }

    copy() {
        return new PVector(this.x, this.y, this.z);
    }

    add(x, y, z) {
        if (x instanceof PVector) {
            return this.add(x.x, x.y, x.z);
        }
        return new PVector(this.x + x, this.y + y, this.z + z);
    }

    sub(x, y, z) {
        if (x instanceof PVector) {
            return this.sub(x.x, x.y, x.z);
        }
        return new PVector(this.x - x, this.y - y, this.z - z);
    }

    mult(n) {
        return new PVector(this.x * n, this.y * n, this.z * n);
    }

    div(n) {
        return new PVector(this.x / n, this.y / n, this.z / n);
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalize() {
        return this.div(this.mag());
    }
}
