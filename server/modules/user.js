const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, lowercase: true },
  password: String,
  email: String,
  name:{
    first:String,
    last: String,
    mi:String
  },
  Address:{
    street1: String,
    street2: String,
    city: String,
    state:String,
    zip:String
  },
  book_ids:[String],
  type:String //ie twitter or local etc...
});


module.exports = mongoose.model('user', userSchema);
