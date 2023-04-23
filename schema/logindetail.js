const mongoose = require("mongoose");

const loginDetailSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Enter a valid username"]
    },
    password:{
        type:String,
        required:[true,"Password required"]
    },
    expense:{
        type:Array
    }
})

module.exports =mongoose.model('LoginDetails',loginDetailSchema);