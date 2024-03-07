const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST request to add a new product
router.post('/', async (req, res) => {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    });
  
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // DELETE request to delete a product by id
router.delete('/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) res.status(404).send("No item found");
      res.status(200).send();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // PATCH request to update a product by id
router.patch('/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) res.status(404).send("No item found");
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
  
// Add more routes as needed for creating, updating, and deleting products

module.exports = router;
