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
    },
    createdAt: {
        type: SchemaTypes.Date,
        default: Date.now,
        expires: 300 // TTL in seconds (5 minutes)
    }
});

export const Token = mongoose.model('Token', tokenSchema);