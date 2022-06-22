const mainField = document.getElementById('main-field');
const mainElements = mainField.childNodes;
const arrows = document.getElementById('arrows');
const settings = document.forms['settings'];
// const inputHeight = document.getElementById('height');
// const inputWidth = document.getElementById('width');
// const inputObs = document.getElementById('obstacles');

let active = {};
let cells = [];
let fieldHeight = 4;
let fieldWidth = 6;
let obstacles = 4;

const getCells = () => {
  for (let row = 0; row < fieldHeight; row++) {
    cells[row] = Array(fieldWidth).fill('');
  }
  
  for (let i = 0; i < obstacles + 2; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * fieldHeight);
      col = Math.floor(Math.random() * fieldWidth);
    }
    while (cells[row][col]);
    
    if (i < obstacles) cells[row][col] = 'obstacle';
    else if (i === obstacles) cells[row][col] = 'finish';
    else {
      active = { row, col };
      cells[row][col] = 'active'
    }
  }
}

const setCellsStyles = () => {
  const classes = {
    obstacle: ' bg-secondary bg-gradient',
    active: ' bg-primary bg-gradient',
    finish: ' bg-success bg-gradient'
  }
  
  cells.forEach((row, rowIdx) =>
    row.forEach((col, colIdx) => mainElements[rowIdx * fieldWidth + colIdx].className = `border rounded-3${(classes[col] || '')}`));
}

const setCells = () => {
  getCells();
  mainField.style.gridTemplate = `repeat(${fieldHeight}, 1fr) / repeat(${fieldWidth}, 1fr)`;
  mainField.innerHTML = Array(fieldHeight * fieldWidth).fill('<div></div>').join('');
  mainField.style.height = `${mainField.offsetWidth/fieldWidth*fieldHeight}px`;
  setCellsStyles();
}
setCells();

const moveTo = (to, from) => {
  let { row, col } = from;
  let _row = row;
  let _col = col;
  
  if (cells[row][col] === 'finish') return;
  if (to === 'up' && row) _row = row - 1;
  else if (to === 'down' && row + 1 < fieldHeight) _row = row + 1;
  else if (to === 'left' && col) _col = col - 1;
  else if (to === 'right' && col + 1 < fieldWidth) _col = col + 1;
  else return;
  
  if (cells[_row][_col] === 'finish' && from === active) {
    active = [];
    cells[row][col] = '';
    setCells();
    return;
  }
  if (cells[_row][_col]) moveTo(to, { row: _row, col: _col });
  if (cells[_row][_col] === '') {
    from.row = _row;
    from.col = _col;
    cells[_row][_col] = cells[row][col];
    cells[row][col] = '';
  }
}

arrows.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.closest('svg')) {
    moveTo(e.target.closest('svg').id, active);
    console.log(active);
    setCellsStyles();
  }
})

document.addEventListener('keydown', e => {
  if (e.repeat) return;
  if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
    moveTo(e.code.slice(5).toLowerCase(), active);
    setCellsStyles();
  }
})

window.addEventListener('resize', () => {
  mainField.style.height = `${mainField.offsetWidth/fieldWidth*fieldHeight}px`;
});

settings.onsubmit = e => {
  e.preventDefault();
  let data = new FormData(settings);
  fieldHeight = +data.get('height');
  fieldWidth = +data.get('width');
  obstacles = +data.get('obstacles');
  if (obstacles > fieldWidth * fieldHeight / 2) {
    obstacles = Math.floor(fieldWidth * fieldHeight / 2);
    settings[0].value = obstacles;
  }
  setCells();
}

settings.addEventListener('change', (e) => {
  // set inputs min max settings
});