const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    authors:[String],
    title: String,
    publisher:String,
    publishedDate:String,
    description:String,
    selfLink:String,//link to google books
    thumbnail:String,
    owner:String,//user who owns the book
    isbn13:String,
    rq_status:{
      rq_state:String,//requested, traded, available
      rq_by:String//user making request
    }
});



module.exports = mongoose.model('book', bookSchema);
