import {resourceRouter} from "./controller";
import {authenticateRequest, authorizeRequest} from "../../common/middlewares";

import {resourceModelName} from "./model";

const processRequest = async (req:any, res:any, next:any) => {
  req.modelName = resourceModelName;
  return next();
};

const init = async (app:any) => {
  app.use(
    "/api/resources",
    authenticateRequest,
    // authorizeRequest,
    processRequest,
      resourceRouter
  );
  return app;
};

export { init };
