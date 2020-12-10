const bookService = require('../../services/book');

const addBook = async (req, res) => {

    const resInfo = await bookService.addBook(req.body);
    return res.status(resInfo.status).json(resInfo);
}

const deleteBook = async (req, res) => {

    const resInfo = await bookService.deleteBook(req.body.bookId);
    return res.status(resInfo.status).json(resInfo);
}

const updateBookRecord = async (req, res) => {

    const resInfo = await bookService.updateBook(req.body.bookId, req.body.updateData);
    return res.status(resInfo.status).json(resInfo);
}

const getBook = async (req, res) => {

    const resInfo = await bookService.getBook(req.body.bookId);
    return res.status(resInfo.status).json(resInfo);
}

const getBooks = async (req, res) => {

    const resInfo = await bookService.getBooks();
    return res.status(resInfo.status).json(resInfo);
}

const activateBook = async (req, res) => {

    const resInfo = await bookService.updateBook(req.body.bookId, {isActive: true});
    return res.status(resInfo.status).json(resInfo);
}

const deactivateBook = async (req, res) => {

    const resInfo = await bookService.updateBook(req.body.bookId, {isActive: false});
    return res.status(resInfo.status).json(resInfo);
}

module.exports = {
    addBook,
    deleteBook,
    updateBookRecord,
    getBook,
    getBooks,
    activateBook,
    deactivateBook
}