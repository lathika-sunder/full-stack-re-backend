
const express = require('express');
const {getAllRequests,loginScrapDealer }= require('../controllers/scrapDealersContoller');
const router = express.Router();

router.get('/',(request,response)=>{
    response.status(200).json({
        message:"Welcome to scrap Dealers Route"
    })
})

router.post('/login', loginScrapDealer);
router.get('/get-all-requests', getAllRequests);
module.exports=router