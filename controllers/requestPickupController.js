const path = require("path");
const requestModel = require("../models/pickupRequestsModel.js");
const { fileURLToPath } = require("url");

const addRequestPickup = (request, response) => {
  try {
   
    const {
        image,
        requestStatus,
        description,
        quantity,
        tags,
        address,
        selectedDateTime,
    }=request.body

    const requestPickup = new requestModel({
        image,
        requestStatus,
        description,
        quantity,
        tags,
        address,
        selectedDateTime,
    });

    requestPickup.save();
    console.log("ADDED TO DB")
  } catch (error) {
    response.status(400).send({ msg: "Request Failed" });
    console.log("Error Submitting")
  }
};

module.exports = addRequestPickup;
