const { setup: setupCore } = require("./core");
const { init } = require("./modules");
const { handleError, handleRequest } = require("./common/middlewares");
// todo: remove in production
const mockRoutes = require("../test/mock-routes/routes");
const { generateResource } = require("./common/utils");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const start = async () => {
  // eslint-disable-next-line no-return-await
  const initModules = async (app) => await init(app);

  const configureRoutes = async (app) => {
    app.use(handleRequest);
    const app2 = await initModules(app);
    app2.get("/", (req, res) => {
      res.send("Hello World!");
    });

    // todo: remove in production
    app2.use("/mock", mockRoutes);
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
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${PORT}`);
    });

    // auto-generated resource-model from routes todo: remove if unnecessary
    await generateResource(app);
  } catch (err) {
    await handleError(err);
  }
};

start();
