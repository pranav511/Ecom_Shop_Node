const mongoose=require('mongoose');


const orderSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    item:{
        type:Array(any),
        required:true
    },
    status:{
        type:Number,
        required:true
    }
})

const orderModel = mongoose.model('order',orderSchema);

module.exports=orderModel;