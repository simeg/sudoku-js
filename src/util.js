#!/bin/node

const getRandomList = () => {
  const list = [];
  while (list.length < 9) {
    const randomInt = getRandomInt(1, 9);
    if (!list.includes(randomInt)) {
      list.push(randomInt);
    }
  }
  return list;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getNumbersFromColumn = (n, board) => {
  const result = [];
  for (let i = 0; i < board.length; i++) {
    let number = board[i][n];
    if (!!number) {
      result.push(number);
    }
  }
  return result;
};

const print = (board) => {
  for (let i = 0; i < board.length; i++) {
    let res = "";
    for (let j = 0; j < board.length; j++) {
      res += board[i][j].toString() + " ";
    }
    console.log(res);
    res = "";
  }
};

module.exports = {
  getRandomList,
  getRandomInt,
  getNumbersFromColumn,
  print,
};
