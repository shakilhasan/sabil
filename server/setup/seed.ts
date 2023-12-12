import mongoose from "mongoose";
import {seed as seedRoles} from "./roles";
import {seed as seedUsers} from "./users";
import {seed as seedProducts} from "./products";
import {seed as seedResources} from "./resources";
import {seed as seedPermissions} from "./permissions";
import config from "config";
require("dotenv").config();
import {logger} from "../src/core/logger";
const IS_MONGODB_CLOUD_URL:boolean = config.get<boolean>("db.is_mongodb_cloud_url");
const MONGODB_CLOUD_URL:boolean = config.get<boolean>("db.mongodb_cloud_url");
const DB_HOST:boolean = config.get<boolean>("db.host");
const DB_PORT:boolean = config.get<boolean>("db.port");
const DB_NAME:boolean = config.get<boolean>("db.name");

logger.info("Seed starting");

const isMongoDbUrl = IS_MONGODB_CLOUD_URL ? IS_MONGODB_CLOUD_URL : false
const uri:any = isMongoDbUrl ? MONGODB_CLOUD_URL : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const seed = async () => {
  try {
    logger.info("Connecting to database");
    await mongoose.connect(uri, options);
    logger.info("Connected to MongoDB");

    await seedResources(logger);
    await seedRoles(logger);
    await seedUsers(logger);
    await seedPermissions(logger);
    await seedProducts(logger);

    logger.info(`Seed finished`);
    // exit process
    process.exit(0);
  } catch (error) {
    logger.error(error);
    process.exit(0);
  }
};

seed();
logger.info(`Seed finished`);
