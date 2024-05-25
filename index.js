const express = require('express')
const app=express()
const cors=require('cors')
const cookieparser = require('cookie-parser')
require("dotenv").config()
const connection=require('../server/config/connection')
connection.dbconnect()



app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH']
}))


app.use(cookieparser())
app.use(express.json())



app.listen(process.env.PORT,()=>{
    console.log("server is listening to the port");
})
