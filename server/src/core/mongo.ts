import mongoose from "mongoose";
import config from "config";

require("dotenv").config();
const IS_MONGODB_CLOUD_URL: boolean = config.get<boolean>("db.is_mongodb_cloud_url");
const MONGODB_CLOUD_URL: boolean = config.get<boolean>("db.mongodb_cloud_url");
const DB_HOST: boolean = config.get<boolean>("db.host");
const DB_PORT: boolean = config.get<boolean>("db.port");
const DB_NAME: boolean = config.get<boolean>("db.name");
const isMongoDbUrl = IS_MONGODB_CLOUD_URL ? IS_MONGODB_CLOUD_URL : false
const uri: any = isMongoDbUrl ? MONGODB_CLOUD_URL : `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};
const connectWithDb = async (cb: any, em: any) => {
    const connectionResult = await mongoose.connect(uri, options);
    // eslint-disable-next-line no-console
    console.log(
        `Connected to mongoDB on database:`//${connectionResult.connections[0].name} at ${new Date().toDateString()}`
    );
    if (cb && em) cb(em);
};
export {connectWithDb};
