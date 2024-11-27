require("dotenv").config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY,
  MINI_APP_URL: process.env.MINI_APP_URL,
  ALCHEMY_URL: process.env.ALCHEMY_URL,
  SERVER_PORT: process.env.SERVER_PORT,
};
