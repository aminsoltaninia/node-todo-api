//taghirate package.json bad az nasb mocha va supertest
//"test":"mocha server/**/*.test.js",
//"text-watch":"nodemon --exec 'nmp test'"
// bad az mocha va superset bayad expect mjakson ro hammnasb konim
//in 2ta pakage ro be system ezafe mikonim

// baraye nodemon hatman bayad nodemon test-watch bezanim

const expect=require('expect');
const request= require('supertest');

const{app}=require('../server');
const{Todo}=require('./../models/todo');
const{ObjectID}=require('mongodb');

const todos = [{
    _id:new ObjectID(),
    text :"first text for test"
}, {
    _id:new ObjectID(),
    text :"second text for test",
    completed :true,
    completedAt : 2222
    
}]
//paksaziye hameye dadeha ba dastore zir
beforeEach((done)=>{
    Todo.deleteMany({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done())
})//removw({}) yani hamaro az beyn bebare 


describe("POST /todos",()=>{
    it("should create a new Todo",(done)=>{
        var text = "text todo text";


        request(app)
        .post('/todos')//masiri ke dakhele server.js hast
        .send({text})
        .expect(200)// entezar darm status ==200 bashe
        .expect((res)=>{
            expect(res.body.text).toBe(text)//yani text res ba text ersali yki bashe

        })
        .end((err,res)=>{
            if(err){
              return done(err)
            }  
            //vaghti khata nadare
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(3);
                //console.log(`length Todos : ${todos.length}`);
                expect(todos[2].text).toBe(text);
                done();//etmamesh byad done konim          
            }).catch((e)=>done(e));//baraye eror yabiye bad az find
            //catch vaghto rokh mide ke error dashte bashim to prozhe

           

        });  
    });
    it("should not create todo with invalid body data",(done)=>{
        request(app)
          .post('/todos')
          .send({})
          .expect(400)
          .end((err,res)=>{
              if(err){
                  //console.log("hi")
                  return done(err)
              }
              Todo.find().then((todos)=>{
                    //console.log(todos.length)
                    expect(todos.length).toBe(2)
                    done();

              }).catch((e)=>{
                  done(e);
              })
          })
    })
})

describe("GET /todos",()=>{
    it("should get all todos",(done)=>{
       request(app)
          .get('/todos')
          .expect(200)
          .expect((res)=>{
                  expect(res.body.todos.length).toBe(2)

            })
          .end(done) 
    })
    
})

 describe("GET /todos/:id",()=>{
     it("Should return todo doc ",(done)=>{
        console.log(`/todos/${todos[0]._id.toHexString()}`);
        console.log()
         request(app)
           .get(`/todos/${todos[0]._id.toHexString()}`)//tohexstring adade id ro mide
           .expect(200)
           .expect((res)=>{
               expect(res.body.todo.text).toBe(todos[0].text)
           }) 
           .end(done);   
     })
     
     it("should retutn 404 if todo not found",(done)=>{
         var hexID = new ObjectID().toHexString();
        

         request(app)
           .get(`/todos/${hexID}`)
           .expect(404)
           .end(done)


     })

     it("should return for non-object id",(done)=>{
         request(app)
           .get('/todos/123456')
           .expect(404)
           .end(done)

     })
 })


describe("DELETE /todos/:id",()=>{
   it("should remove a todo",(done)=>{
       var hexid = todos[0]._id.toHexString();

       request(app)
          .delete(`/todos/${hexid}`)
          .expect(200)
          .expect((res)=>{
             expect(res.body._id).toBe(hexid)    
          })
          .end((err,res)=>{
              if(err){
                  return done(err)
              }
              Todo.findById(hexid).then((todo)=>{
                  expect(todo).toBeNull();
                  done();
              })
          })
   })
   it("should retutn 404 if todo not found",(done)=>{
    var hexID = new ObjectID().toHexString();
     
    console.log(hexID);
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(400)
      .end(done)


   })
   it("should return for non-object id",(done)=>{
        request(app)
          .delete('/todos/123456')
          .expect(404)
          .end(done)
    
   })
})

describe("PATCH /todos/:id",()=>{
    it('Should update todo',(done)=>{
        var hexid = todos[0]._id.toHexString();
        var text = 'this should be the new text for firt';

        request(app)
          .patch(`/todos/${hexid}`)
          .send({
              completed:true,
              text
          })
          .expect(200)
          .expect((res)=>{
              expect(res.body.text).toBe(text)
              expect(res.body.completed).toBe(true)
              expect(typeof res.body.completedAt).toBe('number')
           })
           .end(done)

    })
    it("SHould clear completedAt when in todo compeleted is false",(done)=>{

        var hexid = todos[1]._id.toHexString();
        var text = 'this should be the new text for second';

        request(app)
          .patch(`/todos/${hexid}`)
          .send({
              completed:false,
              text
          })
          .expect(200)
          .expect((res)=>{
              expect(res.body.text).toBe(text)
              expect(res.body.completed).toBe(false)
              expect(res.body.completedAt).toBeNull()
           })
           .end(done)
    })
})