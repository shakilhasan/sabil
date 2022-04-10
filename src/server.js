const { setup: setupCore } = require("./core");
const { init } = require("./modules");
const { handleError, handleRequest } = require("./common/middlewares");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const start = async () => {
    const initModules = async (app) => {
        return await init(app);
    };

    const configureRoutes = async (app) => {
        app.use(handleRequest);
        const app2 = await initModules(app);
        app2.get("/", (req, res) => {
            res.send("Hello World!");
        });
        app2.use(handleError);
        return app2;
    };

    const { app, eventEmitter, connectWithDb, logger } = await setupCore();

    try {
        await configureRoutes(app);
        app.listen(PORT, async () => {
            logger.info(`Server started on port ${PORT}`);

            const broadcastDatabaseConnectionEstablished = (em) => {
                em.emit("databaseConnectionEstablished");
            };

            eventEmitter.on("databaseConnectionEstablished", () => {
                logger.info(
                    "eventEmitterHealthCheck()=> Database connection established"
                );
            });

            await connectWithDb(broadcastDatabaseConnectionEstablished, eventEmitter);
            logger.info(`Database connection established at ${new Date()}`);
            console.log(`Server is running on port ${PORT}`);

        });
    } catch (err) {
        await handleError(err);
    }
};

start()
