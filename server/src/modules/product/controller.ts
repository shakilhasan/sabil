/* eslint-disable no-undef */
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

const productRouter = express.Router();

const searchHandler = async (req:any, res:any, next:any) => {
  req.searchQuery = getQuery(req.body);
  return baseSearchHandler(req, res, next);
};

const countHandler = async (req:any, res:any, next:any) => {
  req.searchQuery = getQuery(req.body);
  return baseCountHandler(req, res, next);
};

productRouter.get("/detail", getByIdHandler);
productRouter.post(
  "/create",
  // handleValidation(validate),
  saveHandler
);
productRouter.put("/update", handleValidation(validate), updateHandler);
productRouter.post("/search", searchHandler);
productRouter.post("/count", countHandler);
productRouter.delete("/delete", deleteHandler);

export {productRouter};
