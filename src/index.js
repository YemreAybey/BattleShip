import createBoards from './modules/create-boards';
import { pBoard, pShips } from './modules/pl';
import {
  placeAiShipsV,
  placeAiShipsH,
  attackAi,
  aiBoard,
  putMark,
  aiShips,
  aiB,
  plB,
  winMsg
} from './modules/ai';
import gameBoard from './modules/factories/gameBoard';

createBoards();
const forms = document.querySelectorAll('.form');
const aiGrid = document.querySelectorAll('#ai-grid .aicell');
const plGrid = document.querySelectorAll('#player-grid .pcell');
aiGrid.forEach(cell => (cell.disabled = true));
const startBtn = document.querySelector('.start');
const pl = document.querySelector('.place');
const formArea = document.querySelector('.formArea');
pl.addEventListener('click', () => {
  formArea.classList.toggle('d-none');
});

startBtn.addEventListener('click', e => {
  const placement = pBoard.board.reduce(
    (acc, arr) => acc + arr.reduce((acc, cell) => acc + cell, 0),
    0
  );
  if (placement == 17 && e.target.disabled == false) {
    const cells = document.querySelectorAll('#player-grid .pcell');
    cells.forEach(cell => (cell.innerHTML = ''));
    aiGrid.forEach(cell => (cell.disabled = false));
    e.target.disabled = true;
  } else {
    winMsg('Please Place All the Ships');
  }
});
const aiCells = document.querySelectorAll('.aicell');
aiCells.forEach(cell =>
  cell.addEventListener('click', e => {
    if (e.target.innerHTML == '') {
      attackAi(e);
    }
  })
);

placeAiShipsV(aiBoard);
placeAiShipsH(aiBoard);
const res = document.querySelector('.reset');
res.addEventListener('click', e => {
  reconstruct();
});
const reconstruct = () => {
  for (let i = 0; i < 10; i++) {
    aiBoard.board[i] = new Array(10).fill(0);
    pBoard.board[i] = new Array(10).fill(0);
  }
  aiBoard.ships.forEach(s => {
    s.loc = [];
    s.hitChange();
  });
  pBoard.ships.forEach(s => {
    s.loc = [];
    s.hitChange();
  });
  aiCells.forEach(c => {
    c.classList.remove('bg-primary', 'bg-danger');
    c.innerHTML = '';
  });
  plGrid.forEach(c => {
    c.innerHTML = '';
    c.classList.remove('bg-primary', 'bg-danger', 'border', 'border-danger');
    c.innerHTML = `${c.dataset.row}, ${c.dataset.col}`;
  });

  aiB.classList.remove('bg-secondary');
  plB.classList.remove('bg-secondary');
  placeAiShipsV(aiBoard);
  placeAiShipsH(aiBoard);
  pl.disabled = false;
  forms.forEach(f => f.classList.remove('d-none'));
  startBtn.disabled = false;
  aiCells.forEach(c => (c.disabled = true));
};
export { pl, aiGrid };
