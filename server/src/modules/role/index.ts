import {roleRouter} from "./controller";
import {authenticateRequest, authorizeRequest} from "../../common/middlewares";

import {roleModelName} from "./model";

const processRequest = async (req: any, res: any, next: any) => {
    req.modelName = roleModelName;
    return next();
};

const init = async (app: any) => {
    app.use(
        "/api/roles",
        authenticateRequest,
        // authorizeRequest,
        processRequest,
        roleRouter
    );
    return app;
};

export {init};
