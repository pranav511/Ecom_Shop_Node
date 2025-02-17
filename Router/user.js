const express = require('express');
const routes=express.Router();

routes.get('/',(req,res)=>{
    res.send('sever live..');
})

module.exports=routes;