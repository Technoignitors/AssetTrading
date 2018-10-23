const express = require("express");
const router = express.Router();
var Post = require("../../models/post");
const auth = require('../auth');

router.get("/getAllPosts", auth.required, (req, res) => {
  Post.find({}, "title description", function(error, posts) {
    if (error) {
      console.error(error);
    }
    res.send({
      posts: posts
    });
  }).sort({ _id: -1 });
});


router.get("/getPost/:id",auth.required, (req, res) => {
  let id = req.params.id;
  Post.findById(id, "title description", function(error, posts) {
    if (error) {
      console.error(error);
    }
    res.send({
      posts: posts
    });
  }).sort({ _id: -1 });
});

router.post("/createPost", auth.required, (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  var new_post = new Post({
    title: title,
    description: description
  });

  new_post.save(function(error) {
    if (error) {
      console.log(error);
    }
    res.send({
      success: true,
      message: "Post saved successfully!"
    });
  });
});

router.put("/updatePost/:id", auth.required, (req, res) => {
  Post.findById(req.params.id, "title description", function(error, post) {
    if (error) {
      console.error(error);
    }

    post.title = req.body.title;
    post.description = req.body.description;
    post.save(function(error) {
      if (error) {
        console.log(error);
      }
      res.send({
        success: true
      });
    });
  });
});

// Delete a post
router.delete("/deletePost/:id", auth.required, (req, res) => {
  var db = req.db;
  Post.remove(
    {
      _id: req.params.id
    },
    function(err, post) {
      if (err) res.send(err);
      res.send({
        success: true
      });
    }
  );
});

module.exports = router;
