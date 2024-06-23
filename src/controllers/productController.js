const mongoose = require('mongoose');
const Product = require('../models/product');

// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log('GET all products:', products);
    res.json(products);
  } catch (err) {
    console.error('Error getting products:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// GET single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.log('Product not found:', req.params.id);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('GET product by ID:', product);
    res.json(product);
  } catch (err) {
    console.error('Error getting product by ID:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// POST create a new product
exports.createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category
  });

  try {
    const newProduct = await product.save();
    console.log('Product created:', newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(400).json({ message: err.message });
  }
};

// PUT update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      console.log('Product not found for update:', req.params.id);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product updated:', product);
    res.json(product);
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(400).json({ message: err.message });
  }
};

// DELETE delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      console.log('Product not found for delete:', req.params.id);
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product deleted:', product);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).json({ message: err.message });
  }
};

// DELETE function to delete all products
exports.deleteAllProducts = async (req, res) => {
    try {
      await Product.deleteMany({});
      res.json({ message: 'All products deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete products' });
    }
  };