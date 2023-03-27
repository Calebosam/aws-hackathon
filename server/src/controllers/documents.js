const db = require('../db');

exports.getDocuments = async (req, res) => {
    try {
        return res.status(res.statusCode).json({ success: true, message: 'Authorized' })
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).json({ message: error.message })
    }
}