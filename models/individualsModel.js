const mongoose = require('mongoose');
const User=require('./usersModel')
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
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
        
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Individual",IndividualSchema);  