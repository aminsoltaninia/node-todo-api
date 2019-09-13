var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User}=require('./models/user');
const express=require('express');
const bodyParser=require('body-parser');//ba nasbe body parser kole systeme ma to in shakhe be sorate json mishe


var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    //console.log(req.body);
    
    var todo=new Todo({
       text : req.body.text
    });
    todo.save().then((doc)=>{
        res.status(400).send(doc)
    },(err)=>{
        console.log(err);
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

