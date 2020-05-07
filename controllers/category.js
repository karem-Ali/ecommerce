const Category=require('../models/category')
const {errorHandler}= require('../helpers/dbErrorhandler')
const _=require('lodash')

exports.create=(req,res)=>{
    let category=new Category(req.body)
    category.save((err,data)=>{
        if(err){
           return  res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json({data})
    })
}
exports.categoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err){
            return res.status(400).json({
                err
            })
        }
        req.category=category
        next()
    })
}
exports.read=(req,res)=>{
    res.json(req.category)
}
exports.update=(req,res)=>{
   let category=req.category
   category.name=req.body.name
   category.save((err,category)=>{
       if(err){
           res.status(400).json({
               err
           })
       }
       res.json(category)

   })
}
exports.remove=(req,res)=>{
    let category=req.category
    category.remove((err,category)=>{
        if(err){
            res.status(400).json({
                err
            })
        }
        res.json({
            message:"successfully removed"
        })
 
    })
 }
 exports.list=(req,res)=>{
     Category.find().exec((error,data)=>{
        if(error){
            res.status(400).json({
                error
            })
        }
        res.json(data)

     })
 }