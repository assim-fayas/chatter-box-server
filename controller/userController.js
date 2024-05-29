const User=require('../model/user/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

//user registration
const userRegistration=async(req,res)=>{
    try {
        const {firstName,lastName,password,email,isArtist}=req.body;
        console.log("isArtist",req.body.isArtist);
        const emailExist=await User.findOne({email:email})
        if(emailExist){
            return res.status(400).send({message:"Email already exist"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=new User({
            firstName:firstName,
            lastName: lastName,
            password:  hashedPassword,
            email:email,
            isArtist:isArtist
        })

const saveUser=await user.save()

console.log("saveUser",saveUser);
if(saveUser){
    const expiryTime=36000
    const{_id}=saveUser.toJSON()
    const token=jwt.sign({_id:_id},process.env._JWT_USER_SECERETKEY,{expiresIn:expiryTime})
    const payload={
        _id:saveUser._id,
        firstName:saveUser.firstName,
        lastName:saveUser.lastName,
        email:saveUser.email,
        expiresIn:expiryTime.toString(),
        token:token,
        isArtist:saveUser.isArtist
    }
    return res.status(200).json(payload)
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
        if(userExist.isArtist){
            return res.status(404).send({message:"user not found"})
        }
        const expiryTime='36000'
        const{_id}=userExist.toJSON()
        const token=jwt.sign({_id:_id},process.env._JWT_USER_SECERETKEY,{expiresIn:expiryTime})
    

 const payload={
            _id:userExist._id,
            firstName:userExist.firstName,
            lastName:userExist.lastName,
            email:userExist.email,
            expiresIn:expiryTime.toString(),
            token:token,
            isArtist:userExist.isArtist
        }

return res.status(200).json(payload)
      
    } catch (error) {
        console.log("Error in user login",error);
        return res.status(500).send({message:"Error in user login"})
        
    }
}



const userListing=async(req,res)=>{
    try {
    console.log("inside user listing");
const user=await User.find({})
if(user){
    return res.status(200).json(user)
}else{
    return res.status(404).send({message:"user not found"})
}
    } catch (error) {
        console.log("Error in user userListing",error);
        return res.status(500).send({message:"Error in user listing"})
        
    }
}

const singleUser=async(req,res)=>{
    try {
        const id=req.params.id
    
        const user=await User.findOne({_id:id}).select('email firstName isArtist lastName _id')
        if(user){
            return res.status(200).json(user)
        }else{
            return res.status(404).send({message:"user not found"})
        }

    } catch (error) {
        console.log("Error in getting the user",error);
        return res.status(500).send({message:"Error in getting the user"})
    }
}

module.exports={
    userRegistration,
    userLogin,
    userListing,
    singleUser
    
}