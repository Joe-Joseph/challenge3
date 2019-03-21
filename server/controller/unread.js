import pool from "../config/connection";

exports.unreadEmails=(req,res)=>{
    // Get unread emails for logged in user
    const sql="SELECT * FROM messages WHERE receiver_id=$1 AND status=$2";
    pool.query(sql,[req.user.id,"unread"])
     .then(unread=>{
         if(unread.rows.length===0){
            return res.send({status:404, error:"sorry there is no unread messages."});
         }
         return res.send({status:200, data: unread.rows});
     })
     .catch(error=>{
        //  console.log(error);
        return res.status(500).json({error});
     })
}