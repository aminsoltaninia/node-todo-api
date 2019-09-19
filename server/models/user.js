const mongoose = require('mongoose');
//baraye har karbar  ye token tarif mishe
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var UserSchema = new mongoose.Schema({//schema beheom ejaze mide
    //dakehel in object method ijad konim
    email:
    {
        type:String,
        trim:true,
        required:true,
        minlength:1,
        validate:
        {
           validator:(value)=>{
               return validator.isEmail(value)
           },
           message:'{VALUE} is not valid email '

        },
    },
    password:
    {
        type:String,
        trim:true,
        required:true,
        minlength:6
    },
    tokens:
    [{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required: true
        }
    }]
})
//baraye inke har karbar natone bebine token khodesheo
// az methode zir estefade mikonim
UserSchema.methods.toJSON=function(){
    var user = this;
    var userObject = user.toObject();
    console.log(`userobject : ${userObject}`);
    return _.pick(userObject,['_id','email'])
}

UserSchema.methods.genereateAUTHToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(),access},'123abc').toString();
    //bad az tolid tiken push mikonim token ro be object
    console.log(`token is :${token}`);
    user.tokens.push({access,token});
    
    return user.save().then(()=>{
        return token;
    })
    
}

var User = mongoose.model('User',UserSchema)

module.exports={User}