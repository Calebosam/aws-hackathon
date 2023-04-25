import constants from '../constants'
import { Pool } from 'pg'

const pool = new Pool({
    host: constants.HOST,
    port: constants.PORT,
    user: constants.USER,
    password: constants.PASSWORD,
    database: constants.DATABASE,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

export default {
    query:(text: string, params?: any | null)=>pool.query(text, params)
}