const {
    getAll,
    save,
    update,
    deleteById,
    getById,
    search
} = require("../services/contact-service");
const { NotFound } = require("../utils/errors");


const getHandler = async (req, res, next) => {
    try {
        const contacts = await getAll();
        res.status(200).send(contacts);
    } catch (error) {
        return next(error, req, res);
    }
};
const searchHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const result = await search(body);
        res.status(200).send(result);
    } catch (error) {
        return next(error, req, res);
    }
};
const getByIdHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        const contact = await getById(id);
        if (contact) {
            res.status(200).send(contact);
        } else {
            throw new NotFound("Contact not found by the id: " + id);
        }
    } catch (error) {
        return next(error, req, res);
    }
};

const postHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const id = await save(body);
        res.status(201).send(id);
    } catch (error) {
        return next(error, req, res);
    }
};

const putHandler = async (req, res, next) => {
    try {
        const body = {...req.body, ...req.params.id };
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
        res.status(200).send("Contact deleted");
    } catch (error) {
        return next(error, req, res);
    }
};


module.exports = { searchHandler, getHandler, getByIdHandler, postHandler, putHandler, deleteHandler  };
