const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    mediaType:{
        type: String,
        required: true,
        enum: ["image", "video"]
    },

    mediaUrl:{
        type: String,
        required: true,
    },
    caption: {
        type: Date,
        required: true,
        trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "fashion",
        "food",
        "travel",
        "technology",
        "education",
        "comedy",
        "lifestyle",
        "other",
      ],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
   
}, {timestamps: true})


const Post = mongoose.model("Post", postSchema);

export default Post;