const createAiBoard = () => {
  const aigrid = document.getElementById('ai-grid');

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const aicell = document.createElement('div');
      aicell.classList.add('aicell');
      aicell.dataset.row = i;
      aicell.dataset.col = j;
      aigrid.appendChild(aicell);
    }
  }
};

const createHumanBoard = () => {
  const playergrid = document.getElementById('player-grid');

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const pcell = document.createElement('div');
      pcell.classList.add('pcell');
      pcell.dataset.row = i;
      pcell.dataset.col = j;
      playergrid.appendChild(pcell);

    }
  }
}
export { createAiBoard, createHumanBoard};
