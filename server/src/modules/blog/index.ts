import {router} from "./controller";

import {authenticateRequest, authorizeRequest} from "../../common/middlewares";
import {modelName} from "./model";

const processRequest = async (req:any, res:any, next:any) => {
    req.modelName = modelName;
    return next();
};

const init = async (app:any) => {
    app.use(
        "/api/blogs",
        authenticateRequest,
        // authorizeRequest,
        processRequest,
        router
    );
    return app;
};

module.exports = {init};
