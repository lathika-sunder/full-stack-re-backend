
const express = require('express');
const { signUpIndividual} = require('../controllers/individualsController');
const router = express.Router();
const Individual=require('../models/individualsModel')
const verifyToken=require('../middleware/verifyToken')
const hashPasswordMiddleware =require('../middleware/hashPassword')

router.get('/',async(request,response)=>{
    const individualsData=await Individual.find()
    response.status(200).json(individualsData)
})



router.post('/',hashPasswordMiddleware,signUpIndividual)




module.exports=router