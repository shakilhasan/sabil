/* eslint-disable no-undef */
import express from "express";
import mongoose from "mongoose";
import eventEmitter from "nodemon";
import {tryCreateUser, searchOne, getQuery} from "./service";
import {
  getByIdHandler,
  updateHandler,
  searchHandler as baseSearchHandler,
  countHandler as baseCountHandler,
  deleteHandler
} from "../../core/controller";
import {validateUserCreate} from "./request";
import {handleValidation} from "../../common/middlewares";
import {userModelName} from "./model";

const userRouter = express.Router();

// add user
const saveHandler = async (req:any, res:any, next:any) => {
  try {
    const user = req.body;
    const id = await tryCreateUser(user);
    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "User already exists by username or email or phone number.",
      });
    }
    return res
      .status(201)
      .send({ status: "ok", message: "User created successfully", id });
  } catch (error) {
    return next(error);
  }
};

const searchHandler = async (req:any, res:any, next:any) => {
  const query = {
    ...req.body,
    // userId: req.user.id // todo - uncomment if needed
  };
  req.searchQuery = getQuery(query);
  return baseSearchHandler(req, res, next);
};

const countHandler = async (req:any, res:any, next:any) => {
  const query = { ...req.body, userId: req.user.id };
  req.searchQuery = getQuery(query);
  return baseCountHandler(req, res, next);
};

const checkUserHandler = async (req:any, res:any) => {
  if (req.body) {
    const user = await searchOne(req.body, userModelName);
    if (user) {
      return res.status(200).send({ status: "success", message: "User found" });
    }
  }
  return res.status(200).send({ status: "error", message: "User not found" });
};

const processRequestForAccount = async (req:any, res:any, next:any) => {
  // todo - remove if unnecessary
  req.query.id = req.user.id;
  return next();
};
const updateFollowHandler = async (req:any) => {
  const { body } = req;
  const doc = null;
  if (body.toggle) {
    await mongoose.models[req.modelName].findOneAndUpdate(
      { _id: req.user.id, followings: { $ne: body.id } },
      { $push: { followings: body.id } }
    );
    await mongoose.models[req.modelName].findOneAndUpdate(
      { _id: body.id, followers: { $ne: req.user.id } },
      { $push: { followers: req.user.id } }
    );
  } else {
    await mongoose.models[req.modelName].findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { followings: body.id } }
    );
    await mongoose.models[req.modelName].findOneAndUpdate(
      { _id: body.id },
      { $pull: { followers: req.user.id } }
    );
  }

  console.log(req.user.id, "-------------", body.id);
  eventEmitter.emit(`${req.modelName} Updated follow`, doc);
  return doc;
};
userRouter.get("/account", processRequestForAccount, getByIdHandler); // todo - remove if unnecessary
userRouter.get("/detail", getByIdHandler);
userRouter.post("/create",
    // handleValidation(validateUserCreate), // todo - uncomment when ready
    saveHandler);
userRouter.put(
  "/update",
  // handleValidation(validateUserUpdate),  // todo - uncomment when ready
  updateHandler
);
userRouter.put("/updateFollow", updateFollowHandler);
userRouter.post("/search", searchHandler);
userRouter.post("/count", countHandler);
userRouter.delete("/delete", deleteHandler);
userRouter.post("/check", checkUserHandler);

export {
  userRouter
};
