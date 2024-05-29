const mongoose = require('mongoose')


const chatSchema = new mongoose.Schema(
    {
        members: [String],
        messages: [
            {
                text: {
                    type: String,
                    required: true,
                },
               
                senderId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
              
                reciverId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                timestamp: {
                    type: Date,
                    default: Date.now()
                }

            },
        ],
    },
);

module.exports = mongoose.model("Chat", chatSchema);

