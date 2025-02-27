const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        uniqie:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
       type:String,
       required:true,
       default:'NORMAl'
    }

},{timestamps:true})

const User = mongoose.model("users",userSchema);

module.exports = User;