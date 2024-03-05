const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize the express application
const app = express();

// Use CORS middleware
app.use(cors());

const PORT = process.env.PORT || 5000;

// Express JSON parser middleware (to handle JSON requests)
app.use(express.json());

// Import the product routes
const productRoutes = require('./src/routes/products');

// Use the productRoutes for any requests to /api/products
app.use('/api/products', productRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('AgriConnect API is running...');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
