import pool from "../config/connection";

exports.sentEmail = (req,res)=>{
    //get sent messages for logged in user
    const sql="SELECT * FROM sent INNER JOIN messages ON messages.sender_id=sent.user_id  AND messages.message_id=sent.message_id WHERE sent.user_id=$1";
    pool.query(sql, [req.user.id])
    //console.log(req.user.id)
     .then(messages=>{
         if(messages.rows.length === 0){
             return res.status(404).json({ error:"sorry there is no sent messages." });
         }
         return res.status(200).json({ messages:messages.rows });
     })
     .catch(error=>{
         console.log(error);
     })
 }