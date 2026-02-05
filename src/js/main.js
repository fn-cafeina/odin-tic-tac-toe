const Gameboard = (function () {
  let turn = true;

  const board = Array(9).fill(0);

  const getBoard = () => board;

  const draw = function (position) {
    if (!board[position]) {
      board[position] = turn ? "X" : "O";
      turn = !turn;
    }
  };

  const over = function () {
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

  return { draw, over, getBoard };
})();

const DOMvi = (function () {
  const renderBoard = function (board, domBoard) {
    board.forEach((element) => {
      const cell = document.createElement("div");
      cell.className = "cell";

      if (element !== 0) {
        const span = document.createElement("span");
        span.textContent = element;
        cell.appendChild(span);
      }

      domBoard.appendChild(cell);
    });
  };

  return { renderBoard };
})();

const domBoard = document.querySelector(".board");
domBoard.addEventListener("click", function (event) {
  const target = event.target;

  if (target.className === "cell") {
    const targetIndex = getElementIndex(target);
    Gameboard.draw(targetIndex);

    cleanContainer(domBoard);
    const board = Gameboard.getBoard();
    DOMvi.renderBoard(board, domBoard);
  }

  if (Gameboard.over() === "TIE") {
    setTimeout(() => {
      alert("It's a TIE");
      alert("The game will restart automatically");
      location.reload();
    }, 50);
  }

  if (Gameboard.over() === "X") {
    setTimeout(() => {
      alert("Winner is X");
      alert("The game will restart automatically");
      location.reload();
    }, 50);
  }

  if (Gameboard.over() === "O") {
    setTimeout(() => {
      alert("Winner is O");
      alert("The game will restart automatically");
      location.reload();
    }, 50);
  }
});

function createPlayer(name) {
  return { name };
}

const player1 = createPlayer(prompt("Player 1 Name:"));
const player2 = createPlayer(prompt("Player 2 Name:"));

function getElementIndex(node) {
  let index = 0;

  while ((node = node.previousElementSibling)) {
    index++;
  }

  return index;
}

function cleanContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}
