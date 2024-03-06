let canvas = document.querySelector('.myCanvas');
let ctx = canvas.getContext('2d');

const width = canvas.clientWidth;
const height = canvas.clientHeight;

export default class ParametricBezie {
    constructor(points) {
        this.points = points;
        this.length = points.length;
    }

    getX(X) {
        return +X + width / 2;
    }

    getY(Y) {
        return height - (+Y + height / 2);
    }

    calculateElement(a, b) {
        return this.factorial(a) / (this.factorial(b) * this.factorial(a - b));
    }

    factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * this.factorial(n - 1);
        }
    }

    multiplyElements(n, i, t, dot) {
        return {
            x:
                this.calculateElement(n, i) *
                t ** i *
                (1 - t) ** (n - i) *
                dot.x,
            y:
                this.calculateElement(n, i) *
                t ** i *
                (1 - t) ** (n - i) *
                dot.y,
        };
    }

    buildCurve() {
        const step = 1 / 10000;
        for (let t = 0; t <= 1; t += step) {
            let dot = { x: 0, y: 0 };
            for (let i = 0; i < this.length; ++i) {
                const { x, y } = this.multiplyElements(
                    this.length - 1,
                    i,
                    t,
                    this.points[i]
                );
                dot.x = +dot.x + x;
                dot.y = +dot.y + y;
            }
            this.buildDot(dot);
        }
        return this;
    }

    buildDot(dot) {
        ctx.beginPath();
        ctx.arc(this.getX(dot.x), this.getY(dot.y), 3, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
    }

    buildTangent() {
        ctx.beginPath();
        ctx.fillStyle = 'blue';
        ctx.strokeStyle = 'blue';
        let [point1, point2] = this.points;
        ctx.moveTo(this.getX(this.points[0].x), this.getY(this.points[0].y));
        ctx.lineTo(this.getX(this.points[1].x), this.getY(this.points[1].y));
        ctx.moveTo(
            this.getX(this.points[this.length - 1].x),
            this.getY(this.points[this.length - 1].y)
        );
        ctx.lineTo(
            this.getX(this.points[this.length - 2].x),
            this.getY(this.points[this.length - 2].y)
        );
        ctx.stroke();
        ctx.closePath();
    }
}
