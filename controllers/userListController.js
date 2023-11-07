const User = require('../modal/user')

const userListController = {
     getUsers: async (req, res) => {
          try {
               const userlist = User.find()
          } catch {
               
          }
     }
}

module.exports = userListController