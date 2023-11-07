import {permissionRouter} from "./controller";
import {authenticateRequest, authorizeRequest} from "../../common/middlewares";
import {permissionModelName} from "./model";

const processRequest = async (req:any, res:any, next:any) => {
  req.modelName = permissionModelName;
  return next();
};

const init = async (app:any) => {
  app.use(
    "/api/permissions",
    authenticateRequest,
    authorizeRequest,
    processRequest,
      permissionRouter
  );
  return app;
};

module.exports = { init };
