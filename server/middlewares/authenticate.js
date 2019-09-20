var {User}=require('./../models/user');

// midle ware minvisim bara kholase nevisi va barresi

// age user token dashte bashe edame mide barnamaro
var authenticate = (req,res,next)=>{
    var token= req.header('x-auth');//gereftane token

    console.log(`user token is : ${token}`);
    User.findByToken(token).then((user)=>{
        if(!user){
           return Promise.reject();
        }
        req.user=user
        req.token=token
        next();
    }).catch((err)=>{
        res.status(401).send()
    })
}

module.exports={authenticate}
