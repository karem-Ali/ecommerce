const {Order,CartItem}=require('../models/order')
const {errorHandler}= require('../helpers/dbErrorhandler')

exports.create=(req,res)=>{
req.body.order.user=req.profile
const order =new Order(req.body.order)
order.save((err,data)=>{
    if(err){
        return res.status(400).json({
            error:errorHandler(err)
        })
    }
    return res.json(data)
})
}
exports.listOrders=(req,res)=>{
    Order.find()
    .populate('user',"_id name address")
    .sort('-created')
    .exec((error,orders)=>{
        if(error){
            return res.status(400).json({
                error:errorHandler(error)
            })
        }
        return res.json(orders)

    })
}
exports.getStatusValues=(req,res)=>{
    // access a specific type in order schema 
     res.json(Order.schema.path('status').enumValues)

}
exports.orderByid=(req,res,next,id)=>{
    Order.findById(id)
    .populate('product.product','name price')
    .exec((err,order)=>{
        if(err){
           return  res.status(400).json({
                error:errorHandler(err)
            })
        }
        req.order=order
        next()
    })

}
exports.UpdatOrderStatus=(req,res)=>{
    Order.update({_id:req.body.orderId},{$set:{status:req.body.status}},(err,order)=>{

        if(err){
            return  res.status(400).json({
                 error:errorHandler(err)
             })
         }
         res.json(order)
    })
}