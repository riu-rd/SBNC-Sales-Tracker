const { SchemaTypes } = require('mongoose')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
     name: {
          type: SchemaTypes.String,
          required: true,
          unique: true
     },
     email: {
          type: SchemaTypes.String,
          required: true,
          unique: true
     },
     password: {
          type: SchemaTypes.String,
          required: true
     },
     access: {
          type: SchemaTypes.Number,
          required: true
     }
})

module.exports = mongoose.model('user', userSchema)