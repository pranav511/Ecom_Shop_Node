const express = require('express');
const routes=express.Router();
const authController=require('../Controllers.js/authController')

routes.post('/register',authController.signup);
routes.post('/login',authController.login);
// routes.post('/create-category',categoryController.CreateCategory);
// routes.put('/update-category/:id',categoryController.updateCategory);
// routes.delete('/delete-category/:id',categoryController.deleteCategory);

module.exports=routes;