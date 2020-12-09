const { Router } = require("express");

const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");

const loadRoutes = () => {

    const router = Router();

    userRoutes(router);
    bookRoutes(router);
    

    return router;
}

module.exports = loadRoutes;