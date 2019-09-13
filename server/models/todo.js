const mongoose = require('mongoose');

var Todo =mongoose.model('Todo',{
    text:{
        type:String,
        //required:true,//validation 
       // minlength:1,//validation
        trim:true// space validation
    },
    completed:{
        type:Boolean,
        default:false//defult baraye inke age meghdari baraye coplet 
        // nabashe meghdare defult bejash ghara migire
    },
    completedAt:{
        type:Number,
        default:null
    }
});
//modele raftario baraye motaghayer dar nazar migirim
// har bar ba motaghayer todo new konim ye motaghaye misazim 
// va jame hameye in motaghayer ha mishe Todos ke jame hamaye motaghayerhast
 
module.exports={Todo}