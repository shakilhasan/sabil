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

const permissionRouter = express.Router();

const searchHandler = async (req:any, res:any, next:any) => {
  req.searchQuery = getQuery({ ...req.body, userId: req.user.id });
  return baseSearchHandler(req, res, next);
};

const countHandler = async (req:any, res:any, next:any) => {
  req.searchQuery = getQuery({ ...req.body, userId: req.user.id });
  return baseCountHandler(req, res, next);
};

permissionRouter.get("/detail", getByIdHandler);
permissionRouter.post("/create", handleValidation(validate), saveHandler);
permissionRouter.put("/update", handleValidation(validate), updateHandler);
permissionRouter.post("/search", searchHandler);
permissionRouter.post("/count", countHandler);
permissionRouter.delete("/delete", deleteHandler);

export {permissionRouter};
