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

const salesOrderRouter = express.Router();

const searchHandler = async (req:any, res:any, next:any) => {
  console.log("salesOrder searchHandler body---------- ", req.body);
  req.searchQuery = getQuery(req.body);
  return baseSearchHandler(req, res, next);
};

const countHandler = async (req:any, res:any, next:any) => {
  req.searchQuery = getQuery(req.body);
  return baseCountHandler(req, res, next);
};

salesOrderRouter.get("/detail", getByIdHandler);
salesOrderRouter.post(
  "/create",
  // handleValidation(validate),
  saveHandler
);
salesOrderRouter.put(
  "/update",
  // handleValidation(validate),
  updateHandler
);

salesOrderRouter.post("/search", searchHandler);
salesOrderRouter.post("/count", countHandler);
salesOrderRouter.delete("/delete", deleteHandler);

export {salesOrderRouter};
