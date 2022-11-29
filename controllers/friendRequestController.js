const User = require('../models/user')
const FriendRequest = require('../models/friendRequest')
const Post = require('../models/post')

// Create a new friend request
exports.createFriendRequest = async (req, res) => {
  try {
    // Find the user that sent the friend request
    const fromUser = await User.findOne({ username: req.body.from })
    // Find the user that received the friend request
    const toUser = await User.findOne({ username: req.body.to })

    // Create a new friend request
    const friendRequest = new FriendRequest({
      from: fromUser,
      to: toUser,
    })
    // Save the friend request
    await friendRequest.save()

    // Add the friend request to the user that sent it
    fromUser.friendRequests.push(friendRequest)
    // Save the user that sent the friend request
    await fromUser.save()

    // Add the friend request to the user that received it
    toUser.friendRequests.push(friendRequest)
    // Save the user that received the friend request
    await toUser.save()

    // Send the friend request
    res.send(friendRequest)
  } catch (err) {
    res.status(500).send(err)
  }
}

// Accept a friend request
exports.acceptFriendRequest = async (req, res) => {
  try {
    // Find the friend request
    const friendRequest = await FriendRequest.findById(req.params.id)

    // Find the user that sent the friend request
    const fromUser = await User.findById(friendRequest.from)
    // Find the user that received the friend request
    const toUser = await User.findById(friendRequest.to)

    // FIX: Check if the user that sent the friend request is already a friend to prevent duplicates

    // Add the user that sent the friend request to the user that received it
    toUser.friends.push(fromUser)
    // Save the user that received the friend request
    await toUser.save()

    // Add the user that received the friend request to the user that sent it
    fromUser.friends.push(toUser)
    // Save the user that sent the friend request
    await fromUser.save()

    // Delete the friend request
    await FriendRequest.findByIdAndDelete(req.params.id)

    // Send the friend request
    res.send(friendRequest)
  } catch (err) {
    res.status(500).send(err)
  }
}

// Decline a friend request
exports.declineFriendRequest = async (req, res) => {
  try {
    // Find the friend request
    const friendRequest = await FriendRequest.findById(req.params.id)

    // Find the user that sent the friend request
    const fromUser = await User.findById(friendRequest.from)
    // Find the user that received the friend request
    const toUser = await User.findById(friendRequest.to)

    // Remove the friend request from the user that sent it
    fromUser.friendRequests.pull(friendRequest)
    // Save the user that sent the friend request
    await fromUser.save()

    // Remove the friend request from the user that received it
    toUser.friendRequests.pull(friendRequest)
    // Save the user that received the friend request
    await toUser.save()

    // Delete the friend request
    await FriendRequest.findByIdAndDelete(req.params.id)

    // Send the friend request
    res.send(friendRequest)
  } catch (err) {
    res.status(500).send(err)
  }
}

// Get all friend requests
exports.getFriendRequests = async (req, res) => {
  try {
    // Find all friend requests
    const friendRequests = await FriendRequest.find()

    // Send all friend requests
    res.send(friendRequests)
  } catch (err) {
    res.status
  }
}

// Get a friend request
exports.getFriendRequest = async (req, res) => {
  try {
    // Find the friend request
    const friendRequest = await FriendRequest.findById(req.params.id)

    // Send the friend request
    res.send(friendRequest)
  } catch (err) {
    res.status(500).send(err)
  }
}

// Get all friend requests from a user
exports.getFriendRequestsFrom = async (req, res) => {
  try {
    // Find the user
    const user = await User.findById(req.params.id)

    // Find all friend requests from the user
    const friendRequests = await FriendRequest.find({
      from: user,
    })

    // Send all friend requests from the user
    res.send(friendRequests)
  } catch (err) {
    res.status(500).send
  }
}

// Get all friend requests to a user
exports.getFriendRequestsTo = async (req, res) => {
  try {
    // Find the user
    const user = await User.findById(req.params.id)

    // Find all friend requests to the user
    const friendRequests = await FriendRequest.find({
      to: user,
    })

    // Send all friend requests to the user
    res.send(friendRequests)
  } catch (err) {
    res.status(500).send
  }
}
