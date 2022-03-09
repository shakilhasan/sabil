const mongoose = require("mongoose");

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "sabil-api";
const DB_PORT = process.env.DB_PORT || "27017";
const PASS = process.env.PASS || '0123456789';

const uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
// const uri = 'mongodb+srv://shakilhasan:0123456789@cluster0.9r8bg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

connectWithDb = () => {
    mongoose.connect(uri, options, (err, db) => {
        if (err) console.error(err);
        else console.log("Connection established with database");
    });
};

module.exports = connectWithDb;
