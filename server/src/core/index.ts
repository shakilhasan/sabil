import {logger} from "./logger";
import {eventEmitter} from "./event-manager";
import {app} from "./app";
import {connectWithDb} from "./mongo";

const setup = async () => {
  return { app, eventEmitter, connectWithDb, logger };
};

export  { setup };
