const mongoose = require('mongoose');

const loadDB = () => {
    try{
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true
          });
    }catch(err){
        console.log(err);
    }
};

module.exports = loadDB;