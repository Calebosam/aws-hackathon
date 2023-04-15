const passport = require('passport');
const { Strategy } = require('passport-jwt');
const { SECRET } = require('../constants');
const db = require('../db');

const cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['token']
    }
    return token
}

const options = {
    secretOrKey: SECRET,
    jwtFromRequest: cookieExtractor,
}

passport.use(
    new Strategy(options, async ({ id }, done) => {
        try {
            const { rows } = await db.query("SELECT user_uid, first_name, last_name, email, is_verified, is_admin, created_at, updated_at FROM users WHERE user_uid = $1", [id])
            if (!rows.length) { 
                throw new Error('401 not authorized.')
            }

            const verificationStatus = rows[0].is_verified
            if (!verificationStatus) {
                throw new Error('Email not verified')
            }

            let user = rows[0]
            return await done(null, user)
        } catch (error) {
            console.error(error.message)
            done(null, false)
        }
    })
)