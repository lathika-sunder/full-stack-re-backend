const mongoose=require("mongoose")

const Schema = mongoose.Schema;

const pickupRequestSchema = new Schema({
    // image: [{
    //     data: Buffer,
    //     contentType: String
    // }],
    requestTitle: String,
    individualId: mongoose.SchemaTypes.ObjectId,
    scrapDealerId: {
        type: mongoose.SchemaTypes.ObjectId,
        defailt: null,
    },
    requestStatus: String,
    description: String,
    quantity : Number,
    tags: [String],
    address: String,
    selectedDateTime: Date,
    postedBy: { type: Schema.Types.ObjectId, ref: 'Individual' },  
    acceptedBy:{ type: Schema.Types.ObjectId, ref: 'ScrapDealers' },  
}, { timestamps: true })

const pickupRequestModel = mongoose.model("PickupRequest", pickupRequestSchema);

module.exports= pickupRequestModel ;