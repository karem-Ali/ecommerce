const monogoose=require('mongoose')
const { v1: uuidv1 } = require('uuid');//unique string gnerator
const categorySchema= new monogoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        unique:true

    }
    
},{timestamps:true})

//virtual field 

module.exports= monogoose.model('Category',categorySchema)