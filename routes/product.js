const express=require('express')
const router=express.Router()
const {userByid}=require('../controllers/user')

const {requiresingin,isAuth,isAdmin}=require('../controllers/auth')
const {create,productByid,read,isProductCreator,remove,update,list,listRelated,listSearch,photo,listBySearch}=require('../controllers/product')
router.param('userId',userByid)
router.param('productId',productByid)
router.get('/product/:productId',read)
router.get('/products',list)
router.get("/products/search", listSearch);
router.get('/products/related/:productId',listRelated)
router.post("/products/by/search", listBySearch);
router.get('/product/photo/:productId',photo)
router.post('/product/create/:userId',requiresingin,isAuth,create)
router.delete('/product/:productId/:userId',requiresingin,isAuth,isProductCreator,remove)
router.put('/product/update/:productId/:userId',requiresingin,isAuth,isProductCreator,update)

module.exports= router
