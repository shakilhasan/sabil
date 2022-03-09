const express = require('express');
const controller = require('../controllers');
const {handleValidation} = require("../middlewares");
const validators = require("../models/request-models");

const router = express.Router();
const contactController = controller.contactController;

router.get("/", contactController.getHandler);
// router.get("/:page/:pageSize", contactController.findByPagination);
router.post('/search', contactController.searchHandler);
router.get("/:id", contactController.getByIdHandler);
// router.post("/", contactController.store);
router.post("/",handleValidation(validators.contactSchemaValidate), contactController.postHandler);
router.put("/:id", contactController.putHandler);
router.delete("/:id", contactController.deleteHandler);

module.exports = router;
