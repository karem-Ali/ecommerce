const express=require('express')
const router=express.Router()
const {userByid,read,UpdateProfile,isOwnerProfile,purchaseHistory}=require('../controllers/user')
const {requiresingin,isAuth,isAdmin}=require('../controllers/auth')
router.get('/secret/:userId',requiresingin,isAuth,isAdmin,(req,res)=>{
       res.json({
         user:req.profile
      })
  
  })
  router.get('/user/:userId',requiresingin,isAuth,read)
  router.get('/orders/by/user/:userId',requiresingin,isAuth,purchaseHistory)

  router.put('/user/:userId',requiresingin,isAuth,isOwnerProfile,UpdateProfile)

router.param('userId',userByid)
module.exports= router
