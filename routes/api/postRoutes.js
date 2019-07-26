const router = require("express").Router();
const passport = require("../../config/passport");
const crypto = require('crypto');
const db = require("../../models");
const mongoose = require('mongoose');
const multer = require('multer');
const path =require('path');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const authMiddleware = require("../../config/middleware/authMiddleware");
//
// Gridfs and mongodb file upload 
//create mongo connection 
const mongoURI='mongodb+srv://jonathanx99x:jonathan2015@cluster0-3psxk.mongodb.net/reacttest?retryWrites=true&w=majority'
const conn = mongoose.createConnection(mongoURI);
let gfs;
//init GFS NPm package
conn.once('open',()=>{
 gfs = Grid(conn.db,mongoose.mongo);
 gfs.collection('uploads');
})
// create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
const upload = multer({ storage });

//
//
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
// /api/todos/all
// get all todos from the signed in user
router.get("/all", authMiddleware.isLoggedIn, function (req, res, next) {
    db.Post.find({ author: req.user.id }, (err, post) => {
        res.json(post);
    });
});

// /api/todos/new
// add new todo, update the user to have todo id
//
router.post("/new", authMiddleware.isLoggedIn,upload.array('file',6),(req, res, next) =>{
    res.json({ file: req.file });

    const newPost= new db.Post({
        author: req.user._id,
        post: req.body.post,
        title: req.body.title,
        file: req.body.file
    });
    
    newPost.save((err, newPost) => {
        if (err) throw err;
        db.User.findByIdAndUpdate(req.user.id, { $push: { post: newPost._id } }, (err, user) => {
            if (err) throw err;
            res.send(user);
        });
    });
    res.redirect('/api/post/all');
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