import mongoose from "mongoose";
import {logger} from "../src/core/logger";
import {migrate as userMigrate} from "./user";
import {migrate as resourceMigrate} from "./resources";
import {migrate as roleMigrate} from "./role";
import {migrate as permissionMigrate} from "./permissions";
import config from "config";

require("dotenv").config();
logger.info("Migration starting");
const IS_MONGODB_CLOUD_URL:boolean = config.get<boolean>("db.is_mongodb_cloud_url");
const MONGODB_CLOUD_URL:string = config.get<string>("db.mongodb_cloud_url");
const DB_HOST:string = config.get<string>("db.host");
const DB_PORT:number = config.get<number>("db.port");
const DB_NAME:string = config.get<string>("db.name");
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
