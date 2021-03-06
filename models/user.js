const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
      },
      librarian: {
        type: Boolean,
        default: false
      },
      loginStatus: {
        type: Boolean,
        default: false,
      }
      
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;