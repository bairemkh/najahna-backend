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

export function createMessageSocket(msg){
    /*Message.create({
        senderid:msg.senderid,
        receiverid:msg.receiverid,
        msgContent:msg.msgContent
    }).then(newMessage => {
        return newMessage
    }).catch((err) => {
        return err
    })*/
    return {msg}
}