const mongoose = require("mongoose");
const User = require("../models/usersModel");
const bcrypt=require('bcrypt')
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
        return response.status(201).json("Login Successful")
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
