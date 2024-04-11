const mongoose=require("mongoose")

const Schema = mongoose.Schema;

const pickupRequestSchema = new Schema({
    image: String,
    requestStatus: {
        type: String,
        default: "Pending",
    },
    description: String,
    quantity : Number,
    tags: [String],
    address: String,
    selectedDateTime: Date,
    amount: Number,  // in cents,
    postedBy: { type: Schema.Types.ObjectId, ref: 'Individual' },  
    acceptedBy:{ type: Schema.Types.ObjectId, ref: 'ScrapDealers' },
   
   
    
}, { timestamps: true })

const pickupRequestModel = mongoose.model("PickupRequest", pickupRequestSchema);

module.exports= pickupRequestModel ;