const mongoose=require('mongoose');
const brandSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

const brandModel = mongoose.model('brands',brandSchema);

module.exports=brandModel;