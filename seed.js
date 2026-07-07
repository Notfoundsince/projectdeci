require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
const config = require('./config/config');

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    console.log('Connected to MongoDB');

    // Clean existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('Cleaned existing data');

    // Insert categories
    const categories = await Category.insertMany([
      { name: 'Electronics', description: 'Electronic devices and gadgets' },
      { name: 'Clothing', description: 'Apparel and fashion items' },
      { name: 'Home & Garden', description: 'Home and garden products' },
      { name: 'Books', description: 'Books and reading materials' }
    ]);
    console.log(`Inserted ${categories.length} categories`);

    // Insert products
    const products = await Product.insertMany([
      { name: 'Laptop', price: 999.99, category: categories[0]._id, stock: 15, image: 'laptop.jpg' },
      { name: 'Smartphone', price: 699.99, category: categories[0]._id, stock: 25, image: 'smartphone.jpg' },
      { name: 'T-Shirt', price: 29.99, category: categories[1]._id, stock: 50, image: 't-shirt.jpg' },
      { name: 'Jeans', price: 49.99, category: categories[1]._id, stock: 40, image: 'jeans.jpg' },
      { name: 'Plant Pot', price: 19.99, category: categories[2]._id, stock: 30, image: 'plant-pot.jpg' },
      { name: 'Desk Lamp', price: 39.99, category: categories[2]._id, stock: 20, image: 'desk-lamp.jpg' },
      { name: 'JavaScript Guide', price: 34.99, category: categories[3]._id, stock: 12, image: 'javascript-guide.jpg' },
      { name: 'web dev guide', price: 44.99, category: categories[3]._id, stock: 18, image: 'web-dev-guide.jpg' }
    ]);
    console.log(`Inserted ${products.length} products`);

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

