const { ObjectId } = require("mongoose").Types;
import bcrypt from "bcrypt";
import {NotFound} from "../../common/errors";
import {save, getById, searchOne, dynamicSearch, updateAll, update} from "../../core/repository";

const { Model, name: ModelName } = require("./model");

const changePassword = async (user:any, newPassword:any) => {
  const id = user._id;
  const model = await Model.findById(id);
  if (model) {
    await Model.setPassword(model, newPassword);
    model.updatedAt = Date.now().toString();
    model.save();
    return model._id;
  }

  throw new NotFound(`User not found by the id: ${id}`);
};

const getByUsername = async (username:any) => {
  const item = await Model.findOne({ username }).lean();
  if (item) {
    const { __v, passwordHash, ...rest } = item;
    return rest;
  }
  return null;
};

const checkUser = async (username:any, password:any) => {
  const user = await Model.findOne({ username }).lean(); // status: "Active"
  if (user) {
    const match = await bcrypt.compare(password, user.passwordHash);
    const { __v, passwordHash, ...rest } = user;
    return match ? rest : undefined;
  }

  return undefined;
};

async function getPasswordHash(password:any) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

const createUser = async (user:any) => {
  const passwordHash = await getPasswordHash(user.password);
  const { _id } = await save({ passwordHash, ...user }, ModelName);
  return _id;
};

const tryCreateUser = async (user:any) => {
  const { username, phoneNumber, email } = user;
  const query = {
    $or: [
      // { phoneNumber: { $regex: phoneNumber, $options: "i" } },
      // { email: { $regex: email, $options: "i" } },
      // { username: { $regex: username, $options: "i" } },
      { phoneNumber },
      { email },
      { username },
    ],
  };
  const item = await Model.findOne(query);
  if (item) {
    return false;
  }
  const id = await createUser(user);
  return id;
};

const getQuery = (payload:any) => {
  const createdBySubQuery = {
    $or: [
      { createdBy: ObjectId(payload?.userId) },
      { _id: ObjectId(payload?.userId) },
    ],
  };

  let query = {};
  if (payload?.name && payload?.userId) {
    query = {
      $and: [
        createdBySubQuery,
        {
          $or: [
            { firstName: { $regex: payload.name, $options: "i" } },
            { lastName: { $regex: payload.name, $options: "i" } },
            { username: { $regex: payload.name, $options: "i" } },
          ],
        },
      ],
    };
  } else if(payload?.userId){
    query = createdBySubQuery;
  }

  return query;
};

const searchPermissions = async (roleId:any) => {
  const permissions = await dynamicSearch(
    {
      roleId: ObjectId(roleId),
      isAllowed: true,
    },
    "Permission"
  );
  return permissions;
};

const getPermittedUserById = async (id:any, userId:any) => {
  const user = await getById(id, ModelName);
  if (user) {
    if (
      user._id.toString() === userId ||
      user.createdBy.toString() === userId
    ) {
      return user;
    }
  }
  throw new NotFound(`User not found by the id: ${id}`);
};

export  {
  save,
  getById as getPermittedUserById,
  searchOne,
  changePassword,
  checkUser,
  createUser,
  getByUsername,
  tryCreateUser,
  searchPermissions,
  updateAll,
  update,
  getQuery,
};
