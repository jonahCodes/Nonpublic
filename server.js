const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors =require('cors');
const crypto =require('crypto');
const PORT = process.env.PORT || 3001;
const colors = require("colors");
const mongoose = require("mongoose");
const routes = require("./routes");
const session = require("express-session");
const methodOverride = require('method-override');
const passport = require("passport");
const logger = require("morgan");
const multer = require('multer');
const path =require('path')
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const flash = require('connect-flash');
const authMiddleware = require('./config/middleware/authMiddleware');

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
    // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());


// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
// }

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

app.post('/upload',upload.single('file',6),(req,res)=>{
          res.json({file:req.file});
})



app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://jonathanx99x:jonathan2015@cluster0-3psxk.mongodb.net/reacttest?retryWrites=true&w=majority", { useNewUrlParser: true }, function(err) {
    if (err) throw err;
    console.log(`mongoose connection successful`.yellow);
    app.listen(PORT, (err)=> {
        if (err) throw err;
        console.log(`connected on port ${PORT}`.cyan)
    });
});



