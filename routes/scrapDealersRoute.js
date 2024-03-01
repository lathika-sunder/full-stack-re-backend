
const express = require('express');
const { getAllRequests, loginScrapDealer,updateRequest,getAllAcceptedRequests } = require('../controllers/scrapDealersContoller');
const  verifyToken  = require("../middleware/verifyToken");
const router = express.Router();

router.get('/',(request,response)=>{
    response.status(200).json({
        message:"Welcome to scrap Dealers Route"
    })
})

router.post('/login', loginScrapDealer);
router.get('/get-all-requests', getAllRequests);
router.get("/get-all-accepted-requests", getAllAcceptedRequests);
router.post("/update-request",verifyToken, updateRequest);
module.exports=router