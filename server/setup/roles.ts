import {roleModelName} from "../src/modules/role/model";

const { ObjectId } = require("mongoose").Types;
const data = require("./roles.json");
import {save, searchOne, updateAll} from "../src/core/repository";

const seed = async (logger:any) => {
  await Promise.all(
    data.map(async (item:any) => {
      logger.info(`Checking if ${roleModelName} ${item.name} exists`);
      const itemExists = await searchOne({ name: item.name }, roleModelName);
      if (!itemExists) {
        const savedItem = await save(item, roleModelName);
        logger.info(`Saved role id: ${savedItem._id}`);
      } else {
        logger.info(`${roleModelName} ${item.name} already exists`);
      }
    })
  );
  logger.info(`Seeding ${roleModelName} finished`);
};

const migrate = async (logger:any) => {
  logger.info(`Starting migration of ${roleModelName}`);
  const superadminUser = await searchOne({ username: "superadmin@sabil.com" }, "User");
  if (!superadminUser) {
    throw new Error(`Superadmin user not found`);
  }

  await updateAll(
    {
      $or: [
        { createdBy: { $exists: false } },
        { createdBy: ObjectId("303030303030303030303030") },
      ],
    },
    {
      createdBy: superadminUser._id,
      updatedBy: superadminUser._id,
    },
    roleModelName
  );
  logger.info(`Migration of ${roleModelName} finished`);
};

export { seed, migrate };
