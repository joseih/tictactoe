function Player(marker) {
  let score = 0;
  return {
    play() {
      let index = parseInt(prompt("index: "));
      return index;
    },
    win() {
      score++;
    },
    showScore() {
      return score;
    },
    marker() {
      return marker;
    },
  };
}
function GameBoard() {
  let gameboard = [];
  return {
    turn(marker, index) {
      if (gameboard[index] == "_") {
        gameboard[index] = marker;
        this.showBoard();
      } else {
        console.log("Invalid Play");
      }
    },
    checkCells() {
      for (let i = 0; i < gameboard.length; i++) {
        switch (i) {
          case 0:
            if (gameboard[0] == gameboard[1] && gameboard[1] == gameboard[2]) {
              return gameboard[i];
            } else if (
              gameboard[0] == gameboard[3] &&
              gameboard[3] == gameboard[6]
            ) {
              return gameboard[i];
            } else if (
              gameboard[0] == gameboard[4] &&
              gameboard[4] == gameboard[8]
            ) {
              return gameboard[i];
            }
            break;
          case 1:
            if (gameboard[1] == gameboard[4] && gameboard[4] == gameboard[7]) {
              return gameboard[i];
            }
            break;
          case 2:
            if (gameboard[2] == gameboard[5] && gameboard[5] == gameboard[8]) {
              return gameboard[i];
            }
            break;
          case 3:
            if (gameboard[3] == gameboard[4] && gameboard[4] == gameboard[5]) {
              return gameboard[i];
            }
            break;
          case 6:
            if (gameboard[6] == gameboard[7] && gameboard[7] == gameboard[8]) {
              return gameboard[i];
            }
            break;
          default:
            break;
        }
      }
      let draw = gameboard.findIndex((x) => {
        if (x == "_") {
          return true;
        }
      });
      if (draw == -1) {
        return "D";
      }
    },
    showBoard() {
      let firstLine = "| ",
        secondLine = "| ",
        thirdLine = "| ";
      for (let i = 0; i < 3; i++) {
        firstLine += gameboard[i] + " | ";
      }
      for (let i = 3; i < 6; i++) {
        secondLine += gameboard[i] + " | ";
      }
      for (let i = 6; i < 9; i++) {
        thirdLine += gameboard[i] + " | ";
      }
      console.clear();
      console.log(firstLine);
      console.log(secondLine);
      console.log(thirdLine);
    },
    cleanBoard() {
      for (let i = 0; i < 9; i++) {
        gameboard[i] = "_";
      }
    },
  };
}

let gamelogic = (() => {
  let gameboard = GameBoard();
  let playerX = Player("X");
  let playerO = Player("O");
  function checkForWin() {
    let winPlayer = gameboard.checkCells();
    if (winPlayer != undefined || winPlayer != "_") {
      switch (winPlayer) {
        case "X":
          playerX.win();
          console.log(`Win of: ${playerX.marker()}`);
          console.log(`Score: ${playerX.showScore()}`);
          return false;
        case "O":
          playerO.win();
          console.log(`Win of: ${playerO.marker()}`);
          console.log(`Score: ${playerO.showScore()}`);
          return false;
        case "D":
          console.log("Draw!");
          return false;
        default:
          return true;
      }
    }
  }
  return {
    start() {
      gameboard.cleanBoard();
      let turn = 0;
      do {
        if (turn == 0) {
          gameboard.turn(playerX.marker(), playerX.play());
          turn--;
        } else {
          gameboard.turn(playerO.marker(), playerO.play());
          turn++;
        }
      } while (checkForWin());
    },
  };
})();
const button = document.getElementById("play");
button.addEventListener("click", gamelogic.start);
let gameboard = [];
for (let i = 0; i < 9; i++) {
  gameboard[i] = "_";
}

console.log(
  gameboard.findIndex((x) => {
    if (x == "_") {
      return true;
    }
  })
);
