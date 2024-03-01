const ScrapDealer=require('../models/scrapDealersModel')
const bcrypt=require('bcrypt')
const generateToken=require('../helpers/generateToken');
const pickupRequestModel = require('../models/pickupRequestsModel');

const loginScrapDealer = async (request, response) => {
    try {
      const { mobile, password } = request.body;
  
      const ScrapDealerToBeLoggedIn = {
        mobile,
        password,
      };
  
      const existingScrapDealer = await ScrapDealer.findOne({
        mobile: ScrapDealerToBeLoggedIn.mobile,
        
      });
  
      if (!existingScrapDealer) {
          return response.status(401).json("Invalid credentials");
      }
  
      const isPasswordValid = bcrypt.compare(password,existingScrapDealer.password);
  
      if (isPasswordValid) {
         
          
          const token= await generateToken({ _id:existingScrapDealer._id})
          return response.status(201).json({token,role:existingScrapDealer.role})
  
      }
      else{
          return response.status(404).json("Incorrect Password")
      }
    } catch (error) {
      console.log("Error Logging In",error)
    }
  };
const getAllRequests = (req, res) => {
  pickupRequestModel.find({}).then((data) => res.send(data))
    .catch((err) => res.send(err));
}
module.exports = { loginScrapDealer,getAllRequests };