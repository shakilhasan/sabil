import fs from "fs";
import * as jsonc from 'jsonc-parser';
const dataStr = fs.readFileSync("./setup/resources.jsonc", 'utf-8');
import {save, searchOne, updateAll} from "../src/core/repository";
import {resourceModelName} from "../src/modules/resource/model";

const seed = async (logger:any) => {
    try {
        const data = jsonc.parse(dataStr);
        await Promise.all(
            data.map(async (item:any) => {
                logger.info(`Checking if ${resourceModelName} ${item.name} exists`);
                const itemExists = await searchOne({ name: item.name }, resourceModelName);
                if (!itemExists) {
                    const savedItem = await save(item, resourceModelName);
                    logger.info(`Saved role id: ${savedItem._id}`);
                } else logger.info(`${resourceModelName} ${item.name} already exists`);
            })
        );
        logger.info(`${resourceModelName} seeding finished`);
    }catch (error) {
        console.log("seedResources error:>",error)
        logger.error(error);
    }

};

const migrate = async (logger:any) => {
  logger.info(`${resourceModelName} starting`);
  const superadminUser = await searchOne({ username: "superadmin@sabil.com" }, "User");
  if (!superadminUser) {
    throw new Error("Superadmin user not found");
  }

  await updateAll(
    {},
    {
      createdBy: superadminUser._id,
      updatedBy: superadminUser._id,
    },
    resourceModelName
  );
  logger.info(`${resourceModelName} seeding finished`);
};

export  { seed, migrate };
