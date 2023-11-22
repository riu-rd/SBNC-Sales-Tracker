import mongoose from "mongoose";
import { SchemaTypes } from "mongoose";

const tokenSchema = new mongoose.Schema({
    userId: {
        type: SchemaTypes.String,
        ref: "user",
        required: true
    },
    token: {
        type: SchemaTypes.String,
        required: true
    }
})

export const Token = mongoose.model('Token', tokenSchema);