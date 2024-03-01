
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
    console.log(req.body);
    res.status(200).send({ data : "ACCEPT/REJECT"});
})
module.exports=router