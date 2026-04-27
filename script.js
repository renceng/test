const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const grid = 20;
let count = 0;

let snake = {
  x: 160,
  y: 160,
  cells: [],
  maxCells: 4
};

let apple = {
  x: 320,
  y: 320
};

let dx = grid;
let dy = 0;

let score = 0;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function loop() {
  requestAnimationFrame(loop);

  if (++count < 4) {
    return;
  }

  count = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += dx;
  snake.y += dy;

  if (snake.x < 0) snake.x = canvas.width - grid;
  else if (snake.x >= canvas.width) snake.x = 0;

  if (snake.y < 0) snake.y = canvas.height - grid;
  else if (snake.y >= canvas.height) snake.y = 0;

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  ctx.fillStyle = 'lime';
  snake.cells.forEach(function(cell, index) {
    ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score++;
      document.getElementById('score').textContent = score;
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        dx = grid;
        dy = 0;
        score = 0;
        document.getElementById('score').textContent = score;
      }
    }
  });
}

document.addEventListener('keydown', function(e) {
  if (e.which === 37 && dx === 0) {
    dx = -grid;
    dy = 0;
  } else if (e.which === 38 && dy === 0) {
    dx = 0;
    dy = -grid;
  } else if (e.which === 39 && dx === 0) {
    dx = grid;
    dy = 0;
  } else if (e.which === 40 && dy === 0) {
    dx = 0;
    dy = grid;
  }
});

requestAnimationFrame(loop);
