const User = require('../modal/user')
const bcrypt = require('bcrypt')

const RegisterController = {
     postUser: async (req, res) => {
          try {
               console.log(req.body)
               const hashedPassword = await bcrypt.hash(req.body.password,10)
               console.log(await bcrypt.compare(req.body.confirmPassword, hashedPassword))
               if (!(await bcrypt.compare(req.body.confirmPassword, hashedPassword))){
                    console.log('Password and confirm password are different')
                    throw new Error('Password and confirm password are different')
               }
               const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                    number: req.body.number,
                    access: 0
               })
               console.log(user)
               const newUser = await user.save()
               console.log('Register Sucessful')
               res.status(201).redirect('login')
          } catch(err) {
               console.log(err)
               if ('Error' == err.name) {
                    message = err.message
               }
               else {
                    message = 'Invalid name or email'
               }
               res.status(401).render('register', {
                    title: 'register',
                    errorMessage: message
               })
               
               console.log('Register Failed')
          }
     }
}

module.exports = RegisterController