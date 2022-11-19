const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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

// TODO: if virtual can't be passed to the front end, then we can just build the same logic on the front end
// only get the last post
UserSchema.virtual('lastPost').get(function () {
  return this.posts[this.posts.length - 1]
})

// only get the last 10 posts
UserSchema.virtual('lastTenPosts').get(function () {
  return this.posts.slice(-10)
})

// get the number of posts
UserSchema.virtual('numberOfPosts').get(function () {
  return this.posts.length
})

// get the number of friends
UserSchema.virtual('numberOfFriends').get(function () {
  return this.friends.length
})

module.exports = mongoose.model('User', UserSchema)
