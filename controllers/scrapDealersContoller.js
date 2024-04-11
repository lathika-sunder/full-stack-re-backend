const ScrapDealer = require("../models/scrapDealersModel");
const bcrypt = require("bcrypt");
const generateToken = require("../helpers/generateToken");
const pickupRequestModel = require("../models/pickupRequestsModel");
// const { response } = require("express");
const stripe = require('stripe')('sk_test_51OpkbkSIhC4KUlo2LBMLCHz9Fd8aJm8ioN5QiERG2UdIMDV9HVclu5hgBzNE3W2zagM4BOi1jNNdKxoSbG7WQO6h00VLiWvoPC')

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

    const isPasswordValid = bcrypt.compare(
      password,
      existingScrapDealer.password
    );

    if (isPasswordValid) {
      const token = await generateToken({ _id: existingScrapDealer._id });
      return response
        .status(201)
        .json({ token, role: existingScrapDealer.role });
    } else {
      return response.status(404).json("Incorrect Password");
    }
  } catch (error) {
    console.log("Error Logging In", error);
  }
};
const getAllRequests = (req, res) => {
  pickupRequestModel
    .find({ requestStatus: "pending" })
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};
const updateRequest = async (req, res) => {
  // res.send(req.body);
  const { requestId, status } = req.body;
  const updatedResult = await pickupRequestModel.findByIdAndUpdate(
    { _id: requestId },
    { requestStatus: status, acceptedBy: req._id },
    { new: true }
  );
  res.send(updatedResult);
};

const getAllAcceptedRequests = (req, res) => {
  pickupRequestModel
    .find({ requestStatus: "accepted" })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

const findScrapDealerById = async (request, response) => {
  try {
    const id = request.query.id;
    console.log("Scrap dealer", id);
    const scrapDealer = await ScrapDealer.findById(id);

    if (scrapDealer) {
      return response.status(200).json({ scrapDealer });
    } else {
      return response.status(404).json({ error: "Scrap Dealer not found" });
    }
  } catch (error) {
    console.error("Error in finding scrap dealer", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

const makePayment = async (req,res) => {
  try {
    const { amount, currency } = req.body;

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    // Send the client secret to the client
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent", error);
    res.status(500).json({ error: "Error creating payment intent" });
  }
};

module.exports = {
  loginScrapDealer,
  getAllRequests,
  updateRequest,
  getAllAcceptedRequests,
  findScrapDealerById,
  makePayment,
};
