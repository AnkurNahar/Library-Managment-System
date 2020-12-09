const bodyParser = require("body-parser");
const loadRoutes = require("../api");

const expressLoader = (app) => {
    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(loadRoutes());

}

module.exports = expressLoader;