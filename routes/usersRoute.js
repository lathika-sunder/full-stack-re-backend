
const express = require('express');
const router = express.Router();
const {getUserDetails,loginUser}=require('../controllers/usersController')
const verifyToken=require("../middleware/verifyToken")
const hashPassword=require('../middleware/hashPassword')

router.get('/',(request,response)=>{
    response.status(200).json({
        message:"Welcome to Users Route"
    })
})

router.post('/login',hashPassword,loginUser)
router.get('/user',verifyToken,getUserDetails)

module.exports=router