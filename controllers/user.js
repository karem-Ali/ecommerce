const User=require('../models/user')
const {Order,CartItem}=require('../models/order')

const {errorHandler}= require('../helpers/dbErrorhandler')

exports.userByid=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err){
            return res.json({
                err
            })
        }
        req.profile =user
        next()
    })

}
exports.isOwnerProfile=(req,res,next)=>{
    if(req.profile._id != req.params.userId ){
        res.json({
            error:" you are not the profile Owner"
        })
    }
    next()
}
exports.read=(req,res)=>{
    let user =req.profile
    user.hashed_password=undefined
    res.json(user)
}
exports.UpdateProfile=(req,res)=>{
    User.findOneAndUpdate({_id:req.profile._id},
        {$set:req.body},
        {new:true},
        (err,user)=>{
            if(err){
               return res.json({
                    error:"you are not authorized"
                })
            }
            user.hashed_password=undefined
            user.salt=undefined
            res.json(user)
        }
        )
}
exports.addOrderTouserHistory=(req,res,next)=>{
    let history=[]
    req.body.order.products.forEach(item=>{
        history.push({
            transaction_id:req.body.order.transaction_id,
            id:item._id,
            name:item.name,
            category:item.category,
            quantity:item.count,
            amount:req.body.order.amount
            
        })
        User.findByIdAndUpdate({_id:req.profile._id},{$push:{history:history}},{new:true},(err,data)=>{
            if(err){
                return res.status(400).json({
                    error:'could not update user parchase history'
                })
            }
            next()
        })


    })
}
exports.purchaseHistory=(req,res)=>{
    Order.find({user:req.profile._id})
    .populate('user','_id name')
    .sort('-created')
    .exec((err,orders)=>{
        if(err){
            return res.json({
                error:errorHandler(err)
            })
        }
        res.json(orders)
    })
}