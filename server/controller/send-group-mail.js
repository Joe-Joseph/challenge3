import pool from '../config/connection'
import moment from 'moment'

exports.groupMail = (req, res)=>{
    const groupId = req.params.groupId
    const senderId = req.user.id
    // New message
    const message = {
        subject: req.body.subject,
        message: req.body.message,
        createdOn: moment().format('LL'),
        status: "sent"
    }
    // Check if the group exist
    const checkGroupSql = "SELECT * FROM groups WHERE group_id = $1"
    pool.query(checkGroupSql, [groupId])
    //console.log(groupId)
    .then(foundGroup =>{
        if(!foundGroup.rows[0])
        return res.status(404).json({ status: 404, error: "Group not found" })

        // send email to the group
        const sendEmailSql = "INSERT INTO group_messages (subject, message, sender_id, group_id, status, created_on) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"
        pool.query(sendEmailSql, [message.subject, message.message, senderId, groupId, message.status, message.createdOn])
        .then(sent =>{
            if(!sent.rows[0])
            return res.status(400).json({ status:400, error: "Message not sent to the group" })

            return res.status(201).json({ status: 201, message: "Email sent successfully", data: sent.rows[0]})
        })
        .catch(error =>{
            res.status(500).json({ status: 500, error: error})
        })
    })
    .catch(error => {
        res.status(500).json({ status: 500, error: error })
    })
}