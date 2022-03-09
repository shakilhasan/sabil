const express = require('express');
const controller = require('../controllers');
const {handleValidation} = require('../middlewares');
const validators = require('../models/request-models');

const router = express.Router();
const productController = controller.productController;

router.get('/', productController.getHandler);
// router.get('/:page/:pageSize', productController.findByPagination);
router.post('/search', productController.searchHandler);
router.get('/:id', productController.getByIdHandler);
// router.post('/', productController.postHandler);
router.post('/', handleValidation(validators.productValidate), productController.postHandler);
router.put('/:id', productController.putHandler)
router.delete('/:id', productController.deleteHandler);

module.exports = router;
