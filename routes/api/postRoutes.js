const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models");
const Post = require('../../models/Post')
const mongoose = require('mongoose');
const multer = require('multer');
const path =require('path');
const authMiddleware = require("../../config/middleware/authMiddleware");





//
//authMiddleware.isLoggedIn
router.get('/create',authMiddleware.isLoggedIn,(req,res)=>{
        res.render('create');
})
//finds all files
router.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
  
      // Files exist
      return res.json(files);
    });
  });
// /api/post/all
//get all the data info
router.get("/all", authMiddleware.isLoggedIn, function (req, res, next) {
    db.Post.find(req.params.id , (err, post) => {
        res.json(post);
    });
});




//@ display image for testing 
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});
// /api/todos/remove
// removed todo based on id, updates user
router.delete("/remove", authMiddleware.isLoggedIn, function (req, res, next) {
    db.Post.findByIdAndDelete(req.body.id, (err, post) => {
        if (err) throw err;
        db.User.findByIdAndUpdate(post._id, { $pull: { 'post': post._id } }, { new: true }, (err, user) => {
            if (err) throw err;
            res.send(user);
        });
    });
});

// /api/todos/update
// update a todo based on id
router.put("/update", authMiddleware.isLoggedIn, function (req, res, next) {
    db.Post.findByIdAndUpdate(req.body.id, { post: req.body.post }, { new: true }, (err, post) => {
        if (err) throw err;
        res.json(post);
    });
});

module.exports = router;