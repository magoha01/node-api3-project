const express = require("express");
//const morgan = require("morgan");
//const cors = require("cors");
const { logger } = require("./middleware/middleware");
const server = express();
const usersRouter = require("./users/users-router");

server.use(express.json());

server.use(logger);
//server.use(cors());
//server.use(morgan("tiny"));
server.use("/api/users", usersRouter);
// global middlewares and the user's router need to be connected here

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
