const express = require('express');
const routes=express.Router();
const categoryController=require('../Controllers.js/categoryController');

routes.get('/show-category',categoryController.showCategory);
routes.get('/show-category/:id',categoryController.showCategoryById);
routes.post('/create-category',categoryController.CreateCategory);
routes.put('/update-category/:id',categoryController.updateCategory);
routes.delete('/delete-category/:id',categoryController.deleteCategory);

module.exports=routes;