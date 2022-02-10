const express = require("express");

const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

// You will need `users-model.js` and `posts-model.js` both
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
// The middleware functions also need to be required

const router = express.Router();

router.get("/", (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then((allUsers) => {
      res.status(200).json(allUsers);
    })
    .catch(next);
});

router.get("/:id", validateUserId, (req, res) => {
  // this needs a middleware to verify user id
  // RETURN THE USER OBJECT
  res.json(req.user);
});

router.post("/", validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert({ name: req.name })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    //UNNECESSARY FUNCTION WRAPPING => THIS IS THE EQUIVALENT OF '.catch(next)'
    .catch((err) => {
      next(err);
    });
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, { name: req.name })
    .then(() => {
      return Users.getById(req.params.id)
    })
    .then((user) => {
      res.json(user)
    })
    .catch(next);
});

router.delete("/:id", validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  console.log(req.user);
});

//this needs a middleware to verify user id

router.get("/:id/posts", validateUserId, (req, res) => {
  console.log(req.user);
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  console.log(req.user);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "something bad happened inside posts router",
    message: err.message,
    stack: err.stack,
  });
});

// do not forget to export the router
module.exports = router;
