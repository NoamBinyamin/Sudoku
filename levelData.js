/*
  FIRST CELL TEMPLATE
      { cellID: "0-0-0-0", cellValue: 1 },
      { cellID: "0-0-0-1", cellValue: 2 },
      { cellID: "0-0-0-2", cellValue: 3 },
      { cellID: "0-0-1-0", cellValue: 4 },
      { cellID: "0-0-1-1", cellValue: 5 },
      { cellID: "0-0-1-2", cellValue: 6 },
      { cellID: "0-0-2-0", cellValue: 7 },
      { cellID: "0-0-2-1", cellValue: 8 },
      { cellID: "0-0-2-2", cellValue: 9 },
*/

// Cell ID: ("X-X-X-X" / "boardRow-boardlCol-cellRow-cellCol")

const levels = {
  1: {
    name: "Level 1",
    difficulty: "Easy 😎",
    cellValues: [
      // FIRST ROW
      //CELL-1
      { cellID: "0-0-0-0", cellValue: 3 },
      { cellID: "0-0-0-2", cellValue: 4 },
      { cellID: "0-0-1-2", cellValue: 2 },
      { cellID: "0-0-2-1", cellValue: 1 },
      { cellID: "0-0-2-2", cellValue: 9 },
      //CELL-2
      { cellID: "0-1-1-1", cellValue: 4 },
      { cellID: "0-1-1-2", cellValue: 9 },
      { cellID: "0-1-2-0", cellValue: 2 },
      //CELL-3
      { cellID: "0-2-0-1", cellValue: 2 },
      { cellID: "0-2-0-2", cellValue: 9 },
      { cellID: "0-2-1-1", cellValue: 5 },
      { cellID: "0-2-1-2", cellValue: 8 },
      { cellID: "0-2-2-0", cellValue: 3 },
      // SECOND ROW
      //CELL-1
      { cellID: "1-0-0-0", cellValue: 2 },
      { cellID: "1-0-1-1", cellValue: 7 },
      { cellID: "1-0-1-2", cellValue: 8 },
      { cellID: "1-0-2-0", cellValue: 9 },
      { cellID: "1-0-2-1", cellValue: 3 },
      //CELL-2
      { cellID: "1-1-0-0", cellValue: 6 },
      { cellID: "1-1-0-1", cellValue: 8 },
      { cellID: "1-1-0-2", cellValue: 3 },
      { cellID: "1-1-1-1", cellValue: 1 },
      { cellID: "1-1-2-0", cellValue: 4 },
      //CELL-3
      { cellID: "1-2-0-2", cellValue: 1 },
      { cellID: "1-2-2-1", cellValue: 6 },
      { cellID: "1-2-2-2", cellValue: 5 },
      // THIRD ROW
      //CELL-1
      { cellID: "2-0-0-1", cellValue: 8 },
      { cellID: "2-0-1-0", cellValue: 4 },
      { cellID: "2-0-1-2", cellValue: 7 },
      { cellID: "2-0-2-0", cellValue: 1 },
      { cellID: "2-0-2-1", cellValue: 2 },
      //CELL-2
      { cellID: "2-1-0-0", cellValue: 7 },
      { cellID: "2-1-0-1", cellValue: 6 },
      { cellID: "2-1-1-2", cellValue: 2 },
      //CELL-3
      { cellID: "2-2-0-1", cellValue: 1 },
      { cellID: "2-2-0-2", cellValue: 2 },
      { cellID: "2-2-1-0", cellValue: 5 },
      { cellID: "2-2-2-1", cellValue: 3 },
    ],
  },
  2: {
    name: "Level 2",
    difficulty: "Medium 🧐",
    cellValues: [
      // FIRST ROW
      //CELL-1
      { cellID: "0-0-0-1", cellValue: 8 },
      { cellID: "0-0-0-2", cellValue: 9 },
      { cellID: "0-0-2-0", cellValue: 6 },
      { cellID: "0-0-2-1", cellValue: 1 },
      //CELL-2
      { cellID: "0-1-0-1", cellValue: 6 },
      { cellID: "0-1-1-0", cellValue: 5 },
      //CELL-3
      { cellID: "0-2-1-2", cellValue: 8 },
      { cellID: "0-2-2-0", cellValue: 9 },
      { cellID: "0-2-2-1", cellValue: 3 },
      // SECOND ROW
      //CELL-1
      { cellID: "1-0-1-0", cellValue: 1 },
      { cellID: "1-0-2-2", cellValue: 4 },
      //CELL-2
      { cellID: "1-1-0-0", cellValue: 4 },
      { cellID: "1-1-0-1", cellValue: 3 },
      { cellID: "1-1-1-1", cellValue: 9 },
      { cellID: "1-1-2-0", cellValue: 6 },
      //CELL-3
      { cellID: "1-2-0-1", cellValue: 7 },
      { cellID: "1-2-0-2", cellValue: 9 },
      { cellID: "1-2-2-0", cellValue: 8 },
      { cellID: "1-2-2-1", cellValue: 5 },
      // THIRD ROW
      //CELL-1
      { cellID: "2-0-0-0", cellValue: 3 },
      { cellID: "2-0-1-1", cellValue: 9 },
      { cellID: "2-0-1-2", cellValue: 7 },
      { cellID: "2-0-2-0", cellValue: 5 },
      { cellID: "2-0-2-1", cellValue: 4 },
      { cellID: "2-0-2-2", cellValue: 1 },
      //CELL-2
      { cellID: "2-1-0-1", cellValue: 5 },
      { cellID: "2-1-0-2", cellValue: 7 },
      { cellID: "2-1-1-1", cellValue: 4 },
      { cellID: "2-1-1-2", cellValue: 6 },
      { cellID: "2-1-2-1", cellValue: 2 },
      { cellID: "2-1-2-2", cellValue: 8 },
      //CELL-3
      { cellID: "2-2-1-0", cellValue: 5 },
      { cellID: "2-2-1-1", cellValue: 2 },
      { cellID: "2-2-1-2", cellValue: 3 },
      { cellID: "2-2-2-1", cellValue: 9 },
      { cellID: "2-2-2-2", cellValue: 6 },
    ],
  },
  3: {
    name: "Level 3",
    difficulty: "Hard 🤯",
    cellValues: [
      // FIRST ROW
      //CELL-1
      { cellID: "0-0-1-0", cellValue: 1 },
      { cellID: "0-0-1-1", cellValue: 9 },
      { cellID: "0-0-2-1", cellValue: 6 },
      { cellID: "0-0-2-2", cellValue: 3 },
      //CELL-2
      { cellID: "0-1-1-1", cellValue: 4 },
      { cellID: "0-1-2-2", cellValue: 7 },
      //CELL-3
      { cellID: "0-2-0-0", cellValue: 9 },
      { cellID: "0-2-1-2", cellValue: 7 },
      { cellID: "0-2-2-0", cellValue: 2 },
      { cellID: "0-2-2-1", cellValue: 5 },
      // SECOND ROW
      //CELL-1
      { cellID: "1-0-0-2", cellValue: 2 },
      { cellID: "1-0-1-1", cellValue: 5 },
      { cellID: "1-0-1-2", cellValue: 8 },
      { cellID: "1-0-2-0", cellValue: 6 },
      { cellID: "1-0-2-1", cellValue: 7 },
      //CELL-2
      { cellID: "1-1-0-0", cellValue: 6 },
      { cellID: "1-1-0-1", cellValue: 8 },
      { cellID: "1-1-2-0", cellValue: 2 },
      { cellID: "1-1-2-1", cellValue: 1 },
      { cellID: "1-1-2-2", cellValue: 9 },
      //CELL-3
      { cellID: "1-2-1-1", cellValue: 6 },
      // THIRD ROW
      //CELL-1
      { cellID: "2-0-0-0", cellValue: 5 },
      { cellID: "2-0-0-2", cellValue: 6 },
      { cellID: "2-0-2-0", cellValue: 4 },
      { cellID: "2-0-2-1", cellValue: 3 },
      //CELL-2
      { cellID: "2-1-0-2", cellValue: 3 },
      //CELL-3
      { cellID: "2-2-0-1", cellValue: 9 },
      { cellID: "2-2-1-0", cellValue: 3 },
      { cellID: "2-2-2-0", cellValue: 7 },
      { cellID: "2-2-2-2", cellValue: 6 },
    ],
  },
  4: {
    name: "Test Level",
    difficulty: "Test only",
    cellValues: [
      // FIRST ROW
      //CELL-1
      { cellID: "0-0-0-0", cellValue: 1 },
    ],
  },
};

export default levels;
