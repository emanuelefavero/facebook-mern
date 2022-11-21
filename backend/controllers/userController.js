const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const mongoose = require('mongoose')

const User = require('../models/user')

// register API
exports.register = [
  // Validate and sanitize fields.
  body('username', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(400).json({ errors: errors.array() })
      return
    } else {
      // Data from form is valid.
      // Check if User with same username already exists.
      User.findOne({ username: req.body.username }).exec((err, foundUser) => {
        if (err) {
          return next(err)
        }

        if (foundUser) {
          // User exists, send error.
          res.status(400).json({ message: 'User already exists.' })
        } else {
          // User does not exist, create new user.
          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
              return next(err)
            }

            const user = new User({
              username: req.body.username,
              password: hashedPassword,
            }).save((err) => {
              if (err) {
                return next(err)
              }

              req.user = user

              // Successful - redirect to new user record.
              res.status(200).json({ message: 'User created successfully!' })
            })
          })
        }
      })
    }
  },
]

// login API
exports.login = [
  // Validate and sanitize fields.
  body('username', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.status(400).json({ errors: errors.array() })
      return
    } else {
      // Data from form is valid.
      // Check if User with same username already exists.
      User.findOne({ username: req.body.username }).exec((err, foundUser) => {
        if (err) {
          return next(err)
        }

        if (foundUser) {
          // User exists, check password.
          bcrypt.compare(
            req.body.password,
            foundUser.password,
            (err, result) => {
              if (err) {
                return next(err)
              }

              if (result === true) {
                // Passwords match. Log user in.
                req.login(foundUser, (err) => {
                  if (err) {
                    return next(err)
                  }

                  req.user = foundUser

                  // Successful - redirect to new user record.
                  res.status(200).json({ message: 'Login successful!' })
                })
              } else {
                // Passwords do not match.
                res.status(400).json({ message: 'Incorrect password.' })
              }
            }
          )
        } else {
          // User does not exist.
          res.status(400).json({ message: 'User does not exist.' })
        }
      })
    }
  },
]

// logout API
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }

    res.status(200).json({ message: 'Logout successful!' })
  })
}

// get user if logged in
exports.getUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

// get user by id
exports.getUserById = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    User.findById(req.params.id)
      .populate('posts')
      .exec((err, foundUser) => {
        if (err) {
          return next(err)
        }

        if (foundUser) {
          res.status(200).json({ user: foundUser })
        } else {
          res.status(404).json({ message: 'User not found.' })
        }
      })
  } else {
    res.status(400).json({ message: 'Invalid ID.' })
  }
}

// get user by username
exports.getUserByUsername = (req, res, next) => {
  User.findOne({ username: req.params.username }).exec((err, foundUser) => {
    if (err) {
      return next(err)
    }

    if (foundUser) {
      res.status(200).json({ user: foundUser })
    } else {
      res.status(404).json({ message: 'User not found.' })
    }
  })
}

// search user
exports.searchUser = async (req, res, next) => {
  try {
    const { q } = req.query
    const users = await User.find({
      username: { $regex: q, $options: 'i' },
    })

    if (users.length < 1) {
      res.status(404).json({ message: 'No users found.' })
      // throw new ErrorHandler(404, 'No users found.')
    } else {
      res.status(201).json({ users })
    }
  } catch (err) {
    next(err)
  }
}

// get user username by id as string
exports.getUsernameById = (req, res, next) => {
  User.findById(req.params.id).exec((err, foundUser) => {
    if (err) {
      return next(err)
    }

    if (foundUser) {
      res.status(200).json({ username: foundUser.username })
    } else {
      res.status(404).json({ message: 'User not found.' })
    }
  })
}

// get user friends
exports.getUserFriends = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .populate('friends')
    .exec((err, foundUser) => {
      if (err) {
        return next(err)
      }

      if (foundUser) {
        res.status(200).json({ friends: foundUser.friends })
      } else {
        res.status(404).json({ message: 'User not found.' })
      }
    })
}

// get user friend requests
exports.getUserFriendRequests = (req, res, next) => {
  User.findOne({ username: req.params.username })
    .populate('friendRequests')
    .exec((err, foundUser) => {
      if (err) {
        return next(err)
      }

      if (foundUser) {
        res.status(200).json({ friendRequests: foundUser.friendRequests })
      } else {
        res.status(404).json({ message: 'User not found.' })
      }
    })
}

// get user posts
// exports.getUserPosts = (req, res, next) => {
//   User.findOne({ username: req.params.username })
//     .populate('posts')
//     .exec((err, foundUser) => {
//       if (err) {
//         return next(err)
//       }

//       if (foundUser) {
//         res.status(200).json({ posts: foundUser.posts })
//       } else {
//         res.status(404).json({ message: 'User not found.' })
//       }
//     })
// }

// edit user profilePictureUrl
exports.changeProfilePicture = (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    User.findByIdAndUpdate(
      req.params.id,
      { profilePictureUrl: req.body.profilePictureUrl },
      { new: true },
      (err, updatedUser) => {
        if (err) {
          return next(err)
        }

        if (updatedUser) {
          res.status(200).json({ user: updatedUser })
        } else {
          res.status(404).json({ message: 'User not found.' })
        }
      }
    )
  } else {
    res.status(400).json({ message: 'Invalid ID.' })
  }
}
