const User = require('../modal/user')

const userListController = {
     getUsers: async (req, res) => {
          try {          
               //Check access
               
               const userlist = await User.find().select('-password -_id').lean()
               console.log(userlist)
               res.render('userlist', {users: userlist})
          } catch {
               res.status(400)
          }
          
     }
}

module.exports = userListController