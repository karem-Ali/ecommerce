const User=require('../models/user')
const {errorHandler}= require('../helpers/dbErrorhandler')
const jwt=require('jsonwebtoken');//for generate token
const expressjwt=require('express-jwt')// use for authorization check 
exports.signup=(req,res)=>{
    const user =new User(req.body)
    user.save((err,user)=>{

        if(err){
            return res.status(400).json({
                err:errorHandler(err)
            })
        }
        user.salt=undefined
        user.hashed_password=undefined
        return res.json({
            user
        })
    })
}
exports.signin=(req,res)=>{
    // find user by email 
    const {email,password}=req.body
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                err:"user with that email  doesnot exit please signup"
            })
        }
        // if user is found make sure the  password is match 
        // create a authentiacted method for user model
        if(!user.authenticated(password)){
            return res.status(401).json({error: 'Email and password dont match'})
        }

        //generate a sign token with secrete id 
        const token=jwt.sign({_id:user.id},process.env.jwt)
        //parsest the token as token_signin in cookie with expire date 
        res.cookie('token_signin',{expire:new Date() + 99999}) 
        // return user and token for the front end 
        const {_id,name,email,role}=user
        return res.json({token,user:{_id,name,email,role}})

    })
    
}
exports.signout=(req,res)=>{
    res.clearCookie('token_signin')
    res.json({message:'successful signout '})
}

exports.requiresingin= expressjwt({
    secret :'tokenwebfortokensignin',
    userProperty:'auth'
})
exports.isAuth=(req,res,next)=>{
    let user =req.profile && req.auth && req.profile._id ==req.auth._id
    console.log(req.auth._id,req.profile._id,user)
    if(!user){
      return  res.status(403).json({
            error:'access denied '

        })
    }
    next()

}
exports.isAdmin=(req,res,next)=>{
    if(req.profile.role === 0){
        res.status(403).json({
            error:'access denied Admin resource'
        })
    }
    next()
}