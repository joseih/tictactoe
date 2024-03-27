function Player(marker) {
  let score = 0;
  return {
    win() {
      score++;
      this.showScore();
    },
    showScore() {
      console.log(`${marker}: ${score}`);
    },
    marker() {
      return marker;
    },
  };
}
function GameLogic() {
  let playerX = Player("X");
  let playerO = Player("O");
  let gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let turnn = 0;
  function win(marker) {
    if (marker == "X") {
      playerX.win();
      return true;
    } else if (marker == "O") {
      playerO.win();
      return true;
    }
  }
  return {
    gameBoard,
    play() {
      if (turnn == 0) {
        turnn--;
        return playerX.marker();
      } else {
        turnn++;
        return playerO.marker();
      }
    },
    checkCell(i) {
      if (gameBoard[0] == gameBoard[1] && gameBoard[1] == gameBoard[2]) {
        return win(gameBoard[i]);
      } else if (gameBoard[0] == gameBoard[4] && gameBoard[4] == gameBoard[8]) {
        return win(gameBoard[i]);
      } else if (gameBoard[0] == gameBoard[3] && gameBoard[3] == gameBoard[6]) {
        return win(gameBoard[i]);
      } else if (gameBoard[3] == gameBoard[4] && gameBoard[4] == gameBoard[5]) {
        return win(gameBoard[i]);
      } else if (gameBoard[6] == gameBoard[7] && gameBoard[7] == gameBoard[8]) {
        return win(gameBoard[i]);
      } else if (gameBoard[2] == gameBoard[4] && gameBoard[4] == gameBoard[6]) {
        return win(gameBoard[i]);
      }
    },
  };
}

let domLogic = (() => {
  let boardCells = document.querySelectorAll(".gameboard-cell");
  let gameLogic = GameLogic();
  function addLogicInDOM() {
    for (let i = 0; i < 9; i++) {
      boardCells[i].addEventListener("click", () => {
        if (boardCells[i].textContent == "") {
          boardCells[i].textContent = gameLogic.play();
          gameLogic.gameBoard[i] = boardCells[i].textContent;
          if (gameLogic.checkCell(i)) {
            console.log("end");
          }
        }
      });
    }
  }
  return {
    start() {
      addLogicInDOM();
    },
  };
})();
domLogic.start();
