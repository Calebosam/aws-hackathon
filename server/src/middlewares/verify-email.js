const db = require('../db');

//Email token middleware
exports.verifyTokenMiddleware = async (req, res, next) => {
    console.log('hi')
    try {
        const { token } = req.params;
        const { rows } = await db.query('SELECT * FROM users WHERE verification_token = $1', [token]);
        console.log(rows[0])
        if (!rows.length) {
            throw new Error('Invalid email token.')
        };

        req.user = rows[0];
        next()
    } catch (error) {
        console.error(error.message);
    }
}