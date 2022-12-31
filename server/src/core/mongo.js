const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.IS_MONGODB_CLOUD_URL ? process.env.MONGODB_CLOUD_URL  : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
const connectWithDb = async (cb, em) => {
  const connectionResult = await mongoose.connect(uri, options);
  // eslint-disable-next-line no-console
  console.log(
    `Connected to mongoDB on database:
    ${connectionResult.connections[0].name} at ${new Date().toDateString()}`
  );
  if (cb && em) cb(em);
};
module.exports = connectWithDb;
