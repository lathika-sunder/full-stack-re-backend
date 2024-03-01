
const express = require('express');
const loginScrapDealer = require('../controllers/scrapDealersContoller');
const {getAllRequestPickup }= require("../controllers/requestPickupController");
const router = express.Router();

router.get('/',(request,response)=>{
    response.status(200).json({
        message:"Welcome to scrap Dealers Route"
    })
})

router.post('/login', loginScrapDealer);
router.get("/get-all-request-pickup", getAllRequestPickup);
module.exports=router