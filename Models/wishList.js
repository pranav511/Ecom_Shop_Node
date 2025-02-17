const mongoose=require('mongoose');


const wishListSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    productsId:{
        type:Array(String)
    }
})

const wishListModel = mongoose.model('wishList',wishListSchema);

module.exports=wishListModel;