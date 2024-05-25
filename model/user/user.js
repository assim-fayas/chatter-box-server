const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },

},

{
    timestamps: {
        createdAt: 'joined',
        updatedAt: 'updated'

    },
}

)
module.exports=mongoose.model("User",userSchema)