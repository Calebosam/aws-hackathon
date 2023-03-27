const db = require('../db');
const { hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { ROLE, SECRET } = require('../constants')

exports.getUsers = async (req, res) => {
    try {
        const { rows } = await db.query("SELECT user_uid, first_name, last_name, email, role, verified, document_uid, created_at FROM users")
        res.status(res.statusCode).json({ success: true, users: rows })
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).json({ message: error.message })
    }
}

exports.register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const role = ROLE
    try {
        const hashedPassword = await hash(password, 10);
        await db.query('INSERT INTO users (user_uid, first_name, last_name, email, password, role) VALUES(uuid_generate_v4(), $1, $2, $3, $4, $5)', [first_name, last_name, email, hashedPassword, role])
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

exports.login = async (req, res) => {
    const { user } = req
    payload = {
        id: user.user_uid,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        document_uid: user.document_uid
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