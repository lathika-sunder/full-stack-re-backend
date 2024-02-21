const mongoose=require("mongoose")

const Schema = mongoose.Schema;

const pickupRequestSchema = new Schema({
    image: [{
        data: Buffer,
        contentType: String
    }],
    requestStatus: String,
    description: String,
    quantity : Number,
    tags: [String],
    address: String,
    selectedDateTime: Date,
    
}, { timestamps: true })

const pickupRequestModel = mongoose.model("PickupRequest", pickupRequestSchema);

module.exports= pickupRequestModel ;