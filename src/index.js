import { generateSudokuBoard } from "./sudoku";

const express = require("express");
const mustacheExpress = require("mustache-express");
const cors = require("cors");
const app = express();

app.use(cors());

app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/views");

app.get("/", async (req, res) => {
  const board = generateSudokuBoard();
  const row1 = board[0];
  const row2 = board[1];
  const row3 = board[2];
  const row4 = board[3];
  const row5 = board[4];
  const row6 = board[5];
  const row7 = board[6];
  const row8 = board[7];
  const row9 = board[8];
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
