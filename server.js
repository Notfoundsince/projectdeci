require('dotenv').config();
const express = require('express');
const mongosanitize = require('express-mongo-sanitize');
const config = require('./config/config');
const connectDB = require('./db/connect');
const categoryroute = require('./routes/categoryroute');
const productroute = require('./routes/productroute');
const cartroute = require('./routes/cartroute');
const orderroute = require('./routes/orderroute');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use(mongosanitize());
// going to the error handler file
app.use(errorHandler);

// the home
app.get('/', (req, res) => {
  res.json({
    message: 'the api',
    endpoints: {
      products: '/api/products',
      categories: '/api/categories',
      cart: '/api/cart',
      orders: '/api/orders',
    },
  });
});

// the routes
app.use('/api/categories', categoryroute);
app.use('/api/products', productroute);
app.use('/api/cart', cartroute);
app.use('/api/orders', orderroute);

// 404 error
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});



// start server
const start = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
      console.log('available endpoints:');
      console.log('try /api/categories');
      console.log('try /api/products');
      console.log('try /api/cart');
      console.log('try /api/orders');
    });
  } catch (error) {
    console.error('  Failed to start server:', error.message);
    process.exit(1);
  }
};

start();