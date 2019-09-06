#!/bin/node

import {
  generateSudokuBoard,
  adjustDifficulty,
  DIFFICULTIES,
  getNumbersInBox,
  getBoxNumber
} from "../src/sudoku";

import { getRandomList, getRandomInt, getNumbersFromColumn } from "../src/util";

test("adjustDifficulty removes correct amount of numbers [easy]", () => {
  testAdjustDifficulty(DIFFICULTIES.easy, 3, 5);
});

test("adjustDifficulty removes correct amount of numbers [medium]", () => {
  testAdjustDifficulty(DIFFICULTIES.medium, 2, 5);
});

test("adjustDifficulty removes correct amount of numbers [hard]", () => {
  testAdjustDifficulty(DIFFICULTIES.hard, 2, 4);
});

test("getNumbersInBox should return all numbers from specified box", () => {
  const boardWithBoxOne = [
    [1, 8, 4, 0, 0, 0, 0, 0, 0],
    [6, 2, 7, 0, 0, 0, 0, 0, 0],
    [5, 9, 3, 0, 0, 0, 0, 0, 0]
  ];
  const actualBoxOne = getNumbersInBox(boardWithBoxOne, 1);
  expect(actualBoxOne.sort()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const boardWithBoxTwo = [
    [0, 0, 0, 1, 4, 7, 0, 0, 0],
    [0, 0, 0, 2, 5, 8, 0, 0, 0],
    [0, 0, 0, 3, 6, 9, 0, 0, 0]
  ];
  const actualBoxTwo = getNumbersInBox(boardWithBoxTwo, 2);
  expect(actualBoxTwo.sort()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const boardWithBoxThree = [
    [0, 0, 0, 0, 0, 0, 9, 4, 3],
    [0, 0, 0, 0, 0, 0, 8, 5, 2],
    [0, 0, 0, 0, 0, 0, 7, 6, 1]
  ];
  const actualBoxThree = getNumbersInBox(boardWithBoxThree, 3);
  expect(actualBoxThree.sort()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const boardWithBoxFour = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 4, 7, 0, 0, 0, 0, 0, 0],
    [2, 5, 8, 0, 0, 0, 0, 0, 0],
    [3, 6, 9, 0, 0, 0, 0, 0, 0]
  ];
  const actualBoxFour = getNumbersInBox(boardWithBoxFour, 4);
  expect(actualBoxFour.sort()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const boardWithBoxFive = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 4, 7, 0, 0, 0],
    [0, 0, 0, 2, 5, 8, 0, 0, 0],
    [0, 0, 0, 3, 6, 9, 0, 0, 0]
  ];
  const actualBoxFive = getNumbersInBox(boardWithBoxFive, 5);
  expect(actualBoxFive.sort()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const boardWithBoxSix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 9, 4, 3],
    [0, 0, 0, 0, 0, 0, 8, 5, 2],
    [0, 0, 0, 0, 0, 0, 7, 6, 1]
  ];
  const actualBoxSix = getNumbersInBox(boardWithBoxSix, 6);
  expect(actualBoxSix.sort()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const boardWithBoxSeven = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 4, 7, 0, 0, 0, 0, 0, 0],
    [2, 5, 8, 0, 0, 0, 0, 0, 0],
    [3, 6, 9, 0, 0, 0, 0, 0, 0]
  ];
  const actualBoxSeven = getNumbersInBox(boardWithBoxSeven, 7);
  expect(actualBoxSeven.sort()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const boardWithBoxEight = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0, 0],
    [0, 0, 0, 4, 5, 6, 0, 0, 0],
    [0, 0, 0, 7, 8, 9, 0, 0, 0]
  ];
  const actualBoxEight = getNumbersInBox(boardWithBoxEight, 8);
  expect(actualBoxEight.sort()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const boardWithBoxNine = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 2, 3],
    [0, 0, 0, 0, 0, 0, 4, 5, 6],
    [0, 0, 0, 0, 0, 0, 7, 8, 9]
  ];
  const actualBoxNine = getNumbersInBox(boardWithBoxNine, 9);
  expect(actualBoxNine.sort()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const boardWithBoxOneWithMissingValues = [[1, 2, 3], [4]];
  const actualBoxOneWithMissingValues = getNumbersInBox(
    boardWithBoxOneWithMissingValues,
    1
  );
  expect(actualBoxOneWithMissingValues.sort()).toStrictEqual([1, 2, 3, 4]);

  const boardWithBoxNineWithMissingValues = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 2, 3],
    [0, 0, 0, 0, 0, 0, 4, 5],
    [0, 0, 0, 0, 0, 0]
  ];
  const actualBoxNineWithMissingValues = getNumbersInBox(
    boardWithBoxNineWithMissingValues,
    9
  );
  expect(actualBoxNineWithMissingValues.sort()).toStrictEqual([1, 2, 3, 4, 5]);
});

test("getBoxNumber should return correct box number for input", () => {
  // Boxes 1-3
  const actualOne = getBoxNumber(0, 0);
  expect(actualOne).toBe(1);

  const actualTwo = getBoxNumber(3, 1);
  expect(actualTwo).toBe(2);

  const actualThree = getBoxNumber(6, 2);
  expect(actualThree).toBe(3);

  // Boxes 4-6
  const actualFour = getBoxNumber(0, 3);
  expect(actualFour).toBe(4);

  const actualFive = getBoxNumber(3, 4);
  expect(actualFive).toBe(5);

  const actualSix = getBoxNumber(6, 5);
  expect(actualSix).toBe(6);

  // Boxes 7-9
  const actualSeven = getBoxNumber(0, 6);
  expect(actualSeven).toBe(7);

  const actualEight = getBoxNumber(3, 7);
  expect(actualEight).toBe(8);

  const actualNine = getBoxNumber(6, 8);
  expect(actualNine).toBe(9);
});

test("generateSudokuBoard should not generate duplicate numbers in same 3x3 box", () => {
  const board = generateSudokuBoard();

  function getThreeColumnsFromRow(i) {
    const result = [];
    result.push(board[i][0]);
    result.push(board[i][1]);
    result.push(board[i][2]);

    return result;
  }

  const row1 = getThreeColumnsFromRow(0);
  const row2 = getThreeColumnsFromRow(1);
  const row3 = getThreeColumnsFromRow(2);

  const actual = [].concat(row1, row2, row3);
  expect(actual.sort()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

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

const testAdjustDifficulty = (difficulty, min, max) => {
  const board = generateSudokuBoard();
  const actualAdjustedBoard = adjustDifficulty(board, difficulty);

  // Check all rows so that they don't contain more than min-max
  for (let i = 0; i < actualAdjustedBoard.length; i++) {
    // Filter out empty values
    const row = actualAdjustedBoard[i].filter(s => s !== "");
    expect(row.length).not.toBeLessThan(min);
    expect(row.length).not.toBeGreaterThan(max);
  }
};
