#!/bin/node

import { getRandomList, getNumbersFromColumn } from "./util.js";

const generateSudokuBoard = () => {
  const board = [];

  // Create columns
  while (board.length < 9) {
    board.push([]);
  }

  // First column can be in any order
  board[0] = getRandomList();

  for (let columnN = 0; columnN < 8; columnN++) {
    let bucket = getRandomList();
    let rowN = 0;
    let tries = 0;

    while (bucket.length > 0) {
      let number = bucket.shift();
      // Check ALL columns in position columnN if number has been used
      let columnNumbers = getNumbersFromColumn(rowN, board);

      if (columnNumbers.includes(number)) {
        // If unsolvable case - let's retry this row
        if (tries > bucket.length) {
          bucket = getRandomList();
          board[columnN + 1] = [];
          rowN = 0;
          tries = 0;
        } else {
          // It's already in the column so try again
          bucket.push(number);
          tries++;
        }
      } else {
        // It's not in the column so put it there
        board[columnN + 1].push(number);
        tries = 0;
        rowN++;
      }
    }
  }

  return board;
};

module.exports = {
  generateSudokuBoard
};
