const express = require('express');
const contactRoutes = require('./contact-controller');
const productRoutes =require('./product-controller')
const userRoutes =require('./user-controller')
const authRoutes =require('./auth-controller')

let router = express.Router();
router.use('/contact', contactRoutes);
router.use('/product',productRoutes);
router.use('/user',userRoutes);
router.use('/auth',authRoutes);

module.exports = router;
