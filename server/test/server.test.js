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

const todos =[{
    text :"first text for test"
},{
    text :"second text for test"
}]
//paksaziye hameye dadeha ba dastore zir
beforeEach((done)=>{
    Todo.deleteMany({}).then(()=>{
        return Todo.insertMany(todos);
    }).then(()=>done())
})//removw({}) yani hamaro az beyn bebare 


describe("POST /todos",()=>{
    it("should create a new Todo",(done)=>{
        var text ="text todo text";


        request(app)
        .post('/todos')//masiri ke dakhele server.js hast
        .send({text})
        .expect(400)// entezar darm status ==200 bashe
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
                console.log(`length Todos : ${todos.length}`);
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
          //.expect(400)
          .end((err,res)=>{
              if(err){
                  console.log("hi")
                  return done(err)
              }
              Todo.find().then((todos)=>{
                    console.log(todos.length)
                    expect(todos.length).toBe(3)
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
          .post('/todos')
          .expect(400)
          .end((err,res)=>{
            Todo.find().then((todos)=>{
                  expect(todos.length).toBe(3)
                  done()

            })
        })
    })
})
