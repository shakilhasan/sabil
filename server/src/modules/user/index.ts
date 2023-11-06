import {authRouter} from "./auth-controller";
import {userRouter} from "./controller";
import {authenticateRequest, authorizeRequest} from "../../common/middlewares";

import {userModelName} from "./model";

const processRequest = async (req:any, res:any, next:any) => {
  req.modelName = userModelName;
  return next();
};

const init = async (app:any) => {
  app.use("/api/auth", authRouter);
  app.use(
    "/api/users",
    authenticateRequest,
    // authorizeRequest,
    processRequest,
      userRouter
  );
  return app;
};

export { init };
