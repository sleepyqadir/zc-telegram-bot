const express = require("express");
const axios = require("axios");
const { BOT_TOKEN, MINI_APP_URL } = require("../config/env");

const router = express.Router();
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

router.post("/webhook", async (req, res) => {
  const update = req.body;

  if (update.message && update.message.text === "/start") {
    const chatId = update.message.chat.id;
    const user = update.message.from;

    const username = user.username || "Unknown";
    const firstName = user.first_name || "Unknown";

    const message = `
Hello ${firstName} (@${username})!
Welcome to our bot. Here is your Mini App link:
${MINI_APP_URL}
    `;

    const keyboard = {
      inline_keyboard: [
        [
          {
            text: "Launch Clicker App",
            web_app: {
              url: MINI_APP_URL,
            },
          },
        ],
      ],
    };

    try {
      await axios.post(`${TELEGRAM_API}/sendAnimation`, {
        chat_id: chatId,
        animation:
          "https://i.pinimg.com/originals/10/d0/1a/10d01a7b55b7d75fbea163645bed8a2d.gif",
        caption: "Loading your app... 🚀",
      });
    } catch (error) {}

    console.log("waiting");

    await setTimeout(() => {}, 10000);

    console.log("sending now");

    try {
      await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: "Pick an app to launch.",
        reply_markup: keyboard,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  res.sendStatus(200);
});

module.exports = router;
