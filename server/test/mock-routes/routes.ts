import express from "express";

const router = express.Router();
import {router as userMockRoutes} from "./user-controller-mock";
import {router as productMockRoutes} from "./product-controller-mock";
import {router as blogMockRoutes} from "./blog-controller-mock";

router.use("/users", userMockRoutes);
router.use("/products", productMockRoutes);
router.use("/blogs", blogMockRoutes);

export {router};
