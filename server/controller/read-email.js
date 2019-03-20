import pool from "../config/connection";
exports.readEmail=(req,res)=>{
    const messageId=req.params.messageId;
    const sql="SELECT * FROM messages WHERE message_id=$1 AND receiver_id=$2";
    pool.query(sql,[messageId,req.user.id])
     .then(messages=>{
         if(messages.rows.length===0){
            return res.send({status:404, error:"sorry message not found."});
         }else{
              // update message
              const updateMessage="UPDATE messages SET status=$1 WHERE message_id=$2 RETURNING *";
              pool.query(updateMessage,["read",messageId])
                .then(data=>{
                    return res.send({status:200, data:data.rows[0]});
                })
                .catch((errors)=>{
                    //console.log(errors);
                    return res.status(500).json({errors});
                })
         }
        
     })
     .catch((error)=>{
         //  console.log(error);
        return res.status(500).json({error});
     })
}