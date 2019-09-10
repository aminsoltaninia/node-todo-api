

// var user = {
//     name:"amin",
//     age:32
// };
// var {name}=user;
// console.log(name);

const{MongoClient,ObjectID} = require('mongodb');
//dastresi be onject id az class mongodb


// CRUD
// create - insert data 
// read - fetch data
//update
//delete



var obj = new ObjectID();
 console.log(obj);





 MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
     if(err)
        return console.log("unable connect to mongodb");
     console.log("connected to mongodb");
    
     const db=client.db('TodoApp');
    
     db.collection('Todos').insertOne({
         text:"somthing to do ",
         complete:false
     },(err,res)=>{
         if(err)
           return console.log("unable to insert Todo");
         console.log(JSON.stringify(res.ops,undefined,2));
         // ba .ops be tamame dadehaye dajhele collection 
         //dastresi peyda mishe kar  
     })
     db.collection('Users').insertOne({
         location:"tehran ",
         name:"amin",
         age:32
     },(err,res)=>{
         if(err)
           return console.log("unable to insert Users");
         //console.log(JSON.stringify(res.ops,undefined,2));
         console.log(JSON.stringify(res.ops[0]._id));
         console.log("string generation time data : ",JSON.stringify(res.ops[0]._id.getTimestamp()));
         console.log("time generation data : ",res.ops[0]._id.getTimestamp());
         
     })
    
     client.close();
         
 })





