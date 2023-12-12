import {setup as setupCore} from "./core";
import {init} from "./modules";
import {handleError, handleRequest} from "./common/middlewares";
// todo: remove in production
import {router as mockRoutes} from "../test/mock-routes/routes";
import config from "config";
import {generateResource} from "./common/utils";
const PORT = config.get<number>("server.port");

const start = async () => {
    const initModules = async (app: any) => await init(app);

    const configureRoutes = async (app: any) => {
        app.use(handleRequest);
        const app2 = await initModules(app);
        app2.get("/", (req: any, res: any) => {
            res.send("Hello World!");
        });

        console.log(" routes", app2._router.stack);
        // todo: remove in production
        app2.use("/mock", mockRoutes);
        app2.use(handleError);
        return app2;
    };

    const {app, eventEmitter, connectWithDb, logger} = await setupCore();

    try {
        await configureRoutes(app);
        app.listen(PORT, async () => {
            logger.info(`Server started on port ${PORT}`);
            const broadcastDatabaseConnectionEstablished = (em: any) => {
                em.emit("databaseConnectionEstablished");
            };

            eventEmitter.on("databaseConnectionEstablished", () => {
                logger.info(
                    "eventEmitterHealthCheck()=> Database connection established"
                );
            });

            await connectWithDb(broadcastDatabaseConnectionEstablished, eventEmitter);
            logger.info(`Database connection established at ${new Date()}`);
        });

        // auto-generated resource-model from routes todo: remove if unnecessary
        // await generateResource(app);
    } catch (err) {
        logger.error(err);
        // await handleError(err);
    }
};

start().then(r => console.log(r));
