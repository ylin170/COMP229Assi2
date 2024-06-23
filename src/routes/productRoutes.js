const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET all products
router.get('/products', productController.getAllProducts);

// GET single product by ID
router.get('/products/:id', productController.getProductById);

// POST create a new product
router.post('/products', productController.createProduct);

// PUT update a product by ID
router.put('/products/:id', productController.updateProduct);

// DELETE delete a product by ID
router.delete('/products/:id', productController.deleteProduct);

// DELETE delete all products
router.delete('/products', productController.deleteAllProducts);

module.exports = router;