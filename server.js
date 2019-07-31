const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors =require('cors');
const multer = require('multer')
const path = require("path")
const crypto =require('crypto');
const PORT = process.env.PORT || 3001;
const colors = require("colors");
const mongoose = require("mongoose");
const routes = require("./routes");
const session = require("express-session");
const methodOverride = require('method-override');
const passport = require("passport");
const logger = require("morgan");
const flash = require('connect-flash');
const authMiddleware = require('./config/middleware/authMiddleware');
const cloudinary = require('cloudinary').v2;
const Post = require('./models/Post')

cloudinary.config({
  cloud_name:'dzyy5uebd',
  api_key:'125433241969574',
  api_secret:'Lagqd7s6BxA-ZAZHGVzMmSAL91w'
});

app.use(methodOverride('_method'));

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(flash())
app.use(cors(corsOptions))
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
// }

app.use(routes);

var storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, callback) {
      callback(null,file.fieldname + '-' + Date.now() + 
        path.extname(file.originalname));
    }
  });

  const upload = multer({
    storage:storage,
    limits:{fileSize:1000000},
    fileFilter:function(req,file,cb){
      checkFileType(file,cb);
    } 
  }).single('image')
  

// check filetype 
 checkFileType = (file,cb) =>{
    //allowed EXT
    const filetypes = /jpeg|jpg|png|gif/;
  //checkEXT
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check Mime
  const mimetype = filetypes.test(file.mimetype);
  
  if(mimetype && extname){
    return cb(null,true);
  }else{
    cb("error:Images only!");
  }
  
  }
  app.post('/upload',authMiddleware.isLoggedIn, (req, res) => {
    upload(req, res, (err) => {
      if(err){
        res.json({
          msg: err
        });
      } else {

        if(req.file == undefined){
          res.json({
            msg: 'Error: No File Selected!'
          });
        } else {
          if(req.file){        
                const filename1=req.file.filename    
                var image = {filename:filename1}
                var description = req.body.description;
                var title = req.body.title;
                var author = {id:req.user._id,username:req.user.username}
                var newPost = {image:image,author:author,description:description,title:title}
                Post.create(newPost,(err,newpost)=>{
                    if(err){
                      console.log(err);
                    }else{
                      console.log(newpost);
                      console.log('=====');
                      console.log(req.file);
                      res.redirect('http://localhost:3000');
                    }
                })
          }
        }
      }
    });
  });

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://jonathanx99x:jonathan2015@cluster0-3psxk.mongodb.net/reacttest?retryWrites=true&w=majority", { useNewUrlParser: true }, function(err) {
    if (err) throw err;
    console.log(`mongoose connection successful`.yellow);
    app.listen(PORT, (err)=> {
        if (err) throw err;
        console.log(`connected on port ${PORT}`.cyan)
    });
});



