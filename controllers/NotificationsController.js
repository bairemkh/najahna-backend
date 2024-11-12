import Notification from "../models/notification.js"
export function createNotificationSocket(notif){
    Notification.create({
        Content:notif.Content,
        Title:notif.Title
    }).then(n => {
        return n
    }).catch((err) => {
        return err
    })
    return {notif}
}
export function getAllNotifs(req,res){
    Notification.find({}).then(items=>{
        res.status(200).json(items)
    }).catch(err=>{
        res.status(500).json({error:err})
    })
    
}