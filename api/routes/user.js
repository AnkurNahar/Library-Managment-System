const userControllers = require('../controllers/user');
const { authenticateToken, isLoggedIn } = require('../middlewares/authenticate');
const { sanitizeForm, validateSignIn, validateSignUp } = require('../middlewares/validation');

const { Router } = require('express');

const router = Router();

const userRoutes = (app) => {

    router.post('/login', sanitizeForm, validateSignIn, userControllers.loginUser);

    router.post('/signup', sanitizeForm, validateSignUp, userControllers.signupUser);

    router.delete('/logout', authenticateToken, isLoggedIn, userControllers.logoutUser);

    app.use('/users', router);
}

module.exports = userRoutes;