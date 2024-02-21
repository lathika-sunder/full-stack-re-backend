const mongoose = require("mongoose");
const Enterprise = require("../models/enterprisesModel");
const User = require("../models/usersModel");

const signUpEnterprise = async (request, response) => {
  try {
    const { companyName, applicantName,applicantRole, email, mobile, address, password } = request.body;

    // Check if email is already in use 
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return response.status(409).json({ message: "Email is already in use" });
    }

       // Save in Users Table
       const userToBeRegistered = new User({
        email,
        mobile,
        password,
        role:"enterprise"
      });
      const newUser = await userToBeRegistered.save();

      
    // Save in Enterprises Table
    const EnterpriseToBeRegistered = new Enterprise({
      companyName,
      applicantName,
      applicantRole,
      email,
      mobile,
      address,
      password,
      userId: newUser._id
    });
    const newEnterprise = await EnterpriseToBeRegistered.save();

 

    response.status(201).json({ user: newEnterprise });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

const getEnterpriseDetails = async (request, response) => {
  try {
    const userId = request._id;
    console.log(userId);

    const user = await Enterprise.findOne({userId:userId});
    console.log(user);
    
    if (user) {
      return response.status(200).json(user);
    } else {
      return response.status(404).json({ message: "Enterprise not found" });
    }
  } catch (error) {
    console.log("Error getting Enterprise Details", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { signUpEnterprise, getEnterpriseDetails };
