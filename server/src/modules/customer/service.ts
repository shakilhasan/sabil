// load repository.js functions
import {save, update, getById, deleteById} from "../../core/repository";
import {eventEmitter} from "../../core/event-manager";

const modelName = "Customer";

const setupEventListeners = () => {
  eventEmitter.on(`${modelName}Created`, (model:any) => {
    // eslint-disable-next-line no-console
    console.log(`${modelName} created`, model);
  });

  eventEmitter.on(`${modelName}Updated`, (model:any) => {
    // eslint-disable-next-line no-console
    console.log(`${modelName} updated`, model);
  });

  eventEmitter.on(`${modelName}Deleted`, (model:any) => {
    // eslint-disable-next-line no-console
    console.log(`${modelName} deleted`, model);
  });
};

setupEventListeners();

export { save, update, deleteById, getById };
