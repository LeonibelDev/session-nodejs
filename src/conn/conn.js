const { Pool, Client } = require('pg')

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'login_session',
    password: 'CODECSYSDB',
    port: 5432
})

module.exports = db