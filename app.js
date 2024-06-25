const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const basicAuth = require('./middlewares/auth');
require('dotenv').config();

const app = express();
  
connectDB();

app.use(express.json());
app.use(basicAuth); // Apply authentication middleware
app.use('/api', userRoutes);

module.exports = app;
