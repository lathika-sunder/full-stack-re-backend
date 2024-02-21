const mongoose = require("mongoose");
const User = require("../models/usersModel");
const Individual=require('../models/individualsModel')
const bcrypt=require('bcrypt')
const generateToken=require('../helpers/generateToken')

const loginUser = async (request, response) => {
  try {
    const { mobile, password } = request.body;

    const userToBeLoggedIn = {
      mobile,
      password,
    };

    const existingUser = await User.findOne({
      mobile: userToBeLoggedIn.mobile,
      
    });

    if (!existingUser) {
        return response.status(401).json("Invalid credentials");
    }

    const isPasswordValid = bcrypt.compare(password,existingUser.password);

    if (isPasswordValid) {
        // generate a token and save it to the database
        
        const token= await generateToken({ _id:existingUser._id})
        return response.status(201).json({token,role:existingUser.role})

    }
    else{
        return response.status(404).json("Incorrect Password")
    }
  } catch (error) {
    console.log("Error Logging In",error)
  }
};



module.exports = {
  loginUser,

};
