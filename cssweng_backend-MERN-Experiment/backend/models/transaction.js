import mongoose from "mongoose";
import { SchemaTypes} from "mongoose";

const transactionSchema = new mongoose.Schema({
     date: {
         type: SchemaTypes.String,
         required: true,
     },
     name: {
         type: SchemaTypes.String,
         required: true,
     },
     series: {
         type: SchemaTypes.Number,
         required: true,
         unique: true,
     },
     os: {
         type: SchemaTypes.Number,
         required: true,
     },
     invoice: {
         type: SchemaTypes.Number,
         required: true,
     },
     seller: {
         type: SchemaTypes.String,
         required: true
     },
     assembler: {
         type: SchemaTypes.String,
         required: true
     },
     total: {
         type: SchemaTypes.Number,
         required: true
     },
     vatsale: {
         type: SchemaTypes.Number,
         required: true
     },
     vatamount: {
         type: SchemaTypes.Number,
         required: true
     },
     branch: {
        type: SchemaTypes.String,
        required: true
    },
    addedby: {
        type: SchemaTypes.String,
        required: true
    }
 });
 
 export const Transaction = mongoose.model('Transaction', transactionSchema);