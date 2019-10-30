import ship from './factories/ship';
import gameBoard from './factories/gameBoard';
import { checkSpaceV, checkSpaceH, aiBoard, winMsg } from './ai';
import { pl } from '../index';

const pShips = [
  ship(1),
  ship(1),
  ship(1),
  ship(2),
  ship(2),
  ship(3),
  ship(3),
  ship(4)
];

const pBoard = gameBoard(pShips);
const drawAborderV = (row, col, size) => {
  for (let i = 0; i < size; i++) {
    const cells = document.querySelectorAll('#player-grid .pcell');
    const cell = cells[(row + i) * 10 + col];
    cell.classList.add('border', 'border-danger');
  }
};

const drawAborderH = (row, col, size) => {
  for (let i = 0; i < size; i++) {
    const cells = document.querySelectorAll('#player-grid .pcell');
    const cell = cells[row * 10 + col + i];
    cell.classList.add('border', 'border-danger');
  }
};
const placeTheShip = tar => {
  let divId = tar.id[1];
  const shipId = parseInt(divId);
  const div = document.querySelector(`#f${shipId}`);
  const row = parseInt(document.querySelector(`.rows${divId}`).value);
  const col = parseInt(document.querySelector(`.cols${divId}`).value);
  const path = document.querySelector(`.opt${divId}`).value;
  if (path == 'vertical') {
    if (checkSpaceV(pBoard.board, row, col, pBoard.ships[shipId].size)) {
      pBoard.placeShip(pBoard.ships[shipId], row, col, path);
      drawAborderV(row, col, pBoard.ships[shipId].size);
      div.classList.add('d-none');
    } else {
      winMsg('Please choose a rational place');
    }
  } else {
    if (checkSpaceH(pBoard.board, row, col, pBoard.ships[shipId].size)) {
      pBoard.placeShip(pBoard.ships[shipId], row, col, path);
      drawAborderH(row, col, pBoard.ships[shipId].size);
      div.classList.add('d-none');
    } else {
      winMsg('Please choose a rational place');
    }
  }
};

const saveShipBtn = document.querySelectorAll('.saveShip');

saveShipBtn.forEach(btn =>
  btn.addEventListener('click', e => {
    placeTheShip(e.target);
    pl.disabled = true;
  })
);

export { pBoard, pShips };
