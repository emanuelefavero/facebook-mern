const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

module.exports = mongoose.model('Post', PostSchema)
