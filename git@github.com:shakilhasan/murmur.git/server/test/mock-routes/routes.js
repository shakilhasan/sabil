const express = require("express");

const router = express.Router();
const { router: userMockRoutes } = require("./user-controller-mock");
// const { router: productMockRoutes } = require("./product-controller-mock");
const { router: blogMockRoutes } = require("./blog-controller-mock");

router.use("/users", userMockRoutes);
// router.use("/products", productMockRoutes);
router.use("/blogs", blogMockRoutes);

module.exports = router;
