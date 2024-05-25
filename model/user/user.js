const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name:{
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