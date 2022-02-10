const Users = require("../users/users-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await Users.getById(req.params.id);
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    //CODE HERE
    res.status(500).json({
      message: " problem finding user",
    });
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
