const express = require('express');
const loader = require('./loaders');

const startServer = () => {
    const app = express();
    loader(app);

    app.listen(process.env.PORT, err => {
        if(err) {
            process.exit(1);
        }

        console.log(`Server listening on port: ${ process.env.PORT }`);
    });
}

startServer();