var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {ObjectID}=require('mongodb');
var {User}=require('./models/user');
const express=require('express');
const bodyParser=require('body-parser');//ba nasbe body parser kole systeme ma to in shakhe be sorate json mishe
const _ =require('lodash');


var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    //console.log(req.body);
    
    var todo=new Todo({
       text : req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc)
    },(err)=>{
        res.status(400).send(err)
    }) 

})
 app.get('/todos',(req,res)=>{
     Todo.find().then((todos)=>{
         res.send({todos})
     },(e)=>{
         res.status(400).send(e)
     })
 });

app.get('/todos/:id',(req,res)=>{ 
    //console.log(req);
    
    var Id = req.params.id;
    //console.log(ObjectID.isValid(Id));
    if(!(ObjectID.isValid(Id)))
    {
        console.log("ID not valid ");
        return res.status(404).send()
    }
    Todo.findById(Id).then((todo)=>{
        //bara vaghti ke iq valid hast vali vojod nadare
        if(!todo){
            console.log("ID valid .... not exixst");
            return res.status(404).send()
        }
        else{
            console.log("todo is ... sending");
           res.send({todo})
        }


    }).catch((e)=>{
        res.status(404).send()
    })
});

 app.delete('/todos/:id',(req,res)=>{
     var id = req.params.id;
     if(!ObjectID.isValid(id)){
         return res.status(404).send();
     }
     Todo.findOneAndDelete({_id:new ObjectID(id)}).then((todo)=>{
         if(!todo){
             return res.status(400).send();
         }
         res.send(todo);
     }).catch((e)=>{
         res.status(404).send();
     })
 })
// update -> loadash -> put and patch
//put baraye hme ham onvan ham  meghdar
// patch just for title

app.patch('/todos/:id',(req,res)=>{
    var Id=req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(Id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed)&&body.completed)//vojod dashtanesho ham chek mikonim
    {
        //time stamp yani yek adad ke makhsoose har roozi to tarikhe 
        //mohaser befarde
        console.log("time stamp is set now",new Date().getTime());
        body.completedAt = new Date().getTime();
    }
    else{//agr vojod nadasht
        body.completed=false;
        body.completedAt=null;

    }
    Todo.findOneAndUpdate({_id :new ObjectID(Id)},{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send()
        }
        res.send(todo)
    }).catch((e)=>{
        res.status(400).send()
    })
})


// JWT  json web token or hashing 
// instll jasonwebtoken npm
// install npm validator in user
// install npm crypto for hashing 
// POST for user estefde msieh chon kheili ghavitar az get hast
app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['email','password']);//email va pass ro migirim
    var user =new User(body); 
    //console.log("this is users");
    
    
    
    user.save().then(()=>{
        console.log("generate auth");
        return user.genereateAUTHToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e)
    })


})


app.listen(3000,()=>{
    console.log("started on port 3000");
})


//  var newTodo = new Todo({
//      text:"        aminsoltani spacetrim         "
//  })
//  newTodo.save().then((doc)=>{
//      console.log(JSON.stringify(doc,undefined,2))
//  },(err)=>{
//      console.log("Unable to save todo ",err);
//  })

// var otherTodo = new Todo({
//     text:'Eat lunch',
//     completed:true,
//     completedAt:123
// })
// otherTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc,undefined,2));
// },(err)=>{
//     console.log('Unable to save OtherTodo ',err);
// })


// creat user and validation


// var user = new User({
//     email:"ali@gmail.com",
//     name:"alli",
//     family:"soltani",
//     number:123
// })
// user.save().then((doc)=>{
//     console.log("user save",doc);
// },(err)=>{
//     console.log(err);
// })

module.exports={app}

