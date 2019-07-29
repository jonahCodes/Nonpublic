const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
  author: {
    id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  username:String
},
  title:{
    type:String,
    
  },
  description:{
    type:String,
    
  },

  image:[{path:String}] ,

  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
