const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  createdAt: { type: Date, default: Date.now },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  numberOfLikes: { type: Number, default: 0 },

  comments: [
    {
      content: { type: String, required: true },
      username: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  numberOfComments: { type: Number, default: 0 },
})

module.exports = mongoose.model('Post', PostSchema)
