const User=require('../models/user')
const braintree= require('braintree')
require('dotenv').config()
const gateway=braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId:process.env.BRIANTREE_MERCHANT_ID,
    publicKey:process.env.BRIANTREE_PUBLIC_KEY,
    privateKey:process.env.BRIANTREE_PRIVATE_KEY
})
exports.generateToken=(req,res)=>{
    gateway.clientToken.generate({},function(error,response){
        if(error){
            res.status(500).send(error)
        }else{
            res.send(response)
        }
    })
}
exports.processPayment=(req,res)=>{
    let nonceFromCliten=req.body.paymentMethodNonce
    let amountfromClient=req.body.amount
    let newTransaction= gateway.transaction.sale({
       amount: amountfromClient,
       paymentMethodNonce:nonceFromCliten,
       options:{
           submitForSettlement:true
       }
    },(error,result)=>{
        if(error){
            res.status(500).json(error)
        }else{
            res.json(result)
        }

    })

}