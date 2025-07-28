"use strict";

import levels from "./levelData.js";

// Starting the game - Initial values:
let clickedCellDiv = null; // Setting the Click event to null
let choosedCellDiv = null;
let mistakeFlag = null;
let gameBoard = createNewBoard(); // creating the board stracture and the HTML
boardLevelLoader(1, gameBoard); // Loads level 1 as the default level
dropdownList();

// Solve button
const solveButton = document.querySelector(".solve-button");
solveButton.addEventListener("click", () => {
  autoSolver(gameBoard);
});

function createNewBoard() {
  /*
   CREATE NEW BOARD FUNCTION:
   - Create the board stracture as an array (3X3 Big cells contains 3X3 Sub-Cells)
   - Creating the HTML stracture based on the array created
   - Implementing a uniqe ID for each cell and sub-cell
   - Create a click event for each sub-cell
  */

  // Getting the board div and stored it
  const boardDiv = document.getElementById("board");
  // Clean the div for new render
  boardDiv.innerHTML = "";

  // Creating the board stracture
  const board = boardStractureCreate();

  // Creating the HTML Stracture
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Creating the Big-cells div's and adding cell class to them
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");

      // Determine the cell IDs and adding it to the DIV ID
      const cellID = `${i}-${j}`;
      cellDiv.id = cellID;

      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          // For Every cell created, creating 9 sub-cells
          // Creating the sub-cells DIVS and adding a sub-cell class for them
          const subCellDiv = document.createElement("div");
          subCellDiv.classList.add("sub-cell");

          // Determine the sub-cell IDs and adding it to the DIV ID
          const subCellID = `${i}-${j}-${x}-${y}`;
          subCellDiv.id = subCellID;

          // Adding an EventLisener for each sub-cell, that will handle the clicks on them
          subCellDiv.addEventListener("click", () => boardClick(subCellID));

          // Every sub-cell created, added to the Big cell Div
          cellDiv.appendChild(subCellDiv);
        }
      }
      // Every Big-cell created, added to the Board Div
      boardDiv.appendChild(cellDiv);
    }
  }
  return board;
}

function boardStractureCreate() {
  function cellCreator() {
    return {
      subGrid: Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => "")
      ),
    };
  }

  // creates a GameBoard array: board[row][col].subGrid[SubRow][SubCol]
  return Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => cellCreator())
  );
}

function boardLevelLoader(level, boardData) {
  /*
   BOARD LEVEL LOADER FUNCTION:
   - Inputs: level (int), gameBoard (Arr)
   - Getting the level values out of the DataBase and Implementing them into the gameBoard array.
   - Locking the level's sub-cells
   - Setting the level Propereties to the Header
  */

  // Cleaning the old board's Data
  boardData = boardStractureCreate();

  // Cleaning the old user selection on the board
  if (clickedCellDiv) {
    choosedCellDiv.classList.remove("choosed-cell");
    clickedCellDiv = null;
  }

  // Cleaning the old board's locked cells
  const lockedCells = document.querySelectorAll(".locked-cell");
  lockedCells.forEach((cell) => {
    cell.classList.toggle("locked-cell");
  });

  // Iterate the levels DataBase
  for (let storedValue in levels[level].cellValues) {
    // Getting the cellID and the Cell value out of the DataBase
    const cellID = levels[level].cellValues[storedValue].cellID;
    const cellValue = levels[level].cellValues[storedValue].cellValue;

    // Setting the values to the sub-cells
    setCellValue(boardData, cellID, cellValue);

    // Locking the level's sub-cells
    const subCellDiv = document.getElementById(`${cellID}`);
    subCellDiv.classList.add("locked-cell");
  }

  // Setting the level Propereties to the Header
  const levelDiff = document.querySelector(".level-difficulty");
  levelDiff.textContent = `Difficulty: ${levels[level].difficulty}`;

  // Updating the Game Board HTML
  boardDataRefresh(boardData);

  // Success messege to the console
  console.log(`Loaded Level ${level} succesfully`);

  return (gameBoard = boardData), clickedCellDiv;
}

function boardDataRefresh(boardData) {
  /*
   BOARD DATA REFRESH FUNCTION:
   - Inputs: gameBoard (Arr)
   - Getting the Game Board Array and converting it into HTML
  */

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // iterate every cell in a 9X9 board stracture (3 lists of 3 cells each)
      // Storing the Big cell values
      const cell = boardData[i][j];

      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          // iterate every cell in a 9X9 cell stracture (3 lists of 3 sub-cells each)
          // Getting the sub-cell ID
          const subCell = document.getElementById(`${i}-${j}-${x}-${y}`);
          // Changing the sub-cell content by the sub-cell content stored in the array
          subCell.textContent = cell.subGrid[x][y];
        }
      }
    }
  }
  // Checking the board for game logic mistakes
  BoardCheck(boardData);
}

function setCellValue(boardData, subCellID, newValue) {
  /*
   BOARD SET CELL VALUE FUNCTION:
   - Inputs: gameBoard (Arr), SubCellID ("X-X-X-X" / "boardRow-boardlCol-cellRow-cellCol"), newValue (int)
   - Translate the Game cell HTML ID's to the Array
   - Changing the sub-cells data in the Array accordingly
  */

  // Changing the sub-cell Value
  boardData[subCellID[0]][subCellID[2]].subGrid[subCellID[4]][subCellID[6]] =
    newValue;
}

function boardClick(subCellID) {
  /*
   BOARD CLICK FUNCTION:
   - Inputs: SubCellID ("X-X-X-X" / "boardRow-boardlCol-cellRow-cellCol")
   - Handle the user board clicks, Choosing the sub-cell selected by the user
   - Know to Handle a scenario when the user trying to select a locked cell
  */

  // Getting the sub-cell Clicked DIV by it's ID
  clickedCellDiv = document.getElementById(`${subCellID}`);
  // Getting the sub-cell Choosed DIV by it's ID
  choosedCellDiv = document.querySelector(".choosed-cell");

  // Checking if there is alredy a choosed cell
  if (choosedCellDiv !== null) {
    // Removing the choosed cell class from the old one selected
    choosedCellDiv.classList.remove("choosed-cell");
  }

  clickedCellDiv.classList.add("choosed-cell");
  // updating choosedCellDiv
  choosedCellDiv = document.querySelector(".choosed-cell");

  return clickedCellDiv, choosedCellDiv;
}

// Handle the user keyboard inputs
document.addEventListener("keydown", (event) => {
  // Checks if there is a cell selected
  if (!clickedCellDiv) return;

  // Checks if the key pressed is an arrow key
  if (
    event.key == "ArrowDown" ||
    event.key == "ArrowUp" ||
    event.key == "ArrowLeft" ||
    event.key == "ArrowRight"
  ) {
    const arrowKey = event.key;
    return keyboardNavigation(arrowKey);

    // Checks if the cell selected is a locked cell
  } else if (clickedCellDiv.classList.contains("locked-cell") == true) {
    console.log("Cell lockd, can't edit it");
    return;

    // Checks if the key pressed is zero / delete / Backspace
  } else if (
    event.key == "0" ||
    event.key == "Delete" ||
    event.key == "Backspace"
  ) {
    // Removing the value in the sub-cell selected
    setCellValue(gameBoard, clickedCellDiv.id, "");
    boardDataRefresh(gameBoard);
    return;

    // Checks if the key pressed is a number or space
  } else if (isNaN(event.key) || event.key == " ") {
    console.log("Key is not a number");
    return;
  }

  //Assign the key pressed to a const
  const keyPressed = parseInt(event.key);

  // Uses the setCellValue function to change the value in that selected cell
  setCellValue(gameBoard, clickedCellDiv.id, keyPressed);
  boardDataRefresh(gameBoard);
});

function keyboardNavigation(arrowKey) {
  /*
   KEYBOARD NAVIGATION FUNCTION:
   - Inputs: Selected cell, arrow key pressed
   - Takes the user keyboard arrows pressing the changing the selected cell on the board accordingly
   - Know to Handle a scenario when the user trying to select a locked cell
  */

  // Converting the ClickedCellID to a 4 digit number (XXXX)
  const ClickedCellID =
    clickedCellDiv.id[0] +
    clickedCellDiv.id[2] +
    clickedCellDiv.id[4] +
    clickedCellDiv.id[6];

  // Convert to number
  let num = parseInt(ClickedCellID, 10);

  if (arrowKey == "ArrowRight") {
    // Adding 1 to ID if its right key
    num = num + 1;
  } else if (arrowKey == "ArrowLeft") {
    // Substruct 1 to ID if its left key
    num = num - 1;
  } else if (arrowKey == "ArrowDown") {
    // Adding 10 to ID if its down key
    num = num + 10;
  } else if (arrowKey == "ArrowUp") {
    // Substruct 10 to ID if its up key
    num = num - 10;
  }

  // Handle cell Skipping
  // Check if the new number last digit is 3 (for the right closest cell)
  if (num % 10 == 3) {
    num = num + 97;

    // Check if the new number last digit is 9 (for the left closest cell)
  } else if (num % 10 == 9) {
    num = num - 97;

    // Check if the new number third digit is 3 (for the left closest cell)
  } else if (Math.floor((num % 100) / 10) == 3) {
    num = num + 970;

    // Check if the new number third digit is 9 (for the left closest cell)
  } else if (Math.floor((num % 100) / 10) == 9) {
    num = num - 970;
  }

  // Handle Board overflow
  if (
    Math.floor((num % 1000) / 100) == 3 ||
    Math.floor((num % 1000) / 100) == 9 ||
    num < 0 ||
    num > 2999
  ) {
    return;
  }

  // Pad with leading zeros to get the newID
  let newID = num.toString().padStart(ClickedCellID.length, "0");

  // Convert the New cell ID to a valid Cell ID
  newID = `${newID[0]}-${newID[1]}-${newID[2]}-${newID[3]}`;

  // Activate Board click function to adjust the selection accordingly
  boardClick(newID);
}

function BoardCheck(board) {
  // Clean the Board from markers
  const badCellsDivs = document.querySelectorAll(".bad-cell");

  if (badCellsDivs !== null) {
    for (const cell of badCellsDivs) {
      cell.classList.remove("bad-cell");
    }
  }

  // Variables
  let mergedCell = null;
  let badCells = [];

  let mergedCol = [];
  let badCols = [];

  let mergedRow = [];
  let badRows = [];

  // Check for every sub-cell if there is the same number in it's cell
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Merging all Big cells (3X3)
      mergedCell = [
        ...board[i][j].subGrid[0],
        ...board[i][j].subGrid[1],
        ...board[i][j].subGrid[2],
      ];
      mergedCell = mergedCell.filter((empty) => empty !== ""); // Removing empty cells
      mergedCell = mergedCell.filter((empty) => empty !== null); // Removing null cells
      if (new Set(mergedCell).size !== mergedCell.length) {
        // Checks if the set and the array has the same length
        badCells.push(`${i}-${j}`);
      }
    }
  }
  // Check for every sub-cel if there is the same number in it's column
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          mergedCol.push(board[x][i].subGrid[y][j]);
        }
      }
      mergedCol = mergedCol.filter((empty) => empty !== ""); // Removing empty cells
      mergedCol = mergedCol.filter((empty) => empty !== null); // Removing null cells
      if (new Set(mergedCol).size !== mergedCol.length) {
        // Checks if the set and the array has the same length
        badCols.push(`${i}-${j}`);
      }
      mergedCol = [];
    }
  }

  // Check for every sub-cel if there is the same number in it's row
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
          mergedRow.push(board[j][x].subGrid[i][y]);
        }
      }
      mergedRow = mergedRow.filter((empty) => empty !== ""); // Removing empty cells
      mergedRow = mergedRow.filter((empty) => empty !== null); // Removing empty cells
      if (new Set(mergedRow).size !== mergedRow.length) {
        // Checks if the set and the array has the same length
        badRows.push(`${i}-${j}`);
      }
      mergedRow = [];
    }
  }

  // Sum up the mistakes in the board
  if (badRows.length > 0 || badCells.length > 0 || badCols.length > 0) {
    mistakeFlag = 1;
    console.log("Mistake Detected!");
    MistakesMarker(badCells, badCols, badRows);
    return mistakeFlag;
  }
  gameProgress();
  mistakeFlag = null;
  // console.log("Board Check Completed Without Issues");
  return mistakeFlag;
}

function MistakesMarker(badCells = [], badCols = [], badRows = []) {
  // Detect the Bad Cells
  for (const cell of badCells) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const badCellDiv = document.getElementById(`${cell}-${i}-${j}`);
        badCellDiv.classList.add("bad-cell");
      }
    }
  }
  // Detect the Bad Cols
  for (const col of badCols) {
    const firstCellID = `0-${col[0]}-0-${col[2]}`; // uses the right placement for first cell-ID

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const badCellDiv = document.getElementById(
          `${i}-${firstCellID[2]}-${j}-${firstCellID[6]}`
        );
        badCellDiv.classList.add("bad-cell");
      }
    }
  }

  // Detect the Bad Rows
  for (const row of badRows) {
    const firstCellID = `${row[2]}-0-${row[0]}-0`; // uses the right placement for first cell-ID
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const badCellDiv = document.getElementById(
          `${firstCellID[0]}-${i}-${firstCellID[4]}-${j}`
        );
        badCellDiv.classList.add("bad-cell");
      }
    }
  }
}

function dropdownList() {
  // Get an array of the levels available in the levelData file
  const levelObj = Object.values(levels);
  const levelNames = levelObj.map((level) => level.name);

  // Get the dropdowns from the document
  const dropdowns = document.querySelectorAll(".dropdown");

  // Loop through all dropdowns elements and get their classes to the DOM
  dropdowns.forEach((dropdown) => {
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const selected = dropdown.querySelector(".selected");

    // implement level's name inside the selection box as divs
    levelNames.forEach((level) => {
      const levelName = document.createElement("li");
      levelName.textContent = level;
      menu.appendChild(levelName);
    });

    // stores all the options in the dropdown menu
    const options = dropdown.querySelectorAll(".menu li");

    // Add click Event to the select element
    select.addEventListener("click", () => {
      //Add the click select styles to the select element
      select.classList.toggle("select-clicked");
      //Add the rotate style to the caret element
      caret.classList.toggle("caret-rotate");
      // Add the open styles to the menu element
      menu.classList.toggle("menu-open");
    });

    // loop through all options elements
    options.forEach((option) => {
      // Add a click event to the option element
      option.addEventListener("click", () => {
        // Change selected inner text to clicked option inner text
        selected.innerText = option.innerText;
        // Add the clicked select styles to the select element
        select.classList.toggle("select-clicked");
        // Add the rotate styles to the caret element
        caret.classList.toggle("caret-rotate");
        // Remove the open styles to the menu element
        menu.classList.toggle("menu-open");
        // remove active class from all option elements
        options.forEach((option) => {
          option.classList.remove("active");
        });
        // Add active Class to the selected Option
        option.classList.toggle("active");

        // Load the new level to the board

        // find the level selected inside the level's object and find the right level's key to load
        const levelSelected = Object.entries(levels).find(
          ([keyLevel, level]) => level.name === option.textContent
        );

        boardLevelLoader(levelSelected[0], gameBoard);
      });
    });
  });
}

function gameProgress() {
  const progressBar = document.querySelector(".game-progress");
  const lockedCells = document.querySelectorAll(".locked-cell");
  const emptySubCells = Array.from(
    document.querySelectorAll(".sub-cell")
  ).filter((div) => {
    return div.textContent.trim() === "";
  });

  // Game progress calcuation
  const whole = 81 - lockedCells.length;
  const fullSubCells = 81 - emptySubCells.length;
  const gameProgress = (fullSubCells - lockedCells.length) / whole;

  progressBar.textContent = `Progress: ${(gameProgress * 100).toFixed(0)}%`;

  // Checking if board is full >> Game over
  if (emptySubCells.length == 0) {
    console.log("game Over!");

    progressBar.textContent = "You won the game! 🎉";

    // Make it rain 🎉
    confetti({
      particleCount: 800,
      spread: 1600,
      origin: { y: -0.3 },
    });
  }
}

function autoSolver(board) {
  // Getting into an array the empty sub-cells
  const emptySubCells = Array.from(
    document.querySelectorAll(".sub-cell")
  ).filter((div) => div.textContent.trim() === "");

  // Initial values
  let i = 0;
  let cellValue = null;
  let solved = null;

  // Looping every sub Cell and assign a it a number
  while (i < emptySubCells.length) {
    // access every sub-cell by its index, so I can change it later
    const subCell = emptySubCells[i];

    // Check if the sub-cell already has a value assign
    if (subCell.textContent === "") {
      cellValue = 1;
    } else {
      cellValue = parseInt(subCell.textContent) + 1;
    }

    console.log(`sub-cell ${i} trying value ${cellValue}`);
    solved = false;

    while (cellValue <= 9) {
      // Setting the value to the cell selected and refresh the game board
      setCellValue(board, subCell.id, cellValue);
      // If there is a mistake, the mistakeFlag will turn on after the refresh
      boardDataRefresh(gameBoard);

      // No mistake
      if (!mistakeFlag) {
        // valid value found, stop trying
        solved = true;
        break;
      }

      // There is a mistake
      console.log(`mistake at sub-cell ${i}, value ${cellValue}`);
      // Trying next value
      cellValue++;
    }

    if (solved) {
      // moving on to the next cell
      i++;
      console.log(`success ${i} out of ${emptySubCells.length}`);
    } else {
      // sub-cell value can't be higher than 9 => need to go back to previous index!
      // clear current cell and refresh for the refresh flag to be off
      setCellValue(board, subCell.id, null);
      boardDataRefresh(gameBoard);

      // go back one cell
      i--;
      console.log(`couldn't fix sub-cell. back to ${i}`);
    }
  }
  console.log(`Board solved Successfully!`);
}
