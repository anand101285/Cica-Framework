require('dotenv').config();

const env = {
  APP_URL: process.env.APP_URL,
  PING_URL: process.env.PING_URL,
  MONGO_DB_URI: process.env.MONGO_DB_URI
};

module.exports = env;
