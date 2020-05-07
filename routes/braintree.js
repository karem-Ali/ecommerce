const express=require('express')
const router=express.Router()
const {requiresingin,isAuth}=require('../controllers/auth')
const {userByid}=require('../controllers/user')
const {generateToken,processPayment}=require('../controllers/braintree')


router.get("/braintree/getToken/:userId",requiresingin,isAuth,generateToken)
router.post("/braintree/payment/:userId",requiresingin,isAuth,processPayment)

router.param('userId',userByid)

module.exports=router