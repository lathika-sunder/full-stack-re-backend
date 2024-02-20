const mongoose = require("mongoose");
const hashPassword = require('../middleware/hashPassword');
const Individual = require("../models/individualsModel");
const User = require("../models/usersModel");

const signUpIndividual = async (request, response) => {
  try {
    const { name, email, mobile, address, password } = request.body;

    // Check if email is already in use in the Users table
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return response.status(409).json({ message: "Email is already in use" });
    }



    // Save in Individuals Table
    const individualToBeRegistered = new Individual({
      name,
      email,
      mobile,
      address,
      password, 
    //   hashedPassword, 
    });
    const newIndividual = await individualToBeRegistered.save();

    // Save in Users Table
    const userToBeRegistered = new User({
      email,
      mobile,
      password,
   
    });
    const newUser = await userToBeRegistered.save();

    response.status(201).json({ user: newIndividual });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = { signUpIndividual };
