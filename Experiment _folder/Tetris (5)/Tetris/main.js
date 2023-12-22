const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = [
    'O',
    'L',
    'J',
    'S',
    'Z',
    'T',
    'I'
];

const TETROMINOES = {
    'O': [
        [1, 1],
        [1, 1]
    ],
    'L': [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    'J': [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    'S': [
        [0, 0, 1],
        [1, 1, 1],
        [1, 0, 0]
    ],
    'Z': [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
    ],
    'T': [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    'I': [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ]
};

const colors = ['red', 'green', 'blue', 'orange', 'yellow'];
let color = colors[Math.floor(Math.random() * colors.length)];



let playfield;
let tetromino;

function convertPositionToIndex(row, column) {
    return row * PLAYFIELD_COLUMNS + column;
}

function generatePlayfield() {
    for(let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
        const div = document.createElement('div');
        document.querySelector('.tetris').append(div);
    }

    playfield = new Array(PLAYFIELD_ROWS).fill()
                    .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));

    // console.log(playfield);
};

function generateTetromino() {
    const nameTetro = Object.keys(TETROMINOES)
        [Math.floor(Math.random() * Object.keys(TETROMINOES).length)];
    const matrixTetro = TETROMINOES[nameTetro];
    console.log(matrixTetro);

    const columnTetro = Math.floor((PLAYFIELD_COLUMNS / 2) - (nameTetro[0].length));
    const rowTetro = 3;

    tetromino ={
        name: nameTetro,
        matrix: matrixTetro,
        column: columnTetro,
        row: rowTetro,
    }
}

generatePlayfield();
generateTetromino();
const cells = document.querySelectorAll('.tetris div');
// console.log(cells);

function drawPlayfield(){
    for(let row = 0; row < PLAYFIELD_ROWS; row++) {
        for(let column = 0; column < PLAYFIELD_COLUMNS; column++) {
            // if(playfield[row][column] == 0) { continue };
            const name = playfield[row][column];
            const cellIndex = convertPositionToIndex(row, column);
            cells[cellIndex].classList.add(name);
        }
    }

}

function drawTetronimo() {
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for(let row = 0; row < tetrominoMatrixSize; row++) {
        for(let column = 0; column < tetrominoMatrixSize; column++) {
            if(tetromino.matrix[row][column] == 0){ continue };
            const cellIndex = convertPositionToIndex(tetromino.row + row, 
                tetromino.column + column);
            cells[cellIndex].classList.add(name);
        }
    }
}

function tetroColor() {
    const name = tetromino.name;
    let tetroArray = document.getElementsByClassName(name);

    for(let i = 0; i < tetroArray.length; i++) {
        tetroArray[i].style.background = color;
    }
}

drawTetronimo();
tetroColor();

function clearTetroColor() {
    const name = tetromino.name;
    let tetroArray = document.getElementsByClassName(name);

    for(let i = 0; i < tetroArray.length; i++) {
        tetroArray[i].style.background = null;
    }
}

function draw() {
    clearTetroColor();
    cells.forEach(function(cell) {cell.removeAttribute('class')});
    drawPlayfield();
    drawTetronimo();
    tetroColor();
    console.table(playfield);
}

document.addEventListener('keydown', onKeyDown);

function onKeyDown(event) {
    switch(event.key) {
        case 'ArrowDown':
            moveTetrominoDown();
            break;
        case 'ArrowLeft':
            moveTetrominoLeft();
            break;
        case 'ArrowRight':
            moveTetrominoRight();
            break;
    }
    draw();
}

function moveTetrominoDown() {
    tetromino.row += 1;
    if(isOutsideOfGameBoard()) {
        tetromino.row -= 1;
        placeTetromino();
        // color = colors[Math.floor(Math.random() * colors.length)];
    }
}

function moveTetrominoLeft() {
    tetromino.column -=1;
    if(isOutsideOfGameBoard()) {
        tetromino.column +=1;
    }
}

function moveTetrominoRight() {
    tetromino.column +=1;
    if(isOutsideOfGameBoard()) {
        tetromino.column -=1;
    }
}

function isOutsideOfGameBoard() {
    const matrixSize = tetromino.matrix.length;
    for( let row = 0; row < matrixSize; row++) {
        for( let column = 0; column < matrixSize; column++) {
            if(!tetromino.matrix[row][column]) { continue }
            if(
               tetromino.column + column < 0||
               tetromino.column + column >= PLAYFIELD_COLUMNS ||
               tetromino.row + row >= playfield.length
               ){
                return true;
            }
        }
    }
    return false;
}

function placeTetromino() {
    const matrixSize = tetromino.matrix.length;
    for( let row = 0; row < matrixSize; row++) {
        for( let column = 0; column < matrixSize; column++) {
            if(!tetromino.matrix[row][column])
                continue;
            playfield[tetromino.row + row][tetromino.column + column]
                = TETROMINO_NAMES[0];
            color = colors[Math.floor(Math.random() * colors.length)];
        }
    }
    generateTetromino();
}