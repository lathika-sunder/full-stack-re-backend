
const express = require('express');
const router = express.Router();
const createUser=require('../controllers/usersController')

router.get('/',(request,response)=>{
    response.status(200).json({
        message:"Welcome to Users Route"
    })
})

router.post('/',createUser)
module.exports=router