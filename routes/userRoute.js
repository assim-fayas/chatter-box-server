const express=require('express')
const userRoute=express.Router()

// controllers
const userController = require('../controller/userController')
const chatController=require('../controller/chatController')

//middleware
const userMiddeleWare=require('../middlewares/userAuth')

//user Routes

userRoute.post('/register',userMiddeleWare,userController.userRegistration)
userRoute.post('/login',userMiddeleWare,userController.userLogin)
userRoute.get('/listUser',userController.userListing)
userRoute.get('/sigleUser/:id',userMiddeleWare,userController.singleUser)
userRoute.get('/fetchAllPrivatechats/:senderId/:receverId',chatController.fetchChats)
userRoute.post('/createGroup',chatController.createGroup)
userRoute.get('/fetchAllgroups',chatController.fetchAllGroups)
userRoute.get('/fetchAllGroupChat/:groupId',chatController.fetchGroupChats)




module.exports=userRoute