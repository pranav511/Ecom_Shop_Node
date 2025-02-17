function isAdmin(req,res,next){
    console.log("iSADMin",req.user);
    if(req.user.isAdmin){
      next();
    }else{
      return res.status(403).send({
        error:"Forbidden2"
      })
    }
  }
  
module.exports= {isAdmin}