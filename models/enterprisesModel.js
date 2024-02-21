const mongoose = require('mongoose');
const User=require('./usersModel')
const EnterprisesSchema=mongoose.Schema(
    {
        companyName:{
            type:String,
            max:25,
            required:true
        },
        applicantName:{
            type:String,
            max:25,
            required:true
        },
        applicantRole:{
            type:String,
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