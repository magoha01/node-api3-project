const express = require("express");

const {
  validateUserId,
  //validateUser,
  //validatePost,
} = require("../middleware/middleware");

// You will need `users-model.js` and `posts-model.js` both
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
// The middleware functions also need to be required

const router = express.Router();

router.get("/", (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then((allPosts) => {
      res.status(200).json(allPosts);
    })
    .catch(next);
});

router.get("/:id", validateUserId, (req, res) => {
  // this needs a middleware to verify user id
  // RETURN THE USER OBJECT
  res.json(req.user);
});

router.post("/", (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put("/:id", validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
});

//this needs a middleware to verify user id

router.get("/:id/posts", validateUserId, (req, res) => {});

router.post("/:id/posts", validateUserId, (req, res) => {});

// do not forget to export the router
module.exports = router;
