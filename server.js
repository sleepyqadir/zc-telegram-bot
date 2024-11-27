const express = require('express');
const bodyParser = require('body-parser');
const telegramRoutes = require('./routes/telegram');
const transferRoutes = require('./routes/transfer');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('', telegramRoutes);
app.use('/api/transfer', transferRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
