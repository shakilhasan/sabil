import {NotFound} from "../common/errors";
import {count, countDocuments, deleteById, getById, getDropdownData, save, search, update} from "./repository";

const getByIdHandler = async (req: any, res: any, next: any) => {
    try {
        const ModelName = req.modelName;
        const {id} = req.query;
        const item = await getById(id, ModelName);
        if (item) {
            return res.status(200).send(item);
        }
        throw new NotFound(`${ModelName} not found by the id: ${id}`);
    } catch (error) {
        return next(error, req, res);
    }
};

const searchHandler = async (req: any, res: any, next: any) => {
    try {
        const ModelName = req.modelName;
        const {body} = req;
        req.log.info({body}, `search ${ModelName}`);
        const total = await countDocuments(ModelName);
        const data =
            body.pageSize === -1
                ? await getDropdownData(
                    req.searchQuery,
                    {alias: 1, name: 1},
                    ModelName
                )
                : await search(body, req.searchQuery, ModelName);
        return res.status(200).send({data, total});
    } catch (error) {
        return next(error, req, res);
    }
};

const countHandler = async (req: any, res: any, next: any) => {
    try {
        const ModelName = req.modelName;
        const {body} = req;
        req.log.info({body}, `count ${ModelName}`);
        const result = await count(req.searchQuery, ModelName);
        const response = {success: true, total: result};
        return res.status(200).send(response);
    } catch (error) {
        return next(error, req, res);
    }
};

const saveHandler = async (req: any, res: any, next: any) => {
    try {
        const ModelName = req.modelName;
        const {body} = req;
        const id = await save(body, ModelName);
        req.log.info({id}, `${ModelName} created`);
        return res.status(201).send(id);
    } catch (error) {
        return next(error, req, res);
    }
};

const updateHandler = async (req: any, res: any, next: any) => {
    try {
        const ModelName = req.modelName;
        const {body} = req;
        const id = await update(body, ModelName);
        return res.status(200).send(id);
    } catch (error) {
        return next(error, req, res);
    }
};

const deleteHandler = async (req: any, res: any, next: any) => {
    try {
        const ModelName = req.modelName;
        const {id} = req.query;
        await deleteById(id, ModelName);
        return res
            .status(200)
            .send({success: true, message: `${ModelName} deleted`});
    } catch (error) {
        return next(error, req, res);
    }
};

export {
    getByIdHandler,
    searchHandler,
    countHandler,
    saveHandler,
    updateHandler,
    deleteHandler,
};
