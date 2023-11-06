import express from "express";
import cors from "cors";
import helmet from "helmet";
// import rateLimit from "express-rate-limit";
// const pino = require("pino-http")();
// const pino = require("pino");
import ExpressPinoLogger from "express-pino-logger";

const logger = ExpressPinoLogger({
  // customLogLevel(res:any, err:any) { //TODO: uncomment later
  //   if (res.statusCode >= 400 && res.statusCode < 500) {
  //     return "warn";
  //   }
  //   if (res.statusCode >= 500 || err) {
  //     return "error";
  //   }
  //   if (res.statusCode >= 300 && res.statusCode < 400) {
  //     return "silent";
  //   }
  //   return "info";
  // },
  serializers: {
    req: (req) => ({
      method: req.method,
      url: req.url,
      query: req.query,
      params: req.params,
      headers: {
        "user-agent": req.headers["user-agent"],
        "session-id": req.headers["session-id"] ?? "",
        host: req.headers.host,
      },
      remoteAddress: req.remoteAddress,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
      header: {
        date: res.headers.date,
        "x-correlation-id": res.headers["x-correlation-id"],
      },
    }),
  },
});

require("dotenv").config();
import compression from "compression";
import swaggerUI from "swagger-ui-express";

// const limiter = rateLimit({ //TODO: uncomment later
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 1000, // limit each IP to 1000 requests per windowMs
// });

const app = express();
app.use(compression());
app.use(cors());
// app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(logger);

const swaggerDocument = require("../swagger.json");

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

export {app};
