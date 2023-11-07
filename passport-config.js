const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const user = require('./modal/user')


function initialize(passport, getUserByEmail) {
     const authenticateUser = async (email, password, done) => {
          var userArray = await getUserByEmail(email)
          const user = userArray[0]
          if (user == null){
               return done(null, false, {message: 'No user with that email'})
          }
          try {
               if (await bcrypt.compare(password, user.password)){
                    return done(null, user)
               } else {
                    return done(null, false, {message: 'Password Incorrect'})
               }
          }
          catch(err) {
               return done(err)
          }
     }
     passport.use(new LocalStrategy({usernameField: 'email'},
     authenticateUser))
     passport.serializeUser((user, done) => {
          done(null, user.id)
     })
     ///TODO: deserialize -Wesley Job 
     passport.deserializeUser((id, done) => {
          done(null, user)
     })
}


module.exports = initialize