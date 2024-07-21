const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({

    name:{
        type: String,
    },
    email:{
        type: String,
    },
    password:{
        type: String,
    }
},{
    collection:" users",
    timestamps:true
})


module.exports = mongoose.model("User", adminSchema)