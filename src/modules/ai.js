import ship from './factories/ship';
import gameBoard from './factories/gameBoard';
import { aiGrid } from '../index';
import { pBoard } from './pl';
​
const aiB = document.querySelector('#ai-grid');
const plB = document.querySelector('#player-grid');
const close = document.querySelector('.closing');
const modal = document.querySelector('.modal-window');
const message = document.querySelector('.msg');
​
close.addEventListener('click', e => {
  modal.classList.toggle('d-none');
  modal.classList.toggle('show-modal');
});
​
const aiShips = [
  ship(1),
  ship(3),
  ship(4),
  ship(2),
  ship(2),
  ship(3),
  ship(1),
  ship(1)
];
​
const aiBoard = gameBoard(aiShips);
​
const checkSpaceV = (b, r, c, size) => {
  for (let i = 0; i < size; i++) {
    if (r + size - 1 >= 10 || b[r + i][c] == '1') {
      return false;
    }
  }
  return true;
};
​
const checkSpaceH = (b, r, c, size) => {
  for (let i = 0; i < size; i++) {
    if (c + size - 1 >= 10 || b[r][c + i] == '1') {
      return false;
    }
  }
  return true;
};
​
const placeAiShipsV = b => {
  for (let i = 0; i < 4; i++) {
    const s = b.ships[i];
    let row = Math.round(Math.random() * 9);
    let col = Math.round(Math.random() * 9);
    while (!checkSpaceV(b.board, row, col, s.size)) {
      row = Math.round(Math.random() * 9);
      col = Math.round(Math.random() * 9);
    }
    b.placeShip(s, row, col, 'vertical');
  }
};
​
const placeAiShipsH = b => {
  for (let i = 4; i < 8; i++) {
    const s = b.ships[i];
    let row = Math.round(Math.random() * 9);
    let col = Math.round(Math.random() * 9);
    while (!checkSpaceH(b.board, row, col, s.size)) {
      row = Math.round(Math.random() * 9);
      col = Math.round(Math.random() * 9);
    }
    b.placeShip(s, row, col, 'horizontal');
  }
};
const attackAi = e => {
  const aiCells = document.querySelectorAll('#ai-grid .aicell');
  const cells = document.querySelectorAll('#player-grid .pcell');
  if (!gameOver()) {
    const [row, col] = [
      parseInt(e.target.dataset.row),
      parseInt(e.target.dataset.col)
    ];
    if (
      aiBoard.board[row][col] != 'X' &&
      aiBoard.board[row][col] != 'M' &&
      e.target.disabled != true
    ) {
      aiBoard.recieveAttack([row, col]);
      e.target.innerHTML = aiBoard.board[row][col];
      e.target.disabled = true;
      if (e.target.innerHTML == 'M') {
        e.target.classList.add('bg-primary');
      } else {
        e.target.classList.add('bg-danger');
      }
      if (checkWinner(aiCells, 'YOU WON') == true) {
        aiB.classList.add('bg-secondary');
        plB.classList.add('bg-secondary');
        cells.forEach(c => (c.disabled = true));
        return;
      }
      if (aiBoard.board[row][col] == 'M') {
        let [r, c] = putMark(pBoard);
        let cell = cells[r * 10 + c];
        cell.innerHTML = pBoard.board[r][c];
​
        if (cell.innerHTML == 'M') {
          cell.classList.add('bg-primary');
        } else {
          cell.classList.add('bg-danger');
        }
        if (checkWinner(cells, 'COMPUTER WON') == true) {
          cells.forEach(c => (c.disabled = true));
          plB.classList.add('bg-secondary');
          aiB.classList.add('bg-secondary');
          return;
        }
        while (pBoard.board[r][c] == 'X') {
          if (checkWinner(cells, 'COMPUTER WON') == true) {
            cells.forEach(c => (c.disabled = true));
            plB.classList.add('bg-secondary');
            aiB.classList.add('bg-secondary');
            break;
          }
          [r, c] = putMark(pBoard);
          cell = cells[r * 10 + c];
          cell.innerHTML = pBoard.board[r][c];
          if (cell.innerHTML == 'M') {
            cell.classList.add('bg-primary');
          } else {
            cell.classList.add('bg-danger');
          }
        }
      }
    }
  }
};
const putMark = b => {
  let row = Math.round(Math.random() * 9);
  let col = Math.round(Math.random() * 9);
  while (b.board[row][col] == 'X' || b.board[row][col] == 'M') {
    row = Math.round(Math.random() * 9);
    col = Math.round(Math.random() * 9);
  }
  b.recieveAttack([row, col]);
​
  return [row, col];
};
​
const checkWinner = (cells, msg) => {
  let sum = 0;
  cells.forEach(c => {
    if (c.innerHTML == 'X') {
      sum++;
    }
  });
  if (sum == 17) {
    winMsg(msg);
    return true;
  } else {
    return false;
  }
};
const gameOver = () => {
  return aiBoard.isAllSunk() || pBoard.isAllSunk();
};
const winMsg = msg => {
  modal.classList.toggle('show-modal');
  modal.classList.toggle('d-none');
  message.innerHTML = msg;
};
export {
  checkSpaceH,
  checkSpaceV,
  placeAiShipsV,
  placeAiShipsH,
  attackAi,
  aiBoard,
  putMark,
  aiShips,
  aiB,
  plB,
  modal,
  winMsg
};
