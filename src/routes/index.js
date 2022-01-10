const express = require('express');
const contactRoutes = require('./contact-route');

let router = express.Router();
router.use('/contact', contactRoutes);

module.exports = router;
