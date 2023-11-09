const User = require('../modal/user')

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
async function checkLevel(req, res, next){
     try {    
          const currUser = await User.findById(req.session.passport.user)
          console.log(currUser)
          var level = currUser.access
          if (level < 2) {
               console.log('enter here')
               res.redirect('/')
          }
     } catch (err) {
          console.log(err.message)
     }
     next()
}

module.exports.checkAuthenticated = checkAuthenticated
module.exports.checkNotAutheticated = checkNotAutheticated
module.exports.checkLevel = checkLevel