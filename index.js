require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./db/connectDB");

const userRouter = require("./api/user/user");
const test = require("./api/test/test");
const jwtRoute = require("./api/authentication/jsonWebToken");
const cookieParser = require("cookie-parser");

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
  cookieParser(),
]);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Life Spring Server is running :)" });
});

/******** jwt api ********/
app.use(jwtRoute);

/******** user collection api ********/
app.use(userRouter);

/******** test collection ********/
app.use(test);

const main = async () => {
  await connectDB();
  app.listen(port, () =>
    console.log(`life spring diagnostic server is running on ${port} port...`)
  );
};

main();
