const mongoose=require('mongoose');

async function connectDb(){
    await mongoose.connect('mongodb://localhost:27017/ECOM_SHOP')
 }

 module.exports=connectDb;