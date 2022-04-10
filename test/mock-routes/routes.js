const express = require("express");

const router = express.Router();
const { router: productMockRoutes } = require("./product-controller-mock");

router.use("/products", productMockRoutes);

module.exports = router;
