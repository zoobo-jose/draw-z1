const mongoose= require('mongoose');
// schema du model
const projetSchema=mongoose.Schema(
    {
        name:{
            type:String,
            require:true
        },
        shapes:{
            type:String,
            require:false
        }
    }
)
module.exports=mongoose.model('projet',projetSchema);