const express=require('express')
const router=express.Router()
const {requiresingin,isAuth,isAdmin}=require('../controllers/auth')
const {userByid,addOrderTouserHistory}=require('../controllers/user')
const {create,listOrders,getStatusValues,orderByid,UpdatOrderStatus}=require('../controllers/order')
const {decreaseQuantity}=require('../controllers/product')
router.post('/order/create/:userId',requiresingin,isAuth,addOrderTouserHistory,decreaseQuantity,create)
router.get('/order/list/:userId',requiresingin,isAuth,isAdmin,listOrders)
router.get('/order/status-values/:userId',requiresingin,isAuth,isAdmin,getStatusValues)
router.put('/order/:orderId/status/:userId',requiresingin,isAuth,isAdmin,UpdatOrderStatus)


router.param('userId',userByid)
router.param('orderId',orderByid)


module.exports=router