const express = require('express');
const controller = require('../controllers');
const {handleValidation} = require("../middlewares");
const validators = require("../models/request-models");

const router = express.Router();
const ContactController = controller.contactController;

router.get("/", ContactController.getHandler);
// router.get("/:page/:pageSize", ContactController.findByPagination);
router.post('/search', ContactController.searchHandler);
router.get("/:id", ContactController.getByIdHandler);
// router.post("/", ContactController.store);
router.post("/",handleValidation(validators.contactSchemaValidate), ContactController.postHandler);
router.put("/:id", ContactController.putHandler);
router.delete("/:id", ContactController.deleteHandler);

module.exports = router;
