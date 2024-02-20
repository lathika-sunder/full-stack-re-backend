
const express = require('express');
const { signUpIndividual } = require('../controllers/individualsController');
const router = express.Router();

const hashPasswordMiddleware =require('../middleware/hashPassword')

router.get('/',(request,response)=>{
    response.status(200).json({
        message:"Welcome to Individuals Route"
    })
})

router.post('/',hashPasswordMiddleware,signUpIndividual)



module.exports=router