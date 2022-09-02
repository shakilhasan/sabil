const { ObjectId } = require("mongoose").Types;
const fs = require("fs");
const parser = require("jsonc-parser");

const dataStr = fs.readFileSync("./setup/permissions.jsonc", "utf8");

const {
  save,
  searchOne,
  update,
  updateAll,
} = require("../src/core/repository");
const { name: permissionModel } = require("../src/modules/permission/model");
const { name: resourceModel } = require("../src/modules/resource/model");

const seed = async (logger) => {
  const data = parser.parse(dataStr);
  await Promise.all(
    data.map(async (item) => {
      logger.info(
        `Checking if permission ${item.resourceName} for ${item.roleName} exists`
      );
      const itemExists = await searchOne(
        { resourceName: item.resourceName, roleName: item.roleName },
        permissionModel
      );
      if (!itemExists) {
        const role = await searchOne({ name: item.roleName }, "Role");
        const resource = await searchOne(
          { name: item.resourceName },
          resourceModel
        );
        try {
          const savedItem = await save(
            {
              ...item,
              roleId: role._id,
              resourceId: resource._id,
            },
            permissionModel
          );
          logger.info(`Saved permission id: ${savedItem._id}`);
        } catch (error) {
          logger.error(JSON.stringify(error));
        }
      } else {
        const updatedItem = await update(
          { _id: itemExists._id, ...item },
          permissionModel
        );
        logger.info(
          `Permission ${item.resourceName} for ${item.roleName} of id ${updatedItem._id} is updated`
        );
      }
    })
  );
  logger.info(`Seeding users finished`);
};

const migrate = async (logger) => {
  logger.info(`Starting migration of permissions`);
  const superadminUser = await searchOne({ username: "superadmin@sabil.com" }, "User");
  if (!superadminUser) {
    throw new Error("Superadmin user not found");
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
    permissionModel
  );
  logger.info(`Migration of permissions finished`);
};

module.exports = { seed, migrate };
