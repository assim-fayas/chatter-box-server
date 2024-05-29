const mongoose = require('mongoose');
const Chat=require('../model/chat/chat')
const GroupChat=require('../model/chat/groupChat')
const Group=require('../model/chat/group')


const sendMessage = async (message) => {
    try {
        const {senderId, reciverId}  = message
        console.log(senderId,reciverId);
        let existingConnection;
        await Chat.findOne({ members: { $all: [senderId, reciverId] } })
            .then((chat) => {
                if (!chat) {
                    existingConnection = new Chat({
                        members: [senderId, reciverId],
                        messages: []
                    });
                } else {
                    existingConnection = chat;
                }

                const newMessage = {
                    text: message.text,
                    senderId: senderId,
                    reciverId: reciverId,
                    timestamp: Date.now()
                };

                existingConnection.messages.push(newMessage);
                return existingConnection.save();
            })
            .then((result) => {
                console.log({ message: "Chat saved successfully" });;
            })
            .catch((error) => {
                console.log({ message: "Error in message sending" });

            });

    } catch (error) {
        console.log(error);

    }
};

const sendGroupMessage = async (message) => {
    const { groupId, groupName, sender, message: text } = message;

    try {
        // Find the group chat by groupId
        let groupChat = await GroupChat.findOne({ groupId });

        // If the group chat doesn't exist, create a new one
        if (!groupChat) {
            groupChat = new GroupChat({
                groupId,
                groupName,
                members: [sender], // Initialize with the sender as a member
                messages: []
            });
        }

        // Create a new message
        const newMessage = {
            text,
            sender,
            timestamp: new Date() // You can omit this if you want Mongoose to use the default
        };

        // Add the new message to the group's messages
        groupChat.messages.push(newMessage);

        // If the sender is not already a member of the group, add them
        if (!groupChat.members.includes(sender)) {
            groupChat.members.push(sender);
        }

        // Save the group chat document
        await groupChat.save();

        console.log('Message saved successfully:', newMessage);
    } catch (error) {
        console.error('Error saving message:', error);
    }
};



const fetchChats = async (req, res) => {
    try {
        // console.log("Inside fetch chats");
        const receiverId = req.params.receverId;
        const senderId = req.params.senderId;



        const matchDocument = await Chat.aggregate([
            {
                $match: {
                    members: {
                        $all: [senderId, receiverId]
                    }
                }
            },
            {
                $project: {
                    messages: 1
                }
            }
        ]);
           
            return res.json(matchDocument);

        } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Error in message fetching" });
        }
    }



    
    const fetchGroupChats = async (req, res) => {
        const { groupId } = req.params;
    
        try {
       
            const groupChat = await GroupChat.findOne({ groupId })
                .populate({
                    path: 'messages.sender',
                    select: 'firstName' 
                })
                .select('groupId groupName messages'); 
    
        
            if (!groupChat) {
                return res.status(404).send({ message: 'Group chat not found' });
            }
    
     
            const response = {
                groupId: groupChat.groupId,
                groupName: groupChat.groupName,
                messages: groupChat.messages.map(message => ({
                    _id:message.sender._id,
                    text: message.text,
                    sender: message.sender.firstName,
                    timestamp: message.timestamp
                }))
            };
    
            // Return the structured response
            res.status(200).send(response);
        } catch (error) {
            console.error('Error fetching group chat:', error);
            res.status(500).send({ message: 'Error in fetching group chat' });
        }
    };


    
const createGroup=async(req,res)=>{
    try {
        const{groupName,members}=req.body
        if (!groupName || !members || members.length === 0) {
            return res.status(400).send({ message: 'Group ID, group name, and at least one member are required' });
        }
        const newGroup = new Group({
            groupName,
            members
        });

        const savedGroupChat = await newGroup.save();
        res.status(201).json(savedGroupChat);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error in group creating" });
    }
}
const fetchAllGroups=async(req,res)=>{
    try {
        const allGroups=await Group.find({})
        res.status(200).json(allGroups);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error in group fetching" });
        
    }
}

module.exports={
    sendMessage,
    fetchChats,
    createGroup,
    fetchAllGroups,
    sendGroupMessage,
    fetchGroupChats
    
}