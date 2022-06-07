require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const apiRoutes = require('./routes/api');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//database connect
const { connectDB } = require('./config/database');
connectDB();

//routes
app.get('/', (request, response) => {
  response.send('API is running');
});

// app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`your server is running on PORT ${PORT}`);
});
