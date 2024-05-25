const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
module.exports={
   dbconnect:()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("connect to database successfully"))
    .catch((err)=>{
    console.log(err)
   console.log("Error occured while connecting to Db")
})
 }}