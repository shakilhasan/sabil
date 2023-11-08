import {customerRouter} from "./controller";
import {authenticateRequest} from "../../common/middlewares";

const init = async (app:any) => {
  app.use("/api/customers", authenticateRequest, customerRouter);
  return app;
};

export { init };
