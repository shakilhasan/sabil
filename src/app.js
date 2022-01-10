const express = require("express");
const routes = require('./routes');
const { authenticateRequest, handleRequest, handleError } = require("./middlewares");
const cors = require('cors')
const dotenv = require("dotenv");
const swaggerUI = require('swagger-ui-express')

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors())
app.use(handleRequest);
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
