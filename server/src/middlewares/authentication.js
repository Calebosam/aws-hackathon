const passport = require('passport')

exports.userAuthentication = passport.authenticate('jwt', { session: false })