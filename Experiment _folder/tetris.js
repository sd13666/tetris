const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

function createMatrix(width, height) {
  const matrix = [];
  while (height--) {
    matrix.push(new Array(width).fill(0));
  }
  return matrix;
}

function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = 'purple';
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

const player = {
  pos: { x: 5, y: 5 },
  matrix: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
};

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    player.pos.x--;
  } else if (event.key === 'ArrowRight') {
    player.pos.x++;
  } else if (event.key === 'ArrowDown') {
    player.pos.y++;
  }
});

function update() {
  draw();
  requestAnimationFrame(update);
}

update();
