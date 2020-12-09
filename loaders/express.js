const bodyParser = require("body-parser");
const loadRoutes = require("../api");

const expressLoader = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(loadRoutes());

}

module.exports = expressLoader;