const express = require('express');
const cors = require('cors');
const { connectDB } = require('./Config/database');

const app = express();

app.use(cors());
app.use(express.json());

const apiRoutes = require('./Routes/api');

// Vercel serves this Express app directly, so connect before handling API routes.
app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api', apiRoutes);

app.use('/api', (error, req, res, next) => {
  console.error('API request failed:', error.message);
  res.status(500).json({
    success: false,
    message: 'The API could not connect to the database. Check the backend database configuration.',
  });
});

app.get('/', (req, res) => {
  res.send('Doomsday Ready API is running');
});

module.exports = app;
