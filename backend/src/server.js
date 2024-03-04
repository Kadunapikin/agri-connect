const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const productRoutes = require('./routes/products');// Import the product routes


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Use the productRoutes for any requests to /api/products
app.use('/api/products', productRoutes);


app.get('/', (req, res) => {
  res.send('AgriConnect API is running...');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
