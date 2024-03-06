import clearArray from './startButton.js';

const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');
ctx.canvas.width = canvas.clientWidth;
ctx.canvas.height = canvas.clientHeight;

document.querySelector('.clear-btn').addEventListener('click', function () {
    clear();
});

window.addEventListener('resize', function () {
    clear();
});

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.querySelector('.dots-list').innerHTML = '';
    clearArray();
}
