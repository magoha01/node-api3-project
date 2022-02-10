const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const server = express();
const { logger } = require("./middleware/middleware");
const userRouter = require("./users/users-router");

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(cors());
server.use(morgan("tiny"));
server.use("/api/users", userRouter);
// global middlewares and the user's router need to be connected here

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
