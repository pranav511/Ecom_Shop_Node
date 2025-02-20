const express = require('express');
const routes=express.Router();
const customerController=require('../Controllers.js/customerController')
const {GetWishList,AddWishList,DeleteWishList}=require('../Controllers.js/wishListController')

routes.get('/show-feature-product',customerController.featureProduct);
routes.get('/show-new-product',customerController.newProduct);
routes.get('/show-categoies',customerController.getCategory);
routes.get('/show-brands',customerController.getBrands);
routes.get('/feature-product',customerController.getProductForListening);
routes.get('/get-productById/:id',customerController.getProductById);

//WishList
routes.get('/show-wishList/',async(req,res)=>{
    const userId=req.user.userId;
    const item = await GetWishList(userId);
    res.send(item);
})//
routes.post('/add-wishList/:id',async(req,res)=>{
    const userId=req.user.userId;
    const productId=req.params.id;
    const item = await AddWishList(userId,productId);
    res.send(item);
})
routes.delete('/delete-wishList/:id',async(req,res)=>{
    const userId=req.user.userId;
    const productId=req.params.id;
    const item = await DeleteWishList(userId,productId);
    res.send(item);
})


module.exports=routes;