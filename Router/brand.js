const express = require('express');
const routes=express.Router();
const brandController=require('../Controllers.js/brandController')

routes.get('/show-brand',brandController.showBrand);
routes.get('/show-brand/:id',brandController.showBrandById);
routes.post('/create-brand',brandController.CreateBrand);
routes.put('/update-brand/:id',brandController.updateBrand);
routes.delete('/delete-brand/:id',brandController.deleteBrand);

module.exports=routes;