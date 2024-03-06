import { buildCoordinate, addCoordinate } from './buildCoordinates.js';

let canvas = document.querySelector('.myCanvas');

canvas.addEventListener(
    'click',
    (event) => {
        const dot = { x: event.offsetX, y: event.offsetY };
        buildCoordinate(dot);
        addCoordinate(dot);
    },
    false
);
