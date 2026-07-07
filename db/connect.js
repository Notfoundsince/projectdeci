const mongoose = require('mongoose');
const config = require('../config/config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log(`mongodb Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`connection error: ${error.message}`);
    process.exit(1);
  }
};


module.exports = connectDB; //connecting to mongoose