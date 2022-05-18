const express = require("express");

const router = express.Router();
const { router: userMockRoutes } = require("./user-controller-mock");
const { router: productMockRoutes } = require("./product-controller-mock");

router.use("/users", userMockRoutes);
router.use("/products", productMockRoutes);

module.exports = router;
