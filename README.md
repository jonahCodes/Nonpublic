
const multer = require('multer');
const path =require('path')
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const authMiddleware = require('./config/middleware/authMiddleware');


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

app.post('/upload',authMiddleware.isLoggedIn,upload.array('file',6),(req,res)=>{
          res.json({file:req.file});
          
})
