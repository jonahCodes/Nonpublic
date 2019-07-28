const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },

  image:String,

  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
