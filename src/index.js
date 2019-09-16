#!/bin/node

import { adjustDifficulty, generateSudokuBoard, DIFFICULTIES } from "./sudoku";

const express = require("express");
const mustacheExpress = require("mustache-express");
const cors = require("cors");
const app = express();

app.use(cors());

app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/views");

app.get("/", async (req, res) => {
  const board = adjustDifficulty(generateSudokuBoard(), DIFFICULTIES.easy);
  const [row1, row2, row3, row4, row5, row6, row7, row8, row9] = board;
  res.render("index", {
    row1,
    row2,
    row3,
    row4,
    row5,
    row6,
    row7,
    row8,
    row9
  });
});

const server = app.listen(process.env.PORT || 5000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
