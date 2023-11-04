const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true,
          unique: true
     },
     email: {
          type: String,
          required: true,
          unique: true
     },
     password: {
          type:String,
          required: true
     },
     number: {
          type: String,
     },
     access: {
          type: Number,
          required: true
     }
})

module.exports = mongoose.model('user', userSchema)