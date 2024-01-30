const Product = require('../models/productModels');//importing product model
const {getProducts,getProductById,createProduct,updateProduct,deleteProduct} = require('../controller/productController');//importing the controller
const express =require('express');

const router = express.Router();


router.get('/', getProducts);//getProducts is a function in the controller

router.get('/:id',getProductById);//getProductById is a function in the controller

router.post('/',createProduct);

router.put('/:id', updateProduct);

router.delete('/:id',deleteProduct);

module.exports = router;//exporting the router to the server.js file