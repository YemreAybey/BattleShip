const gameBoard = ships => {
  const board = new Array(10);
  for (let i = 0; i < 10; i++) {
    board[i] = new Array(10).fill(0);
  }

  const locOk = (size, row, col, path) => {
    if (path == 'vertical') {
      return row + size < board.length ? true : false;
    } else {
      return col + size < board.length ? true : false;
    }
  };

  const placeShip = (ship, row, col, path) => {
    if (locOk(ship.size, row, col, path) == true) {
      if (path == 'vertical') {
        for (let i = 0; i < ship.size; i++) {
          ship.loc.push([row + i, col]);
          board[row + i][col] = 1;
        }
      } else {
        for (let i = 0; i < ship.size; i++) {
          ship.loc.push([row, col + i]);
          board[row][col + i] = 1;
        }
      }
    }
  };

  const findAndHit = cor => {
    ships.forEach(ship => {
      const check = ship.loc.some(arr => arr[0] == cor[0] && arr[1] == cor[1]);

      if (check) {
        ship.hit();
        return;
      }
    });
  };

  const recieveAttack = cor => {
    if (board[cor[0]][cor[1]] == 1) {
      board[cor[0]][cor[1]] = 'X';
      findAndHit(cor);
    } else if (board[cor[0]][cor[1]] == 0) {
      board[cor[0]][cor[1]] = 'M';
    }
  };

  const isAllSunk = () => {
    return ships.every(ship => ship.isSunk() == true);
  };


  return {
    board,
    locOk,
    placeShip,
    isAllSunk,
    recieveAttack,
    findAndHit,
    ships
  };
};

export default gameBoard;
