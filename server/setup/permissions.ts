const { ObjectId } = require("mongoose").Types;
import fs from "fs";
import parser from "jsonc-parser";

const dataStr = fs.readFileSync("./setup/permissions.jsonc", "utf8");

import {save, searchOne, update, updateAll} from "../src/core/repository";
import {permissionModelName} from "../src/modules/permission/model";
import { resourceModelName} from "../src/modules/resource/model";

const seed = async (logger:any) => {
  const data = parser.parse(dataStr);
  await Promise.all(
    data.map(async (item:any) => {
      logger.info(
        `Checking if permission ${item.resourceName} for ${item.roleName} exists`
      );
      const itemExists = await searchOne(
        { resourceName: item.resourceName, roleName: item.roleName },
        permissionModelName
      );
      if (!itemExists) {
        const role = await searchOne({ name: item.roleName }, "Role");
        const resource = await searchOne(
          { name: item.resourceName },
          resourceModelName
        );
        try {
          const savedItem = await save(
            {
              ...item,
              roleId: role._id,
              resourceId: resource._id,
            },
            permissionModelName
          );
          logger.info(`Saved permission id: ${savedItem._id}`);
        } catch (error) {
          logger.error(JSON.stringify(error));
        }
      } else {
        const updatedItem = await update(
          { _id: itemExists._id, ...item },
          permissionModelName
        );
        logger.info(
          `Permission ${item.resourceName} for ${item.roleName} of id ${updatedItem._id} is updated`
        );
      }
    })
  );
  logger.info(`Seeding users finished`);
};

const migrate = async (logger:any) => {
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
    permissionModelName
  );
  logger.info(`Migration of permissions finished`);
};

export{ seed, migrate };
