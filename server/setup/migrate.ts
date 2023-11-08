import mongoose from "mongoose";
require("dotenv").config();
import {logger} from "../src/core/logger";

import {migrate as userMigrate} from "./users";
import {migrate as resourceMigrate} from "./resources";
import {migrate as roleMigrate} from "./roles";
import {migrate as permissionMigrate} from "./permissions";

logger.info("Migration starting");
const isMongoDbUrl = JSON.parse(
  process.env.IS_MONGODB_CLOUD_URL ? process.env.IS_MONGODB_CLOUD_URL : "false"
);
const uri:any = isMongoDbUrl
  ? process.env.MONGODB_CLOUD_URL
  : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const migrate = async () => {
  logger.info("Connecting to database");
  mongoose.connect(uri, options);
  logger.info("Connected to MongoDB");
  await userMigrate(logger);
  await resourceMigrate(logger);
  await roleMigrate(logger);
  await permissionMigrate(logger);
  logger.info(`Migration finished`);
  process.exit(0);
};

migrate();
