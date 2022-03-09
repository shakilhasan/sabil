const express = require('express');
const contactRoutes = require('./contact-route');
const productRoutes =require('./product-route')

let router = express.Router();
router.use('/contact', contactRoutes);
router.use('/product',productRoutes);

module.exports = router;
