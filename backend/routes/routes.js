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
// router.get('/posts/:id', postController.getPostById)
// router.get('/posts/:id', postController.getPost)
// router.get('/posts/user/:username', postController.getUserPosts)
// router.put('/posts/:id', postController.updatePost)
// router.delete('/posts/:id', postController.deletePost)

// // NOTE: TEST get last post
// router.get('/posts/user/:username/last-post', userController.getLastPost)
// // NOTE: TEST get friends posts
// router.get(
//   '/posts/user/:username/friends-posts',
//   postController.getFriendsPosts
// )

module.exports = router
