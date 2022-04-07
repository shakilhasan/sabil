const express = require('express');
let router = express.Router();
const productMockRoutes = require('./product-controller-mock');

router.use('/product',productMockRoutes);

module.exports = router;
