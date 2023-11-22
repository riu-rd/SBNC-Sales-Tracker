import mongoose from "mongoose";
import { SchemaTypes} from "mongoose";

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
          default: 1,
          required: true
     },
     verified: {
          type: SchemaTypes.Boolean,
          default: false
     },
     approved: {
          type: SchemaTypes.Boolean,
          default: false
     },
     createdAt: {
          type: SchemaTypes.Date,
          default: Date.now,
          required: true
     }
})

export const User = mongoose.model('User', userSchema);