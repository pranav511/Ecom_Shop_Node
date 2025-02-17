const express = require('express');
const routes=express.Router();
const customerController=require('../Controllers.js/customerController')

routes.get('/show-feature-product',customerController.featureProduct);
routes.get('/show-new-product',customerController.newProduct);
routes.get('/show-categoies',customerController.getCategory);
routes.get('/show-brands',customerController.getBrands);
routes.get('/feature-product',customerController.getProductForListening);
routes.get('/get-productById/:id',customerController.getProductById);


module.exports=routes;