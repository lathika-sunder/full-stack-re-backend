const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URI);
  console.log("Connected to Database");
  return db;
  } catch (error) {
    console.log("Error Connecting to Database",error)
  }
};

module.exports=connectToDatabase
