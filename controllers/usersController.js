const mongoose = require("mongoose");
const User = require("../models/usersModel");
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
        return response.status(201).json({token})

    }
    else{
        return response.status(404).json("Incorrect Password")
    }
  } catch (error) {
    console.log("Error Logging In",error)
  }
};

const getUserDetails = async (request, response) => {
  try {
    const userId = request._id;
    console.log(userId);

    const user = await User.findById(userId);
    console.log(user);
    
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

module.exports = {
  loginUser,
  getUserDetails
};
