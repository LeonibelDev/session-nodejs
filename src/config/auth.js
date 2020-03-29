const helpers = {}

helpers.isAuthenticated = (req, res, next) => {
    if (req.session.profile) {
        return next()
    }
    res.redirect('/')
}

module.exports = helpers