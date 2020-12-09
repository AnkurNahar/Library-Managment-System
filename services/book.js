const Book = require('../models/book');

const bookservice = {

    isBookActive: async function (bookId) {
        try {
          const book = await Book.findOne({ _id: bookId });
          const bookStatus = book == null ? null : book.isActive;
          return { status: 200, activeStatus: bookStatus };
        } catch (err) {
            console.log(err);
            return { status: 500};
        }
      },
  
    addBook: async function (bookData) {
        try {
            await Book.create( bookData )
            return { status: 200, message: "Book Added Successfully" };
        } catch (err) {
          console.log(err);
          return { status: 500, msg: "Internal server error!" };
        }
      },

      updateBook: async function (bookId, updateData) {
        try {
            await Book.updateOne( {_id: bookId}, {$set: updateData} )
            return { status: 200, message: "Book Updated Successfully" };
        } catch (err) {
          console.log(err);
          return { status: 500, msg: "Internal server error!" };
        }
      },

      activateBook: async function (bookId) {
        try {
            await Book.updateOne( {_id: bookId}, {isActive: true} )
            return { status: 200, message: "Book Activated Successfully" };
        } catch (err) {
          console.log(err);
          return { status: 500, msg: "Internal server error!" };
        }
      },

      deactivateBook: async function (bookId) {
        try {
            await Book.updateOne( {_id: bookId}, {isActive: false} )
            return { status: 200, message: "Book Deactivated Successfully" };
        } catch (err) {
          console.log(err);
          return { status: 500, msg: "Internal server error!" };
        }
      },

      deleteBook: async function (bookId) {
        try {
            await Book.deleteOne( {_id: bookId} )
            return { status: 200, message: "Book Deleted Successfully" };
        } catch (err) {
          console.log(err);
          return { status: 500, msg: "Internal server error!" };
        }
      },

      getBook: async function (bookId) {
        try {
            const book = await Book.findOne({ _id: bookId })
            return { status: 200, book};
        } catch (err) {
          console.log(err);
          return { status: 500, msg: "Internal server error!" };
        }
      },

      getBooks: async function () {
        try {
            const books = await Book.find({});
            return { status: 200, books};
        } catch (err) {
          console.log(err);
          return { status: 500, msg: "Internal server error!" };
        }
      },

};

module.exports = bookservice;