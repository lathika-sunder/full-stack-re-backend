const path = require("path");
const requestModel = require("../models/pickupRequestsModel.js");
const { fileURLToPath } = require("url");
const Individual = require("../models/individualsModel.js");
const Request=require('../models/pickupRequestsModel.js')

const addRequestPickup = (request, response) => {
  try {
    const userId = request._id;
    console.log(userId)
    
    const {
      image,
      requestStatus,
      description,
      quantity,
      tags,
      address,
      selectedDateTime,
    } = request.body;

    const requestPickup = new requestModel({
      image,
      requestStatus,
      description,
      quantity,
      tags,
      address,
      selectedDateTime,
      postedBy: userId,
    });

    requestPickup.save();
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

module.exports = {
  addRequestPickup,
  getRequestPickup,
};
