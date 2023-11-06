import winston from "winston";

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: "[LOGGER]",
  }),
  winston.format.printf(
    (info) => ` ${info.label}-[${info.level}] : ${info.message}`
  )
);

const winstonLogger = winston.createLogger({
  level: "debug",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        alignColorsAndTime
      ),
    }),
  ],
});

const pinoLogger = require("pino")();

const logOption = process.env.logger || "winston";
let logger:any= winstonLogger;
if (logOption === "pino") logger=pinoLogger;

export {logger};
