const bookControllers = require('../controllers/book');
const { authenticateToken, isLibrarian, isLoggedIn, isBookActive } = require('../middlewares/authenticate');
const { sanitizeForm, validateBook } = require('../middlewares/validation');

const { Router } = require('express');

const router = Router();

const userRoutes = (app) => {

    router.post('/add-book', authenticateToken, isLibrarian, isLoggedIn, sanitizeForm, validateBook, bookControllers.addBook);

    router.delete('/delete-book', authenticateToken, isLibrarian, isLoggedIn, bookControllers.deleteBook);

    router.put('/update-record', authenticateToken, isLibrarian, isLoggedIn, bookControllers.updateBookRecord);

    router.put('/activate-book', authenticateToken, isLibrarian, isLoggedIn, bookControllers.activateBook);

    router.put('/deactivate-book', authenticateToken, isLibrarian, isLoggedIn, bookControllers.deactivateBook);

    router.get('/get-book', authenticateToken, isLoggedIn, isBookActive, bookControllers.getBook);

    router.get('/book-list', authenticateToken, isLoggedIn, bookControllers.getBooks);

    app.use('/books', router);
}

module.exports = userRoutes;