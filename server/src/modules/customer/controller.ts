import express from "express";
import {save, update, deleteById, getById} from "./service";
import {validate} from "./request";
import {handleValidation} from "../../common/middlewares";
import {NotFound} from "../../common/errors";

const customerRouter = express.Router();
const ModelName = "Customer";

const getHandler = async (req:any, res:any, next:any) => {
  try {
    const items = [
      { id: 1, name: "Customer 1" },
      { id: 2, name: "Customer 2" },
    ];
    const result = {
      data: items,
      total: items.length,
      success: true,
    };
    return res.status(200).send(result);
  } catch (error) {
    return next(error, req, res);
  }
};

const getByIdHandler = async (req:any, res:any, next:any) => {
  try {
    const { id } = req.params;
    const item = await getById(id, ModelName);
    if (!item) {
      throw new NotFound(`${ModelName} not found by the id: ${id}`);
    }
    return res.status(200).send(item);
  } catch (error) {
    return next(error, req, res);
  }
};

const postHandler = async (req:any, res:any, next:any) => {
  try {
    const { body } = req;
    const { _id } = await save(body, ModelName);
    return res.status(201).send(_id);
  } catch (error) {
    return next(error, req, res);
  }
};

const putHandler = async (req:any, res:any, next:any) => {
  try {
    const { body } = req;
    const { _id } = await update(body, ModelName);
    return res.status(200).send(_id);
  } catch (error) {
    return next(error, req, res);
  }
};

const deleteHandler = async (req:any, res:any, next:any) => {
  try {
    const { id } = req.params;
    await deleteById(id, ModelName);
    return res.status(200).send(`${ModelName} deleted`);
  } catch (error) {
    return next(error, req, res);
  }
};

customerRouter.get("/", getHandler);
customerRouter.get("/:id", getByIdHandler);
customerRouter.post("/", handleValidation(validate), postHandler);
customerRouter.put("/:id", putHandler);
customerRouter.delete("/:id", deleteHandler);

export {customerRouter};
