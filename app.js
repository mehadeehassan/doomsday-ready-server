const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const apiRoutes = require('./Routes/api');

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Doomsday Ready API is running');
});

module.exports = app;
