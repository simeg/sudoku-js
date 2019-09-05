#!/bin/node

import { getRandomList, getRandomInt, getNumbersFromColumn } from "./util.js";

const DIFFICULTIES = Object.freeze({ easy: 1, medium: 2, hard: 3 });

const filterNonValues = (list, i) => {
  return list[i].filter(s => s !== "");
};

const adjustDifficulty = (board, difficulty) => {
  let min, max;
  switch (difficulty) {
    case DIFFICULTIES.easy:
      min = 3;
      max = 5;
      break;
    case DIFFICULTIES.medium:
      // TODO
      min = 3;
      max = 5;
      break;
    case DIFFICULTIES.hard:
      // TODO
      min = 3;
      max = 5;
      break;
    default:
      console.error("Unknown difficulty", difficulty);
  }

  for (let i = 0; i < board.length; i++) {
    const howManyThereShouldBeLeftInRow = getRandomInt(min, max);

    while (filterNonValues(board, i).length !== howManyThereShouldBeLeftInRow) {
      const indexToRemove = getRandomInt(0, 8);
      board[i][indexToRemove] = "";
    }
  }

  return board;
};

const getNumbersInBox = (board, number) => {
  let startColumn, maxColumn, startRow, maxRow;
  switch (number) {
    case 1:
      startColumn = 0;
      maxColumn = 2;

      startRow = 0;
      maxRow = 2;
      break;
    case 2:
      startColumn = 3;
      maxColumn = 5;

      startRow = 0;
      maxRow = 2;
      break;
    case 3:
      startColumn = 6;
      maxColumn = 8;

      startRow = 0;
      maxRow = 2;
      break;
    case 4:
      startColumn = 0;
      maxColumn = 2;

      startRow = 3;
      maxRow = 5;
      break;
    case 5:
      startColumn = 3;
      maxColumn = 5;

      startRow = 3;
      maxRow = 5;
      break;
    case 6:
      startColumn = 6;
      maxColumn = 8;

      startRow = 3;
      maxRow = 5;
      break;
    case 7:
      startColumn = 0;
      maxColumn = 2;

      startRow = 6;
      maxRow = 8;
      break;
    case 8:
      startColumn = 3;
      maxColumn = 5;

      startRow = 6;
      maxRow = 8;
      break;
    case 9:
      startColumn = 6;
      maxColumn = 8;

      startRow = 6;
      maxRow = 8;
      break;
  }

  const result = [];
  for (let i = startRow; i <= maxRow; i++) {
    for (let j = startColumn; j <= maxColumn; j++) {
      if (board[i] && board[i][j]) {
        const number = board[i][j];
        if (!!number) {
          result.push(number);
        }
      }
    }
  }

  return result;
};

const getBoxNumber = (columnN, rowN) => {
  const isFirstBox = columnN < 3 && rowN < 3;
  const isSecondBox = columnN >= 3 && columnN < 6 && rowN < 3;
  const isThirdBox = columnN >= 6 && rowN < 3;

  const isFourthBox = columnN < 3 && (rowN >= 3 && rowN < 6);
  const isFifthBox = columnN >= 3 && columnN < 6 && (rowN >= 3 && rowN < 6);
  const isSixthBox = columnN >= 6 && (rowN >= 3 && rowN < 6);

  const isSeventhBox = columnN < 3 && rowN >= 6;
  const isEighthBox = columnN >= 3 && columnN < 6 && rowN >= 6;
  const isNinthBox = columnN >= 6 && rowN >= 6;

  if (isFirstBox) {
    return 1;
  } else if (isSecondBox) {
    return 2;
  } else if (isThirdBox) {
    return 3;
  } else if (isFourthBox) {
    return 4;
  } else if (isFifthBox) {
    return 5;
  } else if (isSixthBox) {
    return 6;
  } else if (isSeventhBox) {
    return 7;
  } else if (isEighthBox) {
    return 8;
  } else if (isNinthBox) {
    return 9;
  }
};

const generateSudokuBoard = () => {
  let board = [];

  // Create columns
  while (board.length < 9) {
    board.push([]);
  }

  // First column can be in any order
  board[0] = getRandomList();

  let bigTries = 0;

  for (let rowN = 1; rowN < 9; rowN++) {
    let bucket = getRandomList();
    let columnN = 0;
    let tries = 0;

    let boxNumber = 0;
    let numbersInBox = [];
    let unavailableNumbers = [];
    let columnNumbers = [];

    while (bucket.length > 0) {
      // If enough failures - reset everything and try again
      if (bigTries > 50) {
        board = [];
        bucket = getRandomList();
        while (board.length < 9) {
          board.push([]);
        }
        board[0] = getRandomList();
        columnN = 0;
        tries = 0;
        bigTries = 0;
        rowN = 1;
      }
      boxNumber = getBoxNumber(columnN, rowN);
      numbersInBox = getNumbersInBox(board, boxNumber);
      columnNumbers = getNumbersFromColumn(columnN, board);
      unavailableNumbers = [...new Set(numbersInBox.concat(columnNumbers))];

      let nextNumber = 0;
      while (nextNumber === 0) {
        let number = bucket.shift();
        if (bucket.length === 0 && unavailableNumbers.includes(number)) {
          bucket = getRandomList();
          board[rowN] = [];
          tries = 0;
          columnN = 0;
          nextNumber = 1;
        } else if (unavailableNumbers.includes(number)) {
          if (tries > 9) {
            bucket = getRandomList();
            board[rowN] = [];
            tries = 0;
            columnN = 0;
            nextNumber = 1;
            bigTries++;
          } else {
            bucket.push(number);
            tries++;
          }
        } else {
          nextNumber = number;
          board[rowN].push(number);
          columnN++;
          tries = 0;
        }
      }
    }
  }

  return board;
};

// console.time("algo");
// for (let i = 0; i < 10; i++) {
//   const board = generateSudokuBoard();
// }
// console.timeEnd("algo");

// const board = generateSudokuBoard();
// console.log(board);

module.exports = {
  generateSudokuBoard,
  adjustDifficulty,
  DIFFICULTIES,
  getNumbersInBox,
  getBoxNumber
};
