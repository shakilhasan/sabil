import mongoose from "mongoose";
import config from "config";
require("dotenv").config();
const db = config.get<number>("db");

console.log(db);
const isMongoDbUrl = JSON.parse(
    process.env.IS_MONGODB_CLOUD_URL ? process.env.IS_MONGODB_CLOUD_URL : "false"
);
const uri:any = isMongoDbUrl
    ? process.env.MONGODB_CLOUD_URL
    : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
const connectWithDb = async (cb:any, em:any) => {
  const connectionResult = await mongoose.connect(uri, options);
  // eslint-disable-next-line no-console
  console.log(
    `Connected to mongoDB on database:`//${connectionResult.connections[0].name} at ${new Date().toDateString()}`
  );
  if (cb && em) cb(em);
};
export {connectWithDb};
