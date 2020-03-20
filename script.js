window.addEventListener('load', startGame);

let boardEl = document.getElementById('board');
let modalEl = document.getElementById('modal');
let resetButtons = document.getElementsByClassName('reset');

for (let btn of resetButtons) {
  btn.addEventListener('click', function () {
    if (!modalEl.classList.contains('hidden')) {
      modalEl.classList.add('hidden');
    }
    startGame();
  });
}

boardEl.addEventListener('click', function (event) {
  let targetClasses = event.target.classList;
  let targetData = event.target.dataset;
  if (targetClasses.contains('field') && !targetClasses.contains('busy')) {
    click(targetData.row, targetData.col);
  }
});

function showWinner(winner) {
  let header = modalEl.getElementsByTagName('h2')[0];
  header.textContent = `🍾 Won Player №${winner + 1}! 🍾`;
  modalEl.classList.remove('hidden');
}

function renderBoard(board) {
  const fields = [];
  for (let [i, row] of board.entries()) {
    for (let [j, value] of row.entries()) {
      fields.push(`
        <div class="field ${value ? 'busy' : 'free'}" 
            data-row="${i}" 
            data-col="${j}"
            style="grid-row:${i + 1};grid-column:${j + 1};"
        >
          ${value || ''}
        </div>
      `);
    }
  }
  boardEl.innerHTML = fields.join('');
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// UI //////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

let players = ['x', 'o'];
let activePlayer = 0;
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let turn = 0;

// выйгрышные комбинации представлены в выйгрышных # индексах для board
const winCombos = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6], 
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

// в данной функции мы декларируем variable won и приравниваем ее к значению false

// итерируем через выйгрышные комбинации сравнивая их с тем что есть на board (используем метод flat() чтобы через него было легче итерировать и сравнить показатели)

// сохраняем значение в переменную (просто так проще)
// затем проверяем если одна из клеточек в текущей выйграшной комбинации на board является пустой то тогда мы двигаемся дальше
// проверяем если выйгрышная комбинация заполнена на board если да то присваеваем значение true to won

//далее проверяем если игрок таки выйграл если да то возвращаем текущего игрока

function getWinner() {
    let won = false;
    for (let i = 0; i <= 7; i++) {
        const winCombo = winCombos[i];
        let a = board.flat()[winCombo[0]];
        let b = board.flat()[winCombo[1]];
        let c = board.flat()[winCombo[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            won = true;
            break
        }
    }
if (won) {
        showWinner(activePlayer);
        return;
    }
}

// рисуем board, начинаем счетчик
function startGame() {
board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
renderBoard(board);
turn = 0;
};


// проверяем если число в turn четное то тогда присваеваем очередь игроку 0
// если нечетное то игроку 1
// проставляем шаг на поле
// перерисовываем board с новым значением
// проверяем если текущий игрок выйграл

function click(row, col) {
  if (turn % 2 === 0) {
    activePlayer = 0;
  } else {
    activePlayer = 1;
  }

  board[row][col] = players[activePlayer];
  turn++;
  renderBoard(board);
  getWinner();
};



