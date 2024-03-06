let canvas = document.querySelector('.myCanvas');
let ctx = canvas.getContext('2d');

const width = canvas.clientWidth;
const height = canvas.clientHeight;

export default class MatrixBezie {
    constructor(points) {
        this.points = points;
        this.length = points.length;
        this.dotPoints = [];
        this.matrix = 0;
    }

    getX(X) {
        return X + width / 2;
    }

    getY(Y) {
        return height - (Y + height / 2);
    }

    buildCurve() {
        this.matrix = this.generateMatrix(this.length - 1);
        for (let t = 0; t <= 1; t += 0.0001) {
            const point = this.multiplyPoints(
                this.multiplyMatrix(
                    this.generateTMatrix(this.length - 1, t),
                    this.matrix
                ),
                this.points
            );
            this.buildDot(point);
        }
        return this;
    }

    generateTMatrix(n, t) {
        const tMatrix = [];
        for (let i = 0; i <= n; i++) {
            tMatrix[i] = [t ** (n - i)];
        }
        return tMatrix;
    }

    buildDot(point) {
        this.dotPoints.push(point);
        ctx.beginPath();
        ctx.arc(this.getX(point.x), this.getY(point.y), 3, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();
    }

    factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * this.factorial(n - 1);
        }
    }

    calculateElement(a, b) {
        return this.factorial(a) / (this.factorial(b) * this.factorial(a - b));
    }

    generateMatrix(n) {
        const matrix = [];
        for (let i = 0; i <= n; i++) {
            const row = new Array(n + 1).fill(0);
            matrix.push(row);
        }
        for (let i = 0; i <= n; i++) {
            for (let j = 0; j <= n - i; j++) {
                matrix[i][j] =
                    this.calculateElement(n, j) *
                    this.calculateElement(n - j, n - (i + j)) *
                    (-1) ** (n - (i + j));
            }
        }
        return matrix;
    }

    multiplyMatrix(tmatrix, matrix) {
        const size = tmatrix.length;
        const cols2 = matrix[0].length;

        if (size !== cols2) {
            return;
        }

        const resultMatrix = new Array(size).fill(0);
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                resultMatrix[i] += tmatrix[j] * matrix[j][i];
            }
        }
        return resultMatrix;
    }

    multiplyPoints(matrix, points) {
        let point = { x: 0, y: 0 };
        for (let i = 0; i < matrix.length; i++) {
            point.x += matrix[i] * points[i].x;
            point.y += matrix[i] * points[i].y;
        }
        return point;
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
        return this;
    }

    getDiagonals(rowNumber) {
        const result = {
            diagonal: 0,
            adiagonal: 0,
            row: [],
        };
        if (rowNumber > this.matrix.length - 1) return;
        for (let i = 0; i < this.matrix.length; ++i) {
            result.diagonal += this.matrix[i][i];
        }
        for (let i = 0; i < this.matrix.length; ++i) {
            result.adiagonal += this.matrix[i][this.matrix.length - 1 - i];
        }
        result.row = this.matrix[rowNumber];
        return result;
    }

    getPoints(countOfPoints, a, b) {
        const result = [];
        for (let i = 0; i < this.dotPoints.length; ++i) {
            if (this.dotPoints[i].x >= a && this.dotPoints[i].x <= b) {
                result.push([this.dotPoints[i].x, this.dotPoints[i].y]);
            }
        }
        return result.slice(0, countOfPoints);
    }
}
