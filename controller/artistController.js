const User=require('../model/user/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

//user registration
const artistRegistration=async(req,res)=>{
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
    const token=jwt.sign({_id:_id},process.env._JWT_ARTIST_SECERETKEY,{expiresIn:expiryTime})
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
        console.log("Error in artist Registration",error);
        return res.status(500).send({message:"Error in artist Registration"})
    }
}

const artistLogin=async(req,res)=>{
    try {
        const artistExist=await User.findOne({email:req.body.email})
        if(!artistExist){
            return res.status(404).send({message:"user not found"})
        }
        if(!artistExist.isArtist){
            return res.status(404).send({message:"user not found"})
        }

        const password=await bcrypt.compare(req.body.password,artistExist.password)
        if(!password){
            return res.status(404).send({message:"password not match"})
        }
       
        const expiryTime=36000
        const{_id}=artistExist.toJSON()
        const token=jwt.sign({_id:_id},process.env._JWT_ARTIST_SECERETKEY,{expiresIn:expiryTime})
    

 const payload={
            _id:artistExist._id,
            firstName:artistExist.firstName,
            lastName:artistExist.lastName,
            email:artistExist.email,
            expiresIn:expiryTime.toString(),
            token:token,
            isArtist:artistExist.isArtist
        }

return res.status(200).json(payload)
      
    } catch (error) {
        console.log("Error in artistlogin",error);
        return res.status(500).send({message:"Error in artist login"})
        
    }
}

module.exports={
    artistRegistration,
    artistLogin
    
}

