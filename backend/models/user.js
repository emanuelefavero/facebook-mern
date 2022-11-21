const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePictureUrl: {
    type: String,
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm_I2frPqb5sUeuAr-5C3vuzS-xSt8AMZqzA&usqp=CAU',
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'FriendRequest' },
  ],
})

module.exports = mongoose.model('User', UserSchema)
