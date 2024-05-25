const User=require('../model/user/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

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
        const userExist=await User.findOne({email:req.body.email})
        if(!userExist){
            return res.status(404).send({message:"user not found"})
        }

        const password=await bcrypt.compare(req.body.password,userExist.password)
        if(!password){
            return res.status(404).send({message:"password not match"})
        }
        if(userExist.isBlocked){
            return res.status(404).send({message:"your account is suspended"})
        }
        const expiryTime=36000
        const{_id}=userExist.toJSON()
        const token=jwt.sign({_id:_id},process.env._JWT_USER_SECERETKEY,{expiresIn:expiryTime})
    

 const payload={
            _id:userExist._id,
            firstName:userExist.firstName,
            lastName:userExist.lastName,
            email:userExist.email,
            expiresIn:expiryTime,
            token:token
        }
const user=JSON.stringify(payload)

res.status(200).json({user})
      
    } catch (error) {
        console.log("Error in user login",error);
        return res.status(500).send({message:"Error in user login"})
        
    }
}

module.exports={
    userRegistration,
    userLogin
    
}