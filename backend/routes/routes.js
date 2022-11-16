const express = require('express')
const router = express.Router()

// Controllers
const userController = require('../controllers/userController')
// const postController = require('../controllers/postController')
const friendRequestController = require('../controllers/friendRequestController')

// Routes
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/user', userController.getUser)
router.get('/user/:username', userController.getUserByUsername)
router.get('/user/:username/friends', userController.getUserFriends)
router.get(
  '/user/:username/friendRequests',
  userController.getUserFriendRequests
)

router.post('/friendRequest', friendRequestController.createFriendRequest)
router.put('/friendRequest/:id', friendRequestController.acceptFriendRequest)
router.delete(
  '/friendRequest/:id',
  friendRequestController.declineFriendRequest
)
router.get('/friendRequest/:id', friendRequestController.getFriendRequest)

module.exports = router
