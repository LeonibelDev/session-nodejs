const { Pool, Client } = require('pg')

const db = new Pool({
    user: '',
    host: 'localhost',
    database: 'login_session',
    password: '',
    port: 
})

module.exports = db