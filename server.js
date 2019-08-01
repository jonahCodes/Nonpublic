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
const Post = require('./models/Post');
require('dotenv').config();

app.use(methodOverride('_method'));
//CORS
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
//passportcfg
app.use(passport.initialize());
app.use(passport.session());
//routes
app.use(routes);

var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
  
  
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
//cloud config
cloudinary.config({
  cloud_name:'dzyy5uebd',
  api_key:'125433241969574',
  api_secret:process.env.CLOUDINARY_SECRET
});

  app.post('/upload',authMiddleware.isLoggedIn,upload.single('image'), (req, res) => {
    cloudinary.v2.uploader.upload(req.file.path, (err,result) => {
      if(err){
        return res.json({
          msg: err
        });
      } 
        
        //add image SECUREURL 
        var image = result.secure_url
        //addIMAGE public ID
        var imageId = result.public_id
        //postbody 
        var description = req.body.description;
        var title = req.body.title;
        var author = {id:req.user._id,username:req.user.username}
        if(description && title){
        Post.create({author,imageId,image,title,description},(err,post)=>{
          if(err){
           return res.json(err);
          }
          res.send(`uploaded==========${post}`);
        })
      }
        req.flash('ERROR','Missing POST Parameters!');
        res.render('create',{ ERROR: req.flash('ERROR') })
      
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



