const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Post', PostSchema)
