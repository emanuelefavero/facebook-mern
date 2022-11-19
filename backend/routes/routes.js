const express = require('express')
const router = express.Router()

// Controllers
const userController = require('../controllers/userController')
// const postController = require('../controllers/postController')
const friendRequestController = require('../controllers/friendRequestController')

// Routes

// Auth
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)

// Search
router.get('/search', userController.searchUser)

// User
router.get('/user', userController.getUser)
router.get('/user/:username', userController.getUserByUsername)
router.get('/user/:username/friends', userController.getUserFriends)
router.get(
  '/user/:username/friend-requests',
  userController.getUserFriendRequests
)
router.get('/user/username-by-id/:id', userController.getUsernameById)

// Friend Request
router.post('/friend-request', friendRequestController.createFriendRequest)
router.put('/friend-request/:id', friendRequestController.acceptFriendRequest)
router.delete(
  '/friend-request/:id',
  friendRequestController.declineFriendRequest
)
router.get('/friend-request', friendRequestController.getFriendRequests)
router.get('/friend-request/:id', friendRequestController.getFriendRequest)

module.exports = router
