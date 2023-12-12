import mongoose from "mongoose";
import {logger} from "../src/core/logger";
import {migrate as userMigrate} from "./users";
import {migrate as resourceMigrate} from "./resources";
import {migrate as roleMigrate} from "./roles";
import {migrate as permissionMigrate} from "./permissions";
import config from "config";

require("dotenv").config();
logger.info("Migration starting");
const IS_MONGODB_CLOUD_URL: boolean = config.get<boolean>("db.is_mongodb_cloud_url");
const MONGODB_CLOUD_URL: boolean = config.get<boolean>("db.mongodb_cloud_url");
const DB_HOST: boolean = config.get<boolean>("db.host");
const DB_PORT: boolean = config.get<boolean>("db.port");
const DB_NAME: boolean = config.get<boolean>("db.name");
const isMongoDbUrl = IS_MONGODB_CLOUD_URL ? IS_MONGODB_CLOUD_URL : false
const uri: any = isMongoDbUrl ? MONGODB_CLOUD_URL : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const options = {useNewUrlParser: true, useUnifiedTopology: true};

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
