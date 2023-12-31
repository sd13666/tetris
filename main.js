// 1. Додати інші фігури
// 2. Стиізувати нові фігури на власний розсуд!
// 3. Дописати функцію рандомну,котра буде видавати випадкову фігуру
// 4. Центрування фігури коли вона з'являється
// 5. Додати функцію рандомних кольорів для кожної нової фігури

const PLAYFIELD_COLUMNS = 11;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = ["O", "L", "J", "S", "Z", "T"];

const TETROMINOES = {
  O: [
    [1, 1],
    [1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
  ],
};

let playfield;
let tetromino;

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array);
}

function convertPositionToIndex(row, column) {
  return row * PLAYFIELD_COLUMNS + column;
}

function generatePlayField() {
  for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
    const div = document.createElement("div");
    document.querySelector(".tetris").append(div);
  }
  playfield = new Array(PLAYFIELD_ROWS)
    .fill()
    .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
}
generatePlayField();

function generateTetromino() {
  const nameTetro = "O";
  const matrixTetro = TETROMINOES[nameTetro];
  const columnTetro = 4;
  const rowTetro = 2;
  tetromino = {
    name: nameTetro,
    matrix: matrixTetro,
    row: rowTetro,
    column: columnTetro,
  };
}
generateTetromino();

const cells = document.querySelectorAll(".tetris div");

function drawPlayField() {
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      if (playfield[row][column] == 0) {
        continue;
      }
      const name = playfield[row][column];
      const cellIndex = convertPositionToIndex(row, column);
      cells[cellIndex].classList.add(name);
    }
  }
}
drawPlayField();

function drawTetromino() {
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (tetromino.matrix[row][column] == 0) {
        continue;
      }
      const cellIndex = convertPositionToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells[cellIndex].classList.add(name);
    }
  }
}
drawTetromino();

function draw() {
  cells.forEach(function (cell) {
    cell.removeAttribute("class");
  });
  drawPlayField();
  drawTetromino();
  console.table(playfield);
}

document.addEventListener("keydown", onKeyDown);

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowDown":
      moveTetrominoDown();
      break;
    case "ArrowLeft":
      moveTetrominoLeft();
      break;
    case "ArrowRight":
      moveTetrominoRight();
      break;
  }
  draw();
}
function moveTetrominoDown() {
  tetromino.row += 1;
  if (isOutsideOfGameBoard() || hasCollisions()) {
    tetromino.row -= 1;
  }
}
function moveTetrominoLeft() {
  tetromino.column -= 1;
  if (isOutsideOfGameBoard() || hasCollisions()) {
    tetromino.column += 1;
  }
}
function moveTetrominoRight() {
  tetromino.column += 1;
  if (isOutsideOfGameBoard() || hasCollisions()) {
    tetromino.column -= 1;
  }
}

function isOutsideOfGameBoard() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (!tetromino.matrix[row][column]) {
        continue;
      }
      if (
        tetromino.column + column < 0 ||
        tetromino.column + column >= PLAYFIELD_COLUMNS ||
        tetromino.row + row >= playfield.length
      ) {
        return true;
      }
    }
  }
  return false;
}

function placeTetromino() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (!tetromino.matrix[row][column]) continue;

      playfield[tetromino.row + row][tetromino.column + column] =
        TETROMINO_NAMES[0];
    }
  }
  generateTetromino();
}
//--------------------------------
//--------------------------------
// ---- lesson 3 -------

function hasCollisions() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (tetromino.matrix[row][column] == 0) {
        continue;
      }
      if (playfield[tetromino.row + row][tetromino.column + column]) {
        return true;
      }
    }
  }
  return false;
}

function isValid() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (!tetromino.matrix[row][column]) {continue; }
      //   if (tetromino.matrix[row][column] == 0) {continue;}
      if(isOutsideOfGameBoard(row, column)){return true}
    }
  }
}

// функція, яка буде перевертати фігури

function rotateTetramino() {
    const oldMatrix = tetromino.matrix;
    const rotatedMatrix = rotateMatrix(tetramino.matrix);
    tetromino.matrix = rotatedMatrix;
    draw();
}

function rotateMatrix(matrixTetromino){
    const N = matrixTetromino.length;
    const rotateMatrix = [];
    for(let i = 0; i < N; i++){
        rotateMatrix[i] = [];
        for(let j = 0; j < N; j++){
            rotateMatrix[i][j] = matrixTetromino[N - j - 1][i];
        }
    }
    return rotateMatrix;
}