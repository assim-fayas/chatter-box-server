const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
  
    timestamp: {
        type: Date,
        default: Date.now
    }
});



const groupChatSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    groupName: {
        type: String,
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    messages: [messageSchema]
});



module.exports = mongoose.model("GroupChat", groupChatSchema);
