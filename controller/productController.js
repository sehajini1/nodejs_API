const errorMiddleware = require("../middleware/errorMiddleware");
const Product = require("../models/productModels");
const asyncHandler = require("express-async-handler");

//get all products
const getProducts = async (req, res) => {
  //async-handles the asynchronous request, => - call back function
  try {
    const products = await Product.find({}); //empty curly braces means find all the products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

//get a single product
const getProductById = asyncHandler(async(req, res) => { //without asyncHandler, error doesn't work properly 
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

//create a product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body); //wait-for wait for the response, Product- access the product model, create- function to create the product
    res.status(200).json(product); //to respond these product to the client
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Cannot find product with given ${id}" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Cannot find product with given ${id}" });
      //response back to the client
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
