const {SHA256}=require('crypto-js')//faghat algoritm sha256 ro estekhraj mikonim va estefade
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//hashing for password

var pasword = "123abc";
// 10 caracter gozashtim param 1 ro
bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(pasword,salt,(err,hash)=>{
        console.log(`hash : ${hash}`);//random password mide
    })
})
var hashpassword='$2a$10$GiL9S8p8OtJdoD4OzocENOCxRljC9CjJdFBG2peNmz1NdYiNmPw7S';
bcrypt.compare('123abc',hashpassword,(err,res)=>{
    console.log(`result compair is :${res}`);
})
/// for hashing
var message ="I am user number 3";
var hash = SHA256(message).toString();

console.log(`Message : ${message} `);
console.log(`hash : ${hash}`);

var data ={
    id:4
}
var token={
    data,
    hash: SHA256(JSON.stringify(data)+'somesecret').toString()
    //hatman bayad strin befrestim
}
var hashdata = SHA256(JSON.stringify(token.data)+'somesecret').toString();

if(token.hash===hashdata){
    console.log("is equal")
}
else
     console.log("isnt equal")

/// for token


var DATA = {
    ID:10
}

var TOKEN = jwt.sign(DATA,'aminsoltani');//arg 1 data vorodi v arg2 security key

console.log(`TOKEN is : ${TOKEN}`);
// site jwt.io in cod ro decode mikonim !!!!
var Decode = jwt.verify(TOKEN,'aminsoltani');
console.log('decode TOKEN : ',Decode);