const User=require('../model/user/user')
const bcrypt=require('bcryptjs')

//user registration
const userRegistration=async(req,res)=>{
    try {
        console.log("inside");
        const {firstName,lastName,password,email}=req.body;
        const emailExist=await User.findOne({email:email})
        if(emailExist){
            return res.status(400).send({message:"Email already exist"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=new User({
            firstName:firstName,
            lastName: lastName,
            password:  hashedPassword,
            email:email
        })

const saveUser=await user.save()

console.log("saveUser",saveUser);
if(saveUser){
    return res.status(201).send({ message: "Registration completed successfully" })
}
    } catch (error) {
        console.log("Error in user Registration",error);
        return res.status(500).send({message:"Error in user Registration"})
    }
}

const userLogin=async(req,res)=>{
    try {
        console.log("inside login");
        return
    } catch (error) {
        
    }
}

module.exports={
    userRegistration,
    userLogin
    
}