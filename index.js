require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 5000;

/******** middlewares ********/
app.use([
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
  morgan("dev"),
  express.json(),
]);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Life Spring Server is running :)" });
});

app.listen(port, () =>
  console.log(`life spring diagnostic server is running on ${port} port...`)
);
