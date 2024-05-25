const express=require('express')
const userRoute=express.Router()

// controllers
const userController = require('../controller/usercontroller')



//user Routes

userRoute.post('/register',userController.userRegistration)
userRoute.post('/login',userController.userLogin)





module.exports=userRoute