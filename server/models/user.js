const mongoose = require('mongoose');
var User = mongoose.model('User',{
    email:{
        type:String,
        trim:true,
        required:true,
        minlength:1
    },
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:1
    },
    family:{

        type:String,
        trim:true,
        required:true,
        minlength:1
    },
    number:{
        type:Number,
        trim:true,
        default:null
    }
})

module.exports={User}