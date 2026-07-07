require('dotenv').config();

const requiredEnv = ['PORT', 'MONGO_URI'];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`missing env variable: ${key}`);
  }
});

module.exports = {
  port: parseInt(process.env.PORT) || 5000,
  mongoURI: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
};