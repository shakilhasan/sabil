const authRoutes = require("./auth-controller");
const userRoutes = require("./controller");
const {
  authenticateRequest,
  authorizeRequest,
} = require("../../common/middlewares");

const { name: ModelName } = require("./model");

const processRequest = async (req, res, next) => {
  req.modelName = ModelName;
  return next();
};

const init = async (app) => {
  app.use("/api/auth", authRoutes);
  app.use(
    "/api/users",
    authenticateRequest,
    // authorizeRequest,
    processRequest,
    userRoutes
  );
  return app;
};

module.exports = { init };
