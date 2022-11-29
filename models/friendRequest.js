const mongoose = require('mongoose')

const FriendRequestSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'accepted', 'rejected'],
  },
})

module.exports = mongoose.model('FriendRequest', FriendRequestSchema)
