const mongoose = require('mongoose');
const IndividualSchema=mongoose.Schema(
    {
        name:{
            type:String,
            max:25,
            required:true
        }
        ,email:{
            type:String,
        },
        mobile:{
            type:String,
        }
        ,password:{
            type:String,
        },
        address:{
            type:String,
        },
        role:{
            type:String
        }
        
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Individual",IndividualSchema);  