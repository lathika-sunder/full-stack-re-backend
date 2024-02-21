
const express = require('express');
const router = express.Router();
const hashPasswordMiddleware=require('../middleware/hashPassword')
const {signUpEnterprise,getEnterpriseDetails}=require('../controllers/enterprisesController');
const verifyToken = require('../middleware/verifyToken');

router.get('/',(request,response)=>{
    response.status(200).json({
        message:"Welcome to Enterprises Route"
    })
})

router.post('/',hashPasswordMiddleware,signUpEnterprise)

router.get('/enterprise',verifyToken,getEnterpriseDetails);


module.exports=router