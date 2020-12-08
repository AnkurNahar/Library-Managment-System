const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookname: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true
      },
      genre: {
        type: String,
        default: '',
      },
      image: {
        type: String,
        default: '',
      },
      release: {
        type: Date,
        default: '',
      }
});

const Books = mongoose.model('Book', bookSchema);

module.exports = Books;