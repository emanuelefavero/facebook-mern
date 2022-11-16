require('dotenv').config()
const User = require('./models/user')
const bcrypt = require('bcryptjs')
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt

// Define a local strategy for passport to use
module.exports = function (passport) {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = process.env.SECRET
  // opts.issuer = 'accounts.examplesoft.com'
  // opts.audience = 'yoursite.net'
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ _id: jwt_payload.sub }, function (err, user) {
        if (err) {
          return done(err, false)
        }
        if (user) {
          // If there is a user with that username:
          // Compare the password the user entered with the password in the database
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err
            if (result === true) {
              return done(null, user)
            } else {
              return done(null, false)
            }
          })

          // return done(null, user)
        } else {
          return done(null, false)
          // or you could create a new account
        }
      })
    })
  )

  // Serialize the user (serializeUser stores a cookie with the user.id in the browser)
  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })

  // Deserialize the user (deserializeUser takes the cookie and finds the user in the database)
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      // TIP: Here instead of passing the entire user, you can pass only the user.username so other data such as password is not exposed:
      const userInformation = {
        _id: user._id,
        username: user.username,
        password: user.password,
        role: user.role,
      }
      cb(err, userInformation)
      // cb(err, user)
    })
  })
}
