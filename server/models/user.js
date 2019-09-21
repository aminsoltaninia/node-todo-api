const mongoose = require('mongoose');
//baraye har karbar  ye token tarif mishe
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
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
    console.log('userobject : ',userObject);
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
// for user profile
UserSchema.statics.findByToken =function(token){
    var User = this ;
    var decoded;

    try{
       decoded=jwt.verify(token,'123abc')
    }catch(e){
       return Promise.reject();
    }
    console.log("decoded is :",decoded);
    console.log(`User is : ${User}`);
    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    })
}
/*
Pre middleware functions are executed one after another, when each middleware calls next.

var schema = new Schema(..);
schema.pre('save', function(next) {
  // do stuff
  next();
});
*/
// inja roye methode save middleware ejra mikone 
UserSchema.pre('save',function(next){
    var user = this;
    //isModify baresi mikone ke field morede nazar eslah shode bashe

    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                user.password=hash;//pas ro ba salt tarkib va hash mikone 
                next();
            });
        });
    }else{
        next();
    }
})
var User = mongoose.model('User',UserSchema)

module.exports={User}