const dotenv = require('dotenv');
const expressLoader = require('./express');
const loadDB = require('./database');

const loader = (app) => {
    dotenv.config();
    loadDB();
    expressLoader(app);
}

module.exports = loader;