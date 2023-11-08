import {salesOrderRouter} from "./controller";
import {authenticateRequest, authorizeRequest} from "../../common/middlewares";
import {blogModelName} from "./model";

const processRequest = async (req:any, res:any, next:any) => {
  req.modelName = blogModelName;
  return next();
};

const init = async (app:any) => {
  app.use(
    "/api/sales-orders",
    authenticateRequest,
    // authorizeRequest,
    processRequest,
      salesOrderRouter
  );
  return app;
};

export { init };
