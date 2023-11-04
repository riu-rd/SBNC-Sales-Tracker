const { SchemaTypes } = require('mongoose')
const mongoose = require('mongoose')

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
     },
     assembler: {
         type: SchemaTypes.String,
     },
     total: {
         type: SchemaTypes.Number,
         required: true,
     },
     vatsale: {
         type: SchemaTypes.Number,
         required: true,
     },
     vatamount: {
         type: SchemaTypes.Number,
         required: true,
     },
 });
 
 module.exports = mongoose.model('transaction', transactionSchema);