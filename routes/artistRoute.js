const express=require('express')
const artistRoute=express.Router()



// controllers
const artistController = require('../controller/artistController')



//user Routes

artistRoute.post('/register',artistController.artistRegistration)
artistRoute.post('/login',artistController.artistLogin)




module.exports=artistRoute