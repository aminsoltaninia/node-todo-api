
const{MongoClient,ObjectID} = require('mongodb');
//dastresi be onject id az class mongodb


// CRUD
 
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
    db.collection('Todos').findOneAndUpdate(
        {_id:ObjectID("5d77da8ff53ca2d278ec3bf6")},{
        $set:{
             completed:false,
             text:"alli" 
        }},
        {returnOriginal:false}//age false bezarim ducument ke update shode ro neshon mide
        ).then((res)=>{
            console.log(res);
    })

    db.collection('Users').findOneAndUpdate(
        {_id:new ObjectID("5d756638a1b90b3019e4bd52")},
        {
            $set:{
                name:'aminUpdate'
            },
            $inc:{
                age:2//incress age with inc
            }
        },{
            returnOriginal:false
        }
    ).then((res)=>{
        console.log("res after Udate :",JSON.stringify(res,undefined,2))
    })


    client.close();
         
})





