import { buildCoordinates, build } from './buildCoordinates.js';
import MatrixBezie from './matrixBezie.js';
import ParametricBezie from './parametricBezie.js';

window.addEventListener('load', () => {
    build();
});

let dotsArray = [];
let subTaskArray = [];

function clearArray() {
    dotsArray = [];
    build();
}

export default clearArray;

let bezieClass;

document.querySelector('.start-btn').addEventListener('click', () => {
    dotsArray = [];
    buildCoordinates();
    const listItems = document.querySelectorAll('.dots-list li');

    listItems.forEach((item) => {
        const xInput = item.querySelector('.x');
        const yInput = item.querySelector('.y');

        const xValue = +xInput.value;
        const yValue = +yInput.value;

        dotsArray.push({ x: xValue, y: yValue });
    });
    if (document.querySelector('.checkbox-btn').checked) {
        console.log('parametric');
        new ParametricBezie(dotsArray).buildCurve().buildTangent();
    } else {
        console.log('matrix');
        bezieClass = new MatrixBezie(dotsArray).buildCurve().buildTangent();
    }
});

document.querySelector('.close-btn-1').addEventListener('click', () => {
    document.querySelector('.modal-window-1').style.display = 'none';
});

document.querySelector('.subtask-1').addEventListener('click', () => {
    document.querySelector('.modal-window-1').style.display = 'grid';
});

document.querySelector('.find-btn-1').addEventListener('click', () => {
    const list = document.querySelector('.modal-dots-list');
    list.innerHTML = '';
    if (!document.querySelector('.checkbox-btn').checked) {
        const numberOfDots = +document.querySelector('.number-of-dots').value;
        const a = +document.querySelector('.range1').value;
        const b = +document.querySelector('.range2').value;
        if (a > b || numberOfDots < 0) return;
        let dots = bezieClass.getPoints(numberOfDots, a, b);
        dots.map((point) => {
            return '(' + point.join('; ') + ')';
        }).forEach((str) => {
            const listItem = document.createElement('li');
            listItem.textContent = str;
            list.appendChild(listItem);
        });
    }
});

document.querySelector('.close-btn-2').addEventListener('click', () => {
    document.querySelector('.modal-window-2').style.display = 'none';
});

document.querySelector('.subtask-2').addEventListener('click', () => {
    document.querySelector('.modal-window-2').style.display = 'flex';
});

document.querySelector('.find-btn-2').addEventListener('click', () => {
    const list = document.querySelector('.row-matrix');
    document.querySelector('.diagonal-value').innerText = '';
    document.querySelector('.adiagonal-value').innerText = '';
    list.innerHTML = '';
    if (!document.querySelector('.checkbox-btn').checked) {
        const row = +document.querySelector('.select-row').value;
        if (row < 0) return;
        let values = bezieClass.getDiagonals(row);
        document.querySelector('.diagonal-value').innerText = values.diagonal;
        document.querySelector('.adiagonal-value').innerText = values.adiagonal;
        values.row.forEach((el) => {
            const listItem = document.createElement('li');
            listItem.textContent = el;
            list.appendChild(listItem);
        });
    }
});
