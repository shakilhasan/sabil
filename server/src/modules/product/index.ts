import {productRouter} from "./controller";
import {authenticateRequest, authorizeRequest} from "../../common/middlewares";
import {productModelName} from "./model";

const processRequest = async (req:any, res:any, next:any) => {
  req.modelName = productModelName;
  return next();
};

const init = async (app:any) => {
  app.use(
    "/api/products",
    authenticateRequest,
    authorizeRequest,
    processRequest,
      productRouter
  );
  return app;
};

export { init };
