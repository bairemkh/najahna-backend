import Message from "../models/message.js";
import User from "../models/user.js";
export function createMessage(req, res){
    //const sender =User.findById(req.body.senderid)
    //const receiver =User.findById(req.body.receiver)
    Message.create({
        senderid:req.body.senderid,
        receiverid:req.body.receiverid,
        msgContent:req.body.msgContent
    }).then(newMessage => {
        res.status(200).json(newMessage);
    }).catch((err) => {
        res.status(500).json({error: err})
    })

}
export function getAllMessages(req,res){
    let messages = Message.find({}).then(items=>{
        res.status(200).json(items)
    }).catch(err=>{
        res.status(500).json({error:err})
    })
    
}
/*export function getContacts(req,res) {
    Message.find().then(allMessages=>{
        console.log(req.user.id);
        let ownMessages = allMessages.filter(message=>message.receiverid==req.user.id||message.senderid==req.user.id)
        User.find().then(allUsers=>{
           let contacts = allUsers.filter(u=>ownMessages.some(m=> (m.receiverid==u.id||m.senderid==u.id)&&u.id!=req.user.id))
           res.status(200).json(contacts)
        }).catch(err=>{res.status(500).json(err)})
    }).catch(error=>res.status(500).json(error))
}*/

export function getContacts(req,res) {
    getMessagesFromUser(req.user).then(result=>{
        res.status(200).json({Contacts:result})
    })
    .catch(error=>{
        res.status(500).json({Error:error})
    })
}

async function  getMessagesFromUser(current){
    try{
        const messages = await ownMessages(current)
        let users = await User.find()
        let list = []
        //User:user,Messages:messages.filter(m=>(m.receiverid==current.id||m.senderid==current.id)&&(m.receiverid==user.id||m.senderid==user.id)&&user!==current).length
        //users = users.filter(user=>messages.filter(m=>(m.receiverid==current.id||m.senderid==current.id)&&(m.receiverid==user.id||m.senderid==user.id)&&user.id!==current.id).length!==0)
        //users.forEach(user=>list.push({User:user,Messages:messages.filter(m=>(m.receiverid==current.id||m.senderid==current.id)&&(m.receiverid==user.id||m.senderid==user.id)&&user!==current)}))
        users.forEach(user=>{
            if(user.id!==current.id){
               const messagesContact= messages.filter(message=>(message.senderid==user.id)||(message.receiverid==user.id))
               if(messagesContact.length!==0)
               {list.push({User:user,Messages:messagesContact})}
            }
        })
        return list
    }catch(err){
        return {error:err}
    }
}

async function ownMessages(user){
    let messages=await Message.find()
    return messages.filter(message=>message.receiverid==user.id||message.senderid==user.id)
}

export function createMessageSocket(msg){
    Message.create({
        senderid:msg.senderid,
        receiverid:msg.receiverid,
        msgContent:msg.msgContent
    }).then(newMessage => {
        return newMessage
    }).catch((err) => {
        return err
    })
    return {msg}
}