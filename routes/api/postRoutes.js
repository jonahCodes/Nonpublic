const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models");
const authMiddleware = require("../../config/middleware/authMiddleware");

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
router.post("/new", authMiddleware.isLoggedIn, function (req, res, next) {

    const newPost= new db.Post({
        author: req.user._id,
        post: req.body.post
    });
    
    newPost.save((err, newPost) => {
        if (err) throw err;
        db.User.findByIdAndUpdate(req.user.id, { $push: { post: newPost._id } }, (err, user) => {
            if (err) throw err;
            res.send(user);
        });
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