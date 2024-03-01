const path = require("path");
const requestModel = require("../models/pickupRequestsModel.js");
const { fileURLToPath } = require("url");
const Individual = require("../models/individualsModel.js");
const Request=require('../models/pickupRequestsModel.js')

const addRequestPickup = (request, response) => {
  try {
    console.log(request.body);
    const requestPickup = new requestModel(request.body);
    //SAVE THE REQUEST IN DB
    requestPickup.save().then(() => {
      response.send("Success");
    }).catch((err) => response.send(err));
    console.log("ADDED TO DB");
  } catch (error) {
    response.status(400).send({ msg: "Request Failed" });
    console.log("Error Submitting");
  }
};

const getRequestPickup = async (request, response) => {
  try {
    const userId = request._id;

    const pickup = await Request.find({postedBy:userId});
    
    if(pickup!==null)
    {
      return response.status(200).json(pickup);
    }
    else{
      return response.status(404).json({"message":"No requests found!"})
    }

  } catch (error) {
    console.log("Error getting request pickups",error)
  }
};

const getAllRequestPickup = async (req, res) => {
  
  const data = await Request.find({}).then((data) => {
    console.log(data)
  }).catch((err) => console.log(err));
  
}

module.exports = {
  addRequestPickup,
  getRequestPickup,
  getAllRequestPickup,
};
