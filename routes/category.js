const express=require('express')
const router=express.Router()
const {userByid}=require('../controllers/user')

const {requiresingin,isAuth,isAdmin}=require('../controllers/auth')
const {create,categoryById,read,update,list,remove}=require('../controllers/category')
router.param('userId',userByid)
router.get('/category/:categoryId',read)
router.get('/categories',list)

router.post('/category/create/:userId',requiresingin,isAuth,isAdmin,create)
router.put('/category/update/:userId',requiresingin,isAuth,isAdmin,update)
router.delete('/category/delete/:categoryId/:userId',requiresingin,isAuth,isAdmin,remove)


router.param('categoryId',categoryById)



module.exports= router
