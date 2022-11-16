const express = require('express')
const router = express.Router()

// Controllers
const userController = require('../controllers/userController')

// Routes
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/user', userController.getUser)
router.get('/user/:id', userController.getUserById)

module.exports = router
