
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
    db.collection('Todos').find({complete:false}).toArray().then((docs)=>{
        console.log('Todos : ');
        console.log(JSON.stringify(docs,undefined,2));      
    },(err)=>{
        if(err)
          return console.log("Unbale to fetch todos",err);
    })
    db.collection('Todos').find(_id=new ObjectID('5d76ae9bb280070c04b9e5c3')).toArray().then((docs)=>{
        console.log('Todos by id: ');
        console.log(JSON.stringify(docs,undefined,2));      
    },(err)=>{
        if(err)
          return console.log("Unbale to fetch todos",err);
    })
    db.collection('Todos').find().count().then((count)=>{
        console.log(`Todos count: ${count} `);      
    },(err)=>{
        if(err)
          return console.log("Unbale to fetch todos",err);
    })
    db.collection('Users').find().count().then((count)=>{
        console.log(`Users count: ${count} `);      
    },(err)=>{
        if(err)
          return console.log("Unbale to fetch todos",err);
    })
   
   
    
    client.close();
         
})





