const monogoose=require('mongoose')
const {ObjectId}=monogoose.Schema
const productSchema= new monogoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32

    },
    description:{
        type:String,
        required:true,
        maxlength:2000
    },
    price:{
        type:Number,
        trim:true,
        required:true,
        required:true
    },
    category:{
        type:ObjectId,
        ref:'Category'//referer to category model
    },
    quantity:{
        type:Number
    },
    sold:{
        type:Number,
        default:0
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    shipping:{
        required:false,
        type:Boolean
    },
    userId:String
    
},{timestamps:true})


module.exports= monogoose.model('Product',productSchema)