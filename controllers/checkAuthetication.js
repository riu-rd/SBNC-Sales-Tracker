function checkNotAutheticated(req, res, next){
     if (req.isAuthenticated()) {
          res.redirect('/')
     }
     next()
}
function checkAuthenticated(req, res, next){
     if (req.isAuthenticated()) {
          return next()
     }
     res.redirect('/login')
}

module.exports.checkAuthenticated = checkAuthenticated()
module.exports.checkNotAutheticated = checkNotAutheticated()