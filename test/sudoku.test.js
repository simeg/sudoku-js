#!/bin/node

import { generateSudokuBoard } from "../src/sudoku";

import { getRandomList, getRandomInt, getNumbersFromColumn } from "../src/util";

test("generateSudokuBoard should generate correctly divided numbers", () => {
  const sudokuBoard = generateSudokuBoard();

  // Test rows
  for (let i = 0; i < sudokuBoard.length; i++) {
    let actual = 0;
    for (let j = 0; j < sudokuBoard.length; j++) {
      actual += sudokuBoard[i][j];
    }

    const expectedSum = 45;
    expect(actual).toEqual(expectedSum);
  }

  // Test columns
  for (let i = 0; i < sudokuBoard.length; i++) {
    let actual = 0;
    for (let j = 0; j < sudokuBoard.length; j++) {
      actual += sudokuBoard[j][i];
    }

    const expectedSum = 45;
    expect(actual).toEqual(expectedSum);
  }
});

test("randomList returns list of 1-9", () => {
  const actual = getRandomList();
  const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  while (expected.length > 0) {
    expect(actual).toContain(expected.pop());
  }

  expect(expected.length).toEqual(0);
});

test("getRandomInt returns random within boundaries", () => {
  for (let i = 0; i < 10; i++) {
    const actual = getRandomInt(i, 10);
    expect(actual).toBeLessThanOrEqual(10);
    expect(actual).toBeGreaterThanOrEqual(i);
  }
});

test("getNumbersFromColumn returns list of all numbers in column N", () => {
  const board = [[5, 4, 7], [1, 5, 9], [2, 6]];

  const actualFirstColumn = getNumbersFromColumn(0, board);
  const actualSecondColumn = getNumbersFromColumn(1, board);
  const actualThirdColumn = getNumbersFromColumn(2, board);

  expect(actualFirstColumn).toEqual([5, 1, 2]);
  expect(actualSecondColumn).toEqual([4, 5, 6]);
  expect(actualThirdColumn).toEqual([7, 9]);
});
