const {HOST, PORT, USER, PASSWORD, DATABASE} = require('../constants')
const { Pool } = require('pg')

const pool = new Pool({
    host: HOST,
    port: PORT,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

module.exports = {
    query:(text, params)=>pool.query(text, params)
}