const express = require("express");
const bodyParser = require("body-parser");
const telegramRoutes = require("./routes/telegram");
const transferRoutes = require("./routes/transfer");

const app = express();

const router = express.Router();

router.get("", async (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.use(bodyParser.json());

// Routes
app.use("", telegramRoutes);
app.use("/api/transfer", transferRoutes);
app.use("", router);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
