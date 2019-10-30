const player = () => {
  const pAttack = (gBoard, row, col) => {
    gBoard.recieveAttack([row, col]);
  };
​
  const aiAttack = gBoard => {
    let row = Math.round(Math.random() * 9);
    let col = Math.round(Math.random() * 9);
​
    while (gBoard.board[row][col] == 'X' || gBoard.board[row][col] == 'X') {
      row = Math.round(Math.random() * 9);
      col = Math.round(Math.random() * 9);
    }
    gBoard.recieveAttack([row, col]);
    return [row, col];
  };
​
  return { pAttack, aiAttack };
};
​
export default player;
