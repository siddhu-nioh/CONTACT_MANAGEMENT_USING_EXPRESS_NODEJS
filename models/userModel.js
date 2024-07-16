const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type: String,
        required: [true,"please add the username "],

    },
    email:{
        type:String,
        required:[true,"please enter the user email"],
        unique:[true,"email address already TAKEN"],
    },
    password:{
        type:String,
        required:[true,"Please enter the password"],

    }
},{
    timestamps:true,
}
);
module.exports=mongoose.model("User",userSchema);