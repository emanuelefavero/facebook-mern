const express = require('express')
const router = express.Router()

// Controllers
const userController = require('../controllers/userController')
const friendRequestController = require('../controllers/friendRequestController')
const postController = require('../controllers/postController')

// Routes

// Auth
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)

// Search
router.get('/search', userController.searchUser)

// User
router.get('/user', userController.getUser)

// NOTE:

router.get('/user/:username', userController.getUserByUsername)
router.get('/user/:username/friends', userController.getUserFriends)
router.get(
  '/user/:username/friend-requests',
  userController.getUserFriendRequests
)
router.get('/user/username-by-id/:id', userController.getUsernameById)
router.get('/user/user-by-id/:id', userController.getUserById)

// Friend Request
router.post('/friend-request', friendRequestController.createFriendRequest)
router.put('/friend-request/:id', friendRequestController.acceptFriendRequest)
router.delete(
  '/friend-request/:id',
  friendRequestController.declineFriendRequest
)
router.get('/friend-request', friendRequestController.getFriendRequests)
router.get('/friend-request/:id', friendRequestController.getFriendRequest)

// Post
router.post('/posts', postController.createPost)
router.get('/posts', postController.getPosts)

// Post Likes
router.post('/posts/:postId/like', postController.likePost)

module.exports = router
