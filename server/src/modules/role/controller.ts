import express from "express";
import {getQuery} from "./service";
import {
    countHandler as baseCountHandler,
    deleteHandler,
    getByIdHandler,
    saveHandler,
    searchHandler as baseSearchHandler,
    updateHandler
} from "../../core/controller";
import {validate} from "./request";
import {handleValidation} from "../../common/middlewares";

const roleRouter = express.Router();

const searchHandler = async (req: any, res: any, next: any) => {
    req.searchQuery = getQuery({...req.body, userId: req.user.id});
    return baseSearchHandler(req, res, next);
};

const countHandler = async (req: any, res: any, next: any) => {
    req.searchQuery = getQuery({...req.body, userId: req.user.id});
    return baseCountHandler(req, res, next);
};

roleRouter.get("/detail", getByIdHandler);
roleRouter.post("/create", handleValidation(validate), saveHandler);
roleRouter.put("/update", handleValidation(validate), updateHandler);
roleRouter.post("/search", searchHandler);
roleRouter.post("/count", countHandler);
roleRouter.delete("/delete", deleteHandler);

export {roleRouter};
