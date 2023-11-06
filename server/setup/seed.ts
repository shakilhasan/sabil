import mongoose from "mongoose";
require("dotenv").config();
import {logger} from "../src/core/logger";

logger.info("Seed starting");

// seed roles
import {seed as seedRoles} from "./roles";

// seed users
import {seed as seedUsers} from "./users";

// seed products
import {seed as seedProducts} from "./products";

// seed resources
const { seed: seedResources } = require("./resources");

// seed permissions
const { seed: seedPermissions } = require("./permissions");

const isMongoDbUrl = JSON.parse(
  process.env.IS_MONGODB_CLOUD_URL ? process.env.IS_MONGODB_CLOUD_URL : "false"
);
const uri = isMongoDbUrl
  ? process.env.MONGODB_CLOUD_URL
  : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
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
    logger.error(JSON.stringify(error));
    process.exit(0);
  }
};

seed();
logger.info(`Seed finished`);
