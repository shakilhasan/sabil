import {paymentRouter} from "./controller";
import {authenticateRequest, authorizeRequest} from "../../common/middlewares";
const { name: ModelName } = require("./model");

const processRequest = async (req:any, res:any, next:any) => {
  req.modelName = ModelName;
  return next();
};

const init = async (app:any) => {
  app.use(
    "/api/payments",
    authenticateRequest,
    // authorizeRequest,
    processRequest,
      paymentRouter
  );
  return app;
};

export { init };
