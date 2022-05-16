const listEndpoints = require("express-list-endpoints");
// const mongoose = require("mongoose");
const { Model: Resource } = require("../modules/resource/model");

const generateResource = async (app) => {
  const endpoints = listEndpoints(app);
  const resources = endpoints.map((d) => ({
    name: d.path,
    alias: `${d.path.split("/")?.[2] ?? ""}-${d.path.split("/")?.[3] ?? ""}`,
    type: "api",
  }));

  // const resource = await mongoose.models["Resource"].insertMany(all);
  try {
    const resource = await Resource.insertMany(resources);
    console.log("resource--", resource);
  } catch (error) {
    console.log("error--", error);
  }
};
module.exports = {
  generateResource,
};
