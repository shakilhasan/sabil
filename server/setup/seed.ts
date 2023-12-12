import mongoose from "mongoose";
import { seedRoles} from "./role";
import {seed as seedUsers} from "./user";
import {seed as seedProducts} from "./products";
import {seed as seedResources} from "./resources";
import {seed as seedPermissions} from "./permissions";
import config from "config";
require("dotenv").config();
import {logger} from "../src/core/logger";
const IS_MONGODB_CLOUD_URL:boolean = config.get<boolean>("db.is_mongodb_cloud_url");
const MONGODB_CLOUD_URL:string = config.get<string>("db.mongodb_cloud_url");
const DB_HOST:string = config.get<string>("db.host");
const DB_PORT:number = config.get<number>("db.port");
const DB_NAME:string = config.get<string>("db.name");

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
    console.log("seed error:>",error)
    logger.error(error);
    process.exit(0);
  }
};

seed();
logger.info(`Seed finished`);
