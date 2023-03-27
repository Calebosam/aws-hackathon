const { config } = require('dotenv')
config()

module.exports = {
    /* Database variables */
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DATABASE: process.env.DATABASE,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,

    /* Server variables */
    SERVER_PORT: process.env.SERVER_PORT,
    CLIENT_PORT: process.env.CLIENT_PORT,
    SECRET: process.env.SECRET,

    /* Misc variables */
    ROLE: process.env.ROLE
}