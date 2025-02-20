const mongoose=require('mongoose');


const wishListSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        required:true
    }
})

const wishListModel = mongoose.model('wishList',wishListSchema);

module.exports=wishListModel;