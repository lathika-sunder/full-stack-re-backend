
const express = require('express');
const { getAllRequests, loginScrapDealer,updateRequest } = require('../controllers/scrapDealersContoller');
const  verifyToken  = require("../middleware/verifyToken");
const router = express.Router();

router.get('/',(request,response)=>{
    response.status(200).json({
        message:"Welcome to scrap Dealers Route"
    })
})

router.post('/login', loginScrapDealer);
router.get('/get-all-requests', getAllRequests);
router.post("/update-request",verifyToken, updateRequest);
module.exports=router