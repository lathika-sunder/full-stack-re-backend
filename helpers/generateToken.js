const jwt = require("jsonwebtoken");
const dotenv=require('dotenv')
dotenv.config()
const JWT_SECRET  = process.env.JWT_SECRET;

function generateToken (user) {
  try {
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });
    if(token)
    {
        console.log("token created successfully")
    }
    return token;
  } catch (error) {
    console.log("Error creating session",error)
  }
};

module.exports=generateToken;