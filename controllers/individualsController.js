const mongoose = require("mongoose");
const hashPassword = require("../middleware/hashPassword");
const Individual = require("../models/individualsModel");
const User = require("../models/usersModel");
const Enterprise=require('../models/enterprisesModel')
const signUpIndividual = async (request, response) => {
  try {
    const { name, email, mobile, address, password } = request.body;

    // Check if email is already in use in the Users table
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return response.status(409).json({ message: "Email is already in use" });
    }

       // Save in Users Table
       const userToBeRegistered = new User({
        email,
        mobile,
        password,
        role:"individual"
      });
      const newUser = await userToBeRegistered.save();

      
    // Save in Individuals Table
    const individualToBeRegistered = new Individual({
      name,
      email,
      mobile,
      address,
      password,
      userId: newUser._id
    });
    const newIndividual = await individualToBeRegistered.save();

 

    response.status(201).json({ user: newIndividual });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

const getIndividualDetails = async (request, response) => {
  try {
    const userId = request._id;
    console.log(userId);
   var user = await User.findOne({_id:userId});
   
    if(user.role==="individual"){
      user= await Individual.findOne({userId:userId});
    }
    else{
      user= await Enterprise.findOne({userId:userId});
    }
    
    
    
    if (user) {
      return response.status(200).json(user);
    } else {
      return response.status(404).json({ message: "Individual not found" });
    }
  } catch (error) {
    console.log("Error getting Individual Details", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { signUpIndividual, getIndividualDetails };
