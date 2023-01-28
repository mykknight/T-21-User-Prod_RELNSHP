const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// edit/products
router.get('/edit-product/:pId', adminController.getEditProduct);

//post edit product
router.post('/edit-product', adminController.postEditProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// delete product
router.post('/delete-product/:prdId', adminController.deleteProduct);

module.exports = router;
