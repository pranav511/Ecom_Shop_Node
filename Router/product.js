const express = require('express');
const routes=express.Router();
const productController=require('../Controllers.js/productController')

routes.get('/show-product',productController.showProduct);
routes.get('/show-product/:id',productController.showProductById);
routes.post('/create-product',productController.CreateProduct);
routes.put('/update-product/:id',productController.updateProduct);
routes.delete('/delete-product/:id',productController.deleteProduct);

module.exports=routes;