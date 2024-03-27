function Player(marker) {
  let score = 0;
  let scoreSpan = document.getElementById(marker);

  return {
    win() {
      score++;
      scoreSpan.textContent = marker + ": " + score;
    },
    marker() {
      return marker;
    },
  };
}

function DomLogic() {
  let boardCells = document.querySelectorAll(".gameboard-cell");
  let countTurn = 0;
  let gamelogic = GameLogic();

  function addLogicInDOM() {
    for (let i = 0; i < 9; i++) {
      boardCells[i].addEventListener("click", () => {
        if (boardCells[i].textContent == "") {
          boardCells[i].textContent = turns();
          gamelogic.gameBoard[i] = boardCells[i].textContent;
          if (gamelogic.checkCell(i)) {
            terminate();
          }
        }
      });
    }
  }
  function terminate() {
    boardCells.forEach((x) => {
      x.textContent = "";
    });
  }
  function turns() {
    if (countTurn == 0) {
      countTurn--;
      return "X";
    } else {
      countTurn++;
      return "O";
    }
  }
  return {
    addLogicInDOM,
  };
}

function GameLogic() {
  let playerX = Player("X");
  let playerO = Player("O");
  let drawCount = 0;
  let gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let maxTurns = 9;
  let drawSpan = document.getElementById("draw");
  function terminate() {
    for (let i = 0; i < 9; i++) {
      gameBoard[i] = i;
    }
    maxTurns = 9;
  }
  function win(marker) {
    switch (marker) {
      case "X":
        playerX.win();
        break;
      case "O":
        playerO.win();
        break;
      case "D":
        drawCount++;
        drawSpan.textContent = "Draw: " + drawCount;
        break;
    }
  }
  return {
    gameBoard,
    checkCell(i) {
      maxTurns--;
      if (maxTurns == 0) {
        win("D");
        terminate();
        return true;
      }
      const winningConditions = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
        [1, 4, 7],
      ];
      for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] == gameBoard[b] && gameBoard[b] == gameBoard[c]) {
          win(gameBoard[i]);
          terminate();
          return true;
        }
      }
    },
  };
}
let game = DomLogic();
game.addLogicInDOM();
