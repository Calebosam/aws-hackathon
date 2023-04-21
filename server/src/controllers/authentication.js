const db = require('../db');
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { SECRET } = require('../constants')
const { sendEmailConfirmation } = require('../utilities/nodemailer')

//Get all users
exports.getUsers = async (req, res) => {
    try {
        const { rows } = await db.query("SELECT user_uid, first_name, last_name, email, is_verified, verification_token, reset_password_token, reset_password_token_expiry, is_admin, created_at, updated_at FROM users")
        res.status(res.statusCode).json({ success: true, users: rows })
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).json({ message: error.message })
    }
}

//Register user
exports.register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const verificationToken = await sign({ email }, SECRET)
        await sendEmailConfirmation(`${first_name} ${last_name}`, email, verificationToken);

        const hashedPassword = await hash(password, 10);
        await db.query('INSERT INTO users (first_name, last_name, email, password_hash, verification_token) VALUES($1, $2, $3, $4, $5)', [first_name, last_name, email, hashedPassword, verificationToken])
        return res.status(res.statusCode).json({
            success: true, message: 'Registration successfull.',
        });
    } catch (error) {
        console.error(error.message);
        return res.status(res.statusCode).json({
            error: error.message
        })
    }
}

//Login user
exports.login = async (req, res) => {
    const { user } = req

    const payload = {
        id: user.user_uid,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        isVerified: user.is_verified,
        isAdmin: user.is_admin,
        createdAt: user.created_at,
        updatedAt: user.updated_at
    }

    try {
        const token = await sign(payload, SECRET)

        return res.status(res.statusCode).cookie('token', token, { /* maxAge: 5000, */ httpOnly: true }).json({ // Remember to set the cookie secure to true.
            success: true,
            message: 'Logged in successfully.'
        })
    } catch (error) {
        console.error(error.message);
        return res.status(res.statusCode).json({
            error: error.message
        })
    }
}

//Get  current user information
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await req.user
        return res.status(res.statusCode).json(user);
    } catch (error) {
        console.error(error.message);
    }
}

//Logout user
exports.logout = async (req, res) => {
    try {
        return res.status(res.statusCode).clearCookie('token', { httpOnly: true }).json({
            success: true,
            message: 'Logged out successfully.'
        })
    } catch (error) {
        console.error(error.message);
        return res.status(res.statusCode).json({
            error: error.message
        })
    }
}

//Verify Email
exports.verifyEmail = async (req, res) => {
    try {
        const { user_uid } = req.user;
        await db.query('UPDATE users SET verification_token = null, is_verified = true WHERE user_uid = $1', [user_uid])

        return res.status(res.statusCode).json({
            success: true,
            message: 'Email verified'
        })
    } catch (error) {
        console.error(error.message)
    }
}