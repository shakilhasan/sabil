import mongoose from "mongoose";

import {eventEmitter} from "./event-manager";

const save = async (item: any, modelName: any) => {
    const model = new mongoose.models[modelName](item);
    const savedItem = await model.save();
    eventEmitter.emit(`${modelName}Created`, savedItem);
    return savedItem;
};

const update = async (item: any, modelName: any) => {
    const doc = await mongoose.models[modelName].findOneAndUpdate(
        {_id: item._id},
        item
    );
    eventEmitter.emit(`${modelName}Updated`, doc);
    return doc;
};

const updateAll = async (query: any, updateModel: any, modelName: any) => {
    const doc = await mongoose.models[modelName].updateMany(query, updateModel);
    eventEmitter.emit(`${modelName}Updated`, doc);
    return doc;
};

const deleteById = async (id: any, modelName: any) => {
    const model = await mongoose.models[modelName].findById(id);
    if (model) {
        const result = await mongoose.models[modelName].deleteOne({_id: id});
        eventEmitter.emit(`${modelName}Deleted`, model);
        return result;
    }
    throw new Error(`Product not found by the id: ${id}`);
};

const getById = async (id: any, modelName: any) => {
    const model = await mongoose.models[modelName].findById(id);
    if (model == null) {
        throw new Error(`${modelName} not found by the id: ${id}`);
    }
    return model;
};

const searchOne = async (query: any, modelName: any) => {
    return await mongoose.models[modelName].findOne(query).lean().exec();
};

const dynamicSearch = async (query: any, modelName: any) => {
    const data = await mongoose.models[modelName].find(query).lean().exec();
    return data;
};

const getSortClause = (payload: any) => {
    let sort: any = {};
    if (payload.sort) {
        const key = payload.sort;
        sort[key] = parseInt(payload.order, 10) ?? 1;
    } else {
        sort = {updatedAt: -1};
    }
    return sort;
};

const count = async (query: any, modelName: any) => {
    const data = await mongoose.models[modelName].find(query).count();
    return data;
};
const countDocuments = async (modelName: any) => {

    return mongoose.models[modelName].countDocuments();
};

const getAll = async (modelName: any) => {  // todo - remove later
    const data = await mongoose.models[modelName].find();
    return data;
};

const search = async (payload: any, query: any, modelName: any) => {
    const sort = getSortClause(payload);
    const take = parseInt(payload?.pageSize ?? process.env.DEFAULT_PAGE_SIZE, 10);
    const skip = (parseInt(payload?.current, 10) - 1) * take;

    return mongoose.models[modelName]
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(take);
};

const getDropdownData = async (query: any, project: any, modelName: any) => {
    return await mongoose.models[modelName]
        .find(query)
        .select(project)
        .sort(project)
        .lean()
        .exec();
};

export {
    getAll,
    save,
    update,
    deleteById,
    getById,
    searchOne,
    dynamicSearch,
    updateAll,
    getSortClause,
    count,
    countDocuments,
    search,
    getDropdownData,
};
