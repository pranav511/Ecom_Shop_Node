const wishListRepo = require("../Models/wishList");

async function AddWishList(userId,productId){
    
    const result= await wishListRepo.create({
        userId:userId,
        productId:productId
    })
    return result;
}//

async function DeleteWishList(userId,productId){
    
    const result= await wishListRepo.deleteMany({
        userId:userId,
        productId:productId
    })
    return result;
}//

async function GetWishList(userId){
    const result= await wishListRepo.find({
        userId:userId,
    })
    
    return result.map(x=>x.toObject());

}//
module.exports= {AddWishList,DeleteWishList,GetWishList}