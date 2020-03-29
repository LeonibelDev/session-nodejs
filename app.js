let express = require('express')
let flash = require('connect-flash')
let morgan = require('morgan')
let session = require('express-session')
let path = require('path')
let routes = require('./src/config/routes')
let app = express()

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'hbs')

app.use(session({
    secret: 'mysecretkey_leo',
    resave: false,
    saveUninitialized: false

}))

app.use(flash())
app.use(express.static(path.join(__dirname, 'src/static')))
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(routes)


let config = {
    'port' : process.env.PORT || 2000
}

app.listen(config.port, ()=>{
    console.info('server on port 2000')
})