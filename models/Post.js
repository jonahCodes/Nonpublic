const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title:{
    type:String,
    unique:true,
    required:[true,"text is required"]
  },
  post: {
    type: String,
    unique: true,
    required: [true, "text is required"]
  },
  files:{
    type:Buffer,
    unique:true,
    
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
