const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:String,
    isbn:String
})



module.exports = mongoose.model('book', userSchema);
