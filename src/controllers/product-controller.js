const express = require("express");
const {
    getAll, save, update, search, getById, getByName, deleteById
} = require('../services/product-service');
const {NotFound} = require("../utilities/errors");
const {handleValidation} = require("../middlewares");
const validators = require("../models/request-models");
const fileUpload = require("../middlewares/file/fileUpload");

const router = express.Router();

const getHandler = async (req, res, next) => {
    try {
        const products = await getAll();
        res.status(200).send(products);
    } catch (error) {
        return next(error, req, res);
    }
};

const searchHandler = async (req, res, next) => {
    try {
        // const body = req.body;
        const searchQuery = req.query.query;
        console.log("searchHandler-",searchQuery);
        const results = await search(searchQuery);
        res.status(200).send({results});
    } catch (error) {
        return next(error, req, res);
    }
};

const getByIdHandler = async (req, res, next) => {
    try {
        const _id = req.params.id;
        console.log("getByIdHandler-",_id);
        const product = await getById(_id);
        if (product) {
            res.status(200).send({product});
        } else {
            throw new NotFound('Product not found by the id: ' + _id);
        }
    } catch (error) {
        return next(error, req, res);
    }
};

const getByNameHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await getByName(id);
        if (product) {
            res.status(200).send({product});
        } else {
            throw new NotFound('Product not found by the id: ' + id);
        }
    } catch (error) {
        return next(error, req, res);
    }
};

const postHandler = async (req, res, next) => {
    try {
        // save message text/attachment in database
        let files = null;

        if (req.files && req.files.length > 0) {
            files= [];

            req.files.forEach((file) => {
                files.push(file.filename);
            });
        }

        const body = req.body;
        body.createdAt = new Date();
        body.files = files;
        body.updatedAt = new Date();
        const id = await save(body);
        res.status(201).send(id);
    } catch (error) {
        return next(error, req, res);
    }
};

const putHandler = async (req, res, next) => {
    try {
        const body = {...req.body, _id: req.params.id};
        const id = await update(body);
        res.status(200).send(id);
    } catch (error) {
        return next(error, req, res);
    }
};

const deleteHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteById(id);
        res.status(200).send('Contact deleted');
    } catch (error) {
        return next(error, req, res)
    }
}

router.get('/', getHandler);
// router.get('/:page/:pageSize', findByPagination);
router.get('/search', searchHandler);
router.get('/:id', getByIdHandler);
// router.get('/:name', getByNameHandler);
// router.post('/', postHandler);
router.post('/', handleValidation(validators.productValidate),fileUpload, postHandler);
router.put('/:id', putHandler)
router.delete('/:id', deleteHandler);

module.exports = router;
