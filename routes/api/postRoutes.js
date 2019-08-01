const router = require("express").Router();
const passport = require("../../config/passport");
const Post = require('../../models/Post')
const mongoose = require('mongoose');
const multer = require('multer');
const path =require('path');
const authMiddleware = require("../../config/middleware/authMiddleware");

//EJS CREATE POST
//authMiddleware.isLoggedIn
router.get('/create',authMiddleware.isLoggedIn,(req,res)=>{
        res.render('create',{ ERROR: req.flash('ERROR') });
})
///api/post/all
//landing page /@ALL POST 
router.get("/all", function (req, res, next) {
    Post.find(req.params.id , (err, post) => {
        res.json(post);
    });
});

//@ display image for testing 
//REACT oneItem
router.get('/all/:id', (req, res) => {
  Post.findById(req.params.id ).exec(function(err, foundpost){
    // Check if file
    if (!foundpost || err) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }else{
      res.json(foundpost);
    }
  });
});
//@REACT DELETE REQUESTS
//remove A POSTBYID , authMiddleware.isLoggedIn
router.delete("/remove/:id", function (req, res, next) {
  Post.findByIdAndDelete(req.params.id, (err, post) => {
       if(err){
         console.log(err);
       }else{
         res.send('deleted');
       }
      
    });
});

//@UPDATE REQUEST FOR A POST ONLY description,title, NONimage related
//, authMiddleware.isLoggedIn
router.post("/update/:id",(req, res)=> {
Post.findById(req.params.id, (err, post) => {
        if (!post)
           res.status(404).json(`cant updated NO POST FOUND.`);
        else
          post.title = req.body.title;
          post.description =req.body.description;
          
          console.log(post);
          post.save().then(doc=>{
            if(doc){
                 res.status(200).send(`post is update ${doc}`);

              }else{
                res.status(404).json({message:"icouldnot update anything"})

              }
          })
          .catch(err=>{
            res.status(500).send(`update Not Possible ${err}`);
          })
         });
});
router.patch('/:id',(req,res,next)=>{
    const id =req.params.id;
    const updateOps={};
    
    for(const ops of req.body){
      updateOps[ops.propName] = ops.value
    }
    //[{"PROPNAME":----,"VALUE":-----}]
  
    Item.update({ _id:id},{$set:updateOps})
    .exec()
    .then(doc=>{
      console.log(doc)
      if(doc){
        res.status(200).json(doc)
      }else{
        res.status(404).json({message:"icouldnot update anything"})
      }
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({error:err})
    })
  })

module.exports = router;