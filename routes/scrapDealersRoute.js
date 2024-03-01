
const express = require('express');
const loginScrapDealer = require('../controllers/scrapDealersContoller');
const router = express.Router();

router.get('/',(request,response)=>{
    response.status(200).json({
        message:"Welcome to scrap Dealers Route"
    })
})

router.post('/login', loginScrapDealer);
router.get("/change-request-status", (req, res) => {
    res.status(200).send("ACCEPT/REJECT");
})
module.exports=router