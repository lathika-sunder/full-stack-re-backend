const mongoose = require("mongoose");

const ScrapDealersSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      max: 25,
      required: true,
    },
    applicantName: {
      type: String,
      max: 25,
      required: true,
    },
    applicantRole: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ScrapDealers", ScrapDealersSchema);
