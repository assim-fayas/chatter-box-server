//Chatter Box
// importing express,mongoose,cors,cookieparser and .env modules
const express = require('express')
const cors=require('cors')
const cookieparser = require('cookie-parser')
const app=express()
const http = require('http').createServer(app); // Create HTTP server
const intializeSocket=require('./socket.io/socket')
require("dotenv").config()

//importing userRoutes and admin routes
const userRoute=require('../server/routes/userRoute')
const artistRoute=require('../server/routes/artistRoute')

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
app.use('/artist',artistRoute) 


// Start the server
const server = http.listen(process.env.PORT, () => {
    console.log("Server started listening to port");
});

intializeSocket(server)
