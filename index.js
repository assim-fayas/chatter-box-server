//Chatter Box
// importing express,mongoose,cors,cookieparser and .env modules
const express = require('express')
const cors=require('cors')
const cookieparser = require('cookie-parser')
const app=express()
require("dotenv").config()

//importing userRoutes and admin routes
const userRoute=require('../server/routes/userRoute')
const adminRoute=require('../server/routes/adminRoute')

//database connection
const connection=require('../server/config/connection')
connection.dbconnect()

//cors connection
app.use(cors({
    credentials: true,
    origin: ['*','http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH']
}))


app.use(cookieparser())
app.use(express.json())

//admin route and user route
app.use('',userRoute)
app.use('/admin',adminRoute) 


//server connection
app.listen(process.env.PORT,()=>{
    console.log("server is listening to the port");
})
