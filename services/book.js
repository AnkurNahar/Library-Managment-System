const Book = require('../models/book');

const bookservice = {
  
    addBook: async function (bookData) {
        try {
            await Book.insertOne( bookData )
            return { status: 200, message: "Book Added Successfully" };
        } catch (err) {
          return { status: 500, msg: "Internal server error!" };
        }
      },

      updateBook: async function (bookId, updateData) {
        try {
            await Book.updateOne( {_id: bookId}, updateData )
            return { status: 200, message: "Book Updated Successfully" };
        } catch (err) {
          return { status: 500, msg: "Internal server error!" };
        }
      },

      deleteBook: async function (bookId) {
        try {
            await Book.deleteOne( {_id: bookId} )
            return { status: 200, message: "Book Deleted Successfully" };
        } catch (err) {
          return { status: 500, msg: "Internal server error!" };
        }
      },

      getBook: async function (bookData) {
        try {
            const book = await Book.findOne( bookData )
            return { status: 200, book};
        } catch (err) {
          return { status: 500, msg: "Internal server error!" };
        }
      },

      getBooks: async function () {
        try {
            const books = await Book.find({});
            return { status: 200, books};
        } catch (err) {
          return { status: 500, msg: "Internal server error!" };
        }
      },

};

module.exports = bookservice;