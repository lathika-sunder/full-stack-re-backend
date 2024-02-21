const mongoose = require('mongoose');
const userSchema=mongoose.Schema(
    {
        email:{
            type:String,
        },
        mobile:{
            type:String,
        }
        ,password:{
            type:String,
        }
        , role:{
            type:String,
        }
        
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("User",userSchema);