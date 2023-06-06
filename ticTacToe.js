document.addEventListener("DOMContentLoaded", () => {
  const gameOutcome = document.getElementsByClassName("gameOutcome")[0];
  const cells = document.querySelectorAll(".cell");

  const players = ["X", "O"];
  let currentPlayer = players[Math.floor(Math.random() * players.length)];

  let isGameStillRunning = true;
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (cell.textContent === "" && isGameStillRunning) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        cell.textContent = currentPlayer;
        const gameOutcomeMessage = document.createElement("p");
        gameOutcomeMessage.setAttribute(
          "style",
          "text-align:center; font-size: 25px; color: green"
        );

        gameOutcome.appendChild(gameOutcomeMessage);
        if (isWinningCondition(cells)) {
          isGameStillRunning = false;
          gameOutcomeMessage.textContent = `${currentPlayer} wins`;
        } else if (isDrawCondition(cells)) {
          isGameStillRunning = false;
          gameOutcomeMessage.textContent = "Draw";
        }
      }
    });
  });

  document
    .getElementsByClassName("button1")[0]
    .addEventListener("click", () => {
      cells.forEach((cell) => {
        cell.textContent = "";
        cell.removeAttribute("style", "color:red");
      });

      while (gameOutcome.firstChild) {
        gameOutcome.removeChild(gameOutcome.firstChild);
      }

      isGameStillRunning = true;
    });

  function isWinningCondition(cells) {
    const combinations = getPossibleWinningCombinations(cells);

    for (let combination of combinations) {
      if (
        combination[0].textContent &&
        combination[1].textContent &&
        combination[2].textContent
      ) {
        if (
          combination[0].textContent === combination[1].textContent &&
          combination[1].textContent === combination[2].textContent
        ) {
          combination.forEach((cell) => {
            cell.setAttribute("style", "color:red");
          });
          return true;
        }
      }
    }
    return false;
  }
});

function isDrawCondition(cells) {
  for (const cell of cells) {
    if (!cell.textContent) {
      return false;
    }
  }
  return true;
}

function getPossibleWinningCombinations(cells) {
  const firstRow = [cells[0], cells[1], cells[2]];
  const secondRow = [cells[3], cells[4], cells[5]];
  const thirdRow = [cells[6], cells[7], cells[8]];

  const firstColumn = [cells[0], cells[3], cells[6]];
  const secondColumn = [cells[1], cells[4], cells[7]];
  const thirdColumn = [cells[2], cells[5], cells[8]];

  const firstDiagonal = [cells[0], cells[4], cells[8]];
  const secondDiagonal = [cells[2], cells[4], cells[6]];

  const combinations = [
    firstRow,
    secondRow,
    thirdRow,
    firstColumn,
    secondColumn,
    thirdColumn,
    firstDiagonal,
    secondDiagonal,
  ];
  return combinations;
}
