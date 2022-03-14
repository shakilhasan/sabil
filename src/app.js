const express = require("express");
const routes = require('./routes');
const { authenticateRequest, handleRequest, handleError } = require("./middlewares");
const cors = require('cors')
const dotenv = require("dotenv");
const swaggerUI = require('swagger-ui-express')
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
dotenv.config();



app.use(express.json());
app.use(cors())
app.use(handleRequest);
// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));
// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

try {
    // app.use('/', authenticateRequest, routes);
    app.use('/', routes);
}
catch (err) {
    handleError(err);
}


const swaggerDocument = require('./swagger.json')
app.use('/api-documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(handleError);

module.exports = app;
