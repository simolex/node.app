const express = require("express");
const router = express.Router();
const {
  getPost,
  getEditPost,
  editPost,
  deletePost,
  addPost,
  getPosts,
  getAddPost,
} = require("../controllers/post-controller");

router.get("/posts/:id", getPost);
router.delete("/posts/:id", deletePost);
router.get("/add-post", getAddPost);
router.post("/add-post", addPost);
router.get("/edit/:id", getEditPost);
router.put("/edit/:id", editPost);
router.get("/posts", getPosts);

module.exports = router;
