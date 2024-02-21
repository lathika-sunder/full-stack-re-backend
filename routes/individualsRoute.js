
const express = require('express');
const {getIndividualDetails, signUpIndividual} = require('../controllers/individualsController');
const addRequestPickup=require('../controllers/requestPickupController.js')
const router = express.Router();
const Individual=require('../models/individualsModel')
const verifyToken=require('../middleware/verifyToken')
const hashPasswordMiddleware =require('../middleware/hashPassword')
const upload=require('../middleware/imageMiddleware.js');

router.get('/',async(request,response)=>{
    const individualsData=await Individual.find()
    response.status(200).json(individualsData)
})



router.post('/',hashPasswordMiddleware,signUpIndividual)

router.get('/individual',verifyToken,getIndividualDetails)

router.post("/request-pickup", upload.array("myImage",5), addRequestPickup);

module.exports=router