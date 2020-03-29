let express = require('express')
let router = express.Router()
const cRandom = require('crypto-random-string');
const { isAuthenticated } = require('./auth')

let db = require('../conn/conn')

router.get('/', (req, res)=>{
    let message = req.flash()

    res.render('index', {
        message
    })
})


router.post('/login', async(req, res)=>{
    let id = cRandom(10)
    let { user_name_login, user_email_login, user_pass_login } = req.body

    await db.query(`INSERT INTO account(id, nick, email, pass, joining) VALUES ('${id}', '${user_name_login}', '${user_email_login}', '${user_pass_login}', '${new Date()}');`)
    .then(()=>{
        console.log('created!')
        req.flash('success', 'You account was created success')
        res.redirect('/')
    })
    .catch((err)=>{
        console.log(err)
        req.flash('error', 'Error in process create account, inset other email')
        res.redirect('/')
    })

    await res.redirect('/')
})



router.post('/sing-in', async(req, res)=>{
    let { user_email, user_pass } = req.body
    
    await db.query(`SELECT * FROM account WHERE email = '${user_email}' AND pass = '${user_pass}'`)
    .then((query)=>{
        if (query.rows.length == 0) {
            req.flash('error', 'The account do not exist!, pleace first login')
            res.redirect('/')
        }
            console.log('created!')
            req.session.profile = query.rows 
            res.redirect('/profile')
    })
    .catch((err)=>{
        console.log(err)
        req.flash('error', 'The account do not exist!, pleace first login')
        res.redirect('/')
    })
})



router.get('/profile', isAuthenticated, (req, res)=>{
    
    res.render('user', {
        profile: req.session.profile,
    })

})


router.get('/delete/:id', async(req, res)=>{
    let { id } = req.params
    await db.query(`DELETE FROM account WHERE id = '${id}';`)
    await res.redirect('/')
})

router.get('/logout', isAuthenticated, (req, res)=>{
    delete req.session.profile
    res.redirect('/')
})
module.exports = router