require('dotenv').config();
const mongoose = require('mongoose');

const DB_STRING = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_STRING);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = { connectDB };
