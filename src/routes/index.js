const express = require('express');
const contactRoutes = require('./contact-route');
const productRoutes =require('./product-route')
const userRoutes =require('./user-route')
const authRoutes =require('./auth-route')

let router = express.Router();
router.use('/contact', contactRoutes);
router.use('/product',productRoutes);
router.use('/user',userRoutes);
router.use('/auth',authRoutes);

module.exports = router;
