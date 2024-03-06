const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');

const width = canvas.clientWidth;
const height = canvas.clientHeight;

export function build() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const width = canvas.width;
    const height = canvas.height;

    ctx.lineWidth = 2;
    ctx.font = '15px Arial';
    ctx.textAlign = 'left';
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';

    ctx.beginPath();

    //drawing horizontal and vertical coordinate lines
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    //drawing ticks and labels for lines
    for (let i = width / 2; i < width; i += 50) {
        ctx.fillText(i - width / 2, i - 20, height / 2 + 20);
        ctx.moveTo(i, height / 2 - 3);
        ctx.lineTo(i, height / 2 + 3);
        ctx.stroke();
    }
    for (let i = width / 2 - 50; i > 0; i -= 50) {
        ctx.fillText(i - width / 2, i - 20, height / 2 + 20);
        ctx.moveTo(i, height / 2 - 3);
        ctx.lineTo(i, height / 2 + 3);
        ctx.stroke();
    }

    ctx.textAlign = 'right';
    for (let i = height / 2 + 50; i < height; i += 50) {
        ctx.fillText(height / 2 - i, width / 2 - 10, i + 10);
        ctx.moveTo(width / 2 - 3, i);
        ctx.lineTo(width / 2 + 3, i);
        ctx.stroke();
    }
    for (let i = height / 2 - 50; i > 0; i -= 50) {
        ctx.fillText(height / 2 - i, width / 2 - 10, i + 10);
        ctx.moveTo(width / 2 - 3, i);
        ctx.lineTo(width / 2 + 3, i);
        ctx.stroke();
    }

    //drawing arrow at the ends of the lines
    ctx.textAlign = 'left';
    ctx.moveTo(width - 20, height / 2 - 8);
    ctx.lineTo(width, height / 2);
    ctx.lineTo(width - 20, height / 2 + 8);
    ctx.stroke();
    ctx.fillText('x', width - 20, height / 2 + 24);

    ctx.moveTo(width / 2 - 8, 20);
    ctx.lineTo(width / 2, 0);
    ctx.lineTo(width / 2 + 8, 20);
    ctx.stroke();
    ctx.fillText('y', width / 2 - 24, 20);
}

export function buildCoordinate(dot) {
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.arc(dot.x + 2.5, dot.y + 2.5, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
}

export function buildCoordinates() {
    build();
    const list = document.querySelectorAll('.dots-list li');
    list.forEach((el) => {
        const dot = {
            x: +el.querySelector('.x').value + width / 2,
            y: height / 2 - el.querySelector('.y').value,
        };
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
    });
}

export function addCoordinate(coordinate) {
    const list = document.querySelector('.dots-list');

    const newItem = document.createElement('li');
    let input = document.createElement('input');
    input.type = 'number';
    input.placeholder = 'X';
    input.classList.add('x');
    input.value = coordinate.x - width / 2;
    newItem.appendChild(input);

    input = document.createElement('input');
    input.type = 'number';
    input.placeholder = 'Y';
    input.classList.add('y');
    input.value = height - coordinate.y - height / 2;
    newItem.appendChild(input);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete-btn');

    deleteButton.addEventListener('click', function (event) {
        newItem.remove();
        buildCoordinates();
    });

    newItem.appendChild(deleteButton);

    list.appendChild(newItem);

    const xInput = newItem.querySelector('.x');
    const yInput = newItem.querySelector('.y');

    xInput.addEventListener('input', function () {
        buildCoordinates();
    });

    yInput.addEventListener('input', function () {
        buildCoordinates();
    });
}
