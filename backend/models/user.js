import mongoose from "mongoose";
import { SchemaTypes} from "mongoose";

const userSchema = new mongoose.Schema({
     name: {
          type: SchemaTypes.String,
          required: true,
          unique: true
     },
     branch: {
          type: SchemaTypes.String,
          required: true,
     },
     email: {
          type: SchemaTypes.String,
          required: true,
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
          default: false,
          required: true
     },
     approved: {
          type: SchemaTypes.Boolean,
          default: false,
          required: true
     },
     createdAt: {
          type: SchemaTypes.String,
          default: new Date().toISOString().split('T')[0],
          required: true,
     }
});

export const User = mongoose.model('User', userSchema);