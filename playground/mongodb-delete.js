
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
    // db.collection('Todos').deleteMany({text:"alli"}).then((res)=>{
    //     console.log(res);
    // })

    // db.collection('Todos').deleteOne({text:"alli"}).then((res)=>{
    //     console.log(res);
    // })

    // db.collection('Todos').findOneAndDelete({complete:false}).then((res)=>{
    //     console.log(res);
    // })

    db.collection('Users').findOneAndDelete({_id:ObjectID("5d76514f9352320d02fb367a")}).then((res)=>{
            console.log(res);
         })


    client.close();
         
})





