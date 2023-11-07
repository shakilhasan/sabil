import express from "express";
import {getQuery} from "./service";
import {
  getByIdHandler,
  saveHandler,
  updateHandler,
  searchHandler as baseSearchHandler,
  countHandler as baseCountHandler,
  deleteHandler
} from "../../core/controller";
import {validate} from "./request";
import {handleValidation} from "../../common/middlewares";
import {Resource} from "./model";

const resourceRouter = express.Router();

const searchHandler = async (req:any, res:any, next:any) => {
  req.searchQuery = getQuery(req.body);
  return baseSearchHandler(req, res, next);
};

const countHandler = async (req:any, res:any, next:any) => {
  req.searchQuery = getQuery(req.body);
  return baseCountHandler(req, res, next);
};
const saveManyHandler = async (req:any, res:any, next:any) => {
  try {
    const resource = await Resource.insertMany(req.body);
    console.log("resource--", resource);
    return res.status(201).send(resource);
  } catch (error) {
    console.log("error--", error);
    return next(error, req, res);
  }
};
resourceRouter.get("/detail", getByIdHandler);
resourceRouter.post("/createMany", saveManyHandler);  // todo - remove later if unnecessary
resourceRouter.post("/create", handleValidation(validate), saveHandler);
resourceRouter.put("/update", handleValidation(validate), updateHandler);
resourceRouter.post("/search", searchHandler);
resourceRouter.post("/count", countHandler);
resourceRouter.delete("/delete", deleteHandler);

export {resourceRouter};
