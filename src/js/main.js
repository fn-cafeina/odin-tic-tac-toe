const Gameboard = (function () {
  const board = Array(9).fill(0);

  const draw = function (mark, position) {
    if (!board[position]) {
      board[position] = mark;
    }
  };

  const combs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  const over = function () {
    for (const comb of combs) {
      if (
        board[comb[0]] === board[comb[1]] &&
        board[comb[1]] === board[comb[2]] &&
        board[comb[0]] !== 0
      ) {
        return board[comb[0]];
      }
    }

    if (board.every((i) => i !== 0)) {
      return "TIE";
    }
  };

  return { draw, over };
})();
