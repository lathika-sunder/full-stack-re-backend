
const express = require('express');
const router = express.Router();
const {createUser,loginUser}=require('../controllers/usersController')
const hashPassword=require('../middleware/hashPassword')

router.get('/',(request,response)=>{
    response.status(200).json({
        message:"Welcome to Users Route"
    })
})

router.post('/login',hashPassword,loginUser)

module.exports=router