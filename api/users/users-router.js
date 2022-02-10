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

router.get("/:id", validateUserId, (req, res, next) => {
  // this needs a middleware to verify user id
  // RETURN THE USER OBJECT
  res.json(req.user);
  // Users.getById(req.params.id)
  //   .then((user) => {
  //     if (!user) {
  //       res.status(404).json({
  //         message: "user not found",
  //       });
  //     } else {
  //       res.json(user);
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       message: " The user could not be retrieved",
  //       error: err.message,
  //     });
  //   });
});

router.post("/", (req, res) => {
  if (!req.body.name) {
    res.status(400).json({
      message: "missing required name field",
    });
  } else {
    Users.insert(req.body)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
          error: err.message,
        });
      });
  }
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (!id) {
    res.status(404).json({
      message: "user not found",
    });
  } else if (!body.name) {
    res.status(400).json({
      message: "missing required name field",
    });
  } else {
    Users.update(id, body)
      .then((updatedUser) => {
        if (updatedUser) {
          res.status(200).json(updatedUser);
        } else {
          res.status(404).json({ message: "user not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "The post information could not be modified",
          error: err.message,
        });
      });
  }
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  const deletedUser = Users.getById(req.params.id);
  console.log(deletedUser)
  Users.remove(req.params.id)
    .then(() => {
      res.json(deletedUser);
    })
    .catch(next);
});

try {
const deletedUser = await Users.getById(req.params.id);
if (!deletedUser) {
  next()
  // res.status(404).json({
  //   message: "user not found",
  //});
} else {
await Users.remove(req.params.id);
res.json(deletedUser);
}
} catch(next)
//this needs a middleware to verify user id

router.get("/:id/posts", (req, res) => {
  // const postInfo = { ...req.body, user_id: req.params.id };
  // if (!postInfo) {
  //   res.status(404).json({
  //     message: "post not found",
  //   });
  // } else {
  //   Posts.getById(postInfo.user_id)
  //     .then(() => {
  //       res.json(postInfo);
  //     })
  //     .catch((err) => {
  //       res.status(500).json({
  //         message: " The post could not be retrieved",
  //         error: err.message,
  //       });
  //     });
  // }
  //RETURN THE ARRAY OF USER POSTS
  //this needs a middleware to verify user id
});

// router.post("/:id/posts", (req, res) => {
//   // const postInfo = { ...req.body, hub_id: req.params.id };

//   // Posts.insert(postInfo)
//   //   .then((post) => {
//   //     res.json(post);
//   //   })
//   //   .catch((error) => {
//   //     res.status(500).json({
//   //       message: "Error adding post",
//   //       error: error.message,
//   //     });
//   //   });
//   // RETURN THE NEWLY CREATED USER POST
//   // this needs a middleware to verify user id
//   // and another middleware to check that the request body is valid
// });

// do not forget to export the router
module.exports = router;
