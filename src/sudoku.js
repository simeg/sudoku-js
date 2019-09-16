#!/bin/node

import { getRandomList, getRandomInt, getNumbersFromColumn } from "./util.js";

const DIFFICULTIES = Object.freeze({ easy: 1, medium: 2, hard: 3 });

const filterNonValues = (list, i) => {
  return list[i].filter(s => s !== "");
};

/**
 * Removes values based on difficulty param from provided list of numbers
 *
 * @param {list} board - The list of numbers
 * @param difficulty - The difficulty to adjust to
 */

const adjustDifficulty = (board, difficulty) => {
  let min, max;
  switch (difficulty) {
    case DIFFICULTIES.easy:
      min = 3;
      max = 5;
      break;
    case DIFFICULTIES.medium:
      min = 2;
      max = 5;
      break;
    case DIFFICULTIES.hard:
      min = 2;
      max = 4;
      break;
    default:
      console.error("Unknown difficulty:", difficulty);
  }

  // Clone the board param
  const adjustedBoard = [...board];

  for (let i = 0; i < adjustedBoard.length; i++) {
    const howManyThereShouldBeLeftInRow = getRandomInt(min, max);

    while (
      filterNonValues(adjustedBoard, i).length !== howManyThereShouldBeLeftInRow
    ) {
      const indexToRemove = getRandomInt(0, 8);
      adjustedBoard[i][indexToRemove] = "";
    }
  }

  return adjustedBoard;
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

/**
 * Return the box based on the column and row number.
 *
 * Visual representation of the box order:
 *   [1, 2, 3]
 *   [4, 5, 6]
 *   [7, 8, 9]
 * @param {number} columnN - The column number (one-based numbering)
 * @param {number} rowN - The row number (one-based numbering)
 */
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
  let bigTries = 0;

  // Create columns
  while (board.length < 9) {
    board.push([]);
  }

  // First column can be in any order
  board[0] = getRandomList();

  for (let rowN = 1; rowN < 9; rowN++) {
    let bucket = getRandomList();
    let columnN = 0;
    let tries = 0;

    while (bucket.length > 0) {
      if (bigTries > 50) {
        // Algorithm failed and it won't find a solution =>
        // reset entire board and start over
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
      const boxNumber = getBoxNumber(columnN, rowN);
      const numbersInBox = getNumbersInBox(board, boxNumber);
      const columnNumbers = getNumbersFromColumn(columnN, board);
      const unavailableNumbers = [
        ...new Set(numbersInBox.concat(columnNumbers))
      ];

      let shouldTryAgain = true;
      while (shouldTryAgain) {
        const number = bucket.shift();
        if (bucket.length === 0 && unavailableNumbers.includes(number)) {
          // Only one number left and it's not available =>
          // get new bucket of numbers and reset row
          bucket = getRandomList();
          board[rowN] = [];
          tries = 0;
          columnN = 0;
          shouldTryAgain = false;
        } else if (unavailableNumbers.includes(number)) {
          if (tries > 9) {
            // None of numbers in bucket is acceptable =>
            // get new bucket of numbers and reset row
            bucket = getRandomList();
            board[rowN] = [];
            tries = 0;
            columnN = 0;
            shouldTryAgain = false;
            bigTries++;
          } else {
            // Number is already used in column or box
            bucket.push(number);
            tries++;
          }
        } else {
          // Found number that is acceptable
          shouldTryAgain = false;
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
