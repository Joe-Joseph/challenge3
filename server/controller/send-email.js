import pool from "../config/connection";
exports.sendEmail=(req,res)=>{
    const message={
        subject:req.body.subject,
        message:req.body.message,
        senderId:req.user.id,
        receiverId:parseInt(req.body.receiverId),
        status:"sent",
    };
    // Save email inside messages table
   const sql="INSERT INTO messages (subject,message,sender_id,receiver_id,status) VALUES($1,$2,$3,$4,$5) RETURNING *";
   //console.log(message);
   pool.query(sql,[message.subject, message.message, message.senderId, message.receiverId, message.status])
    .then(messages=>{
        const sentSql="INSERT INTO sent (user_id, message_id) VALUES ($1,$2)";
        //console.log("Any2");
        // check if message saved successfully inside messages table
        if(messages.rows.length===0){
            return res.status(500).json({error:"sorry message not sent, try again"});
        }else{
        // Then save sent email into sent table
        const sents={
            userId: messages.rows[0].sender_id,
            messageId: parseInt(messages.rows[0].message_id)
        };
        pool.query(sentSql,[sents.userId, sents.messageId])
          .then(sent=>{
              //console.log("Any3");
              return res.status(201).json({ message: " message sent successfully ", messages:messages.rows });
          })
          .catch((error)=>{
              // console.log(error);
            return res.status(500).json({error});
          })
        }

    })
    .catch((errors)=>{
        //console.log(errors);
        return res.status(500).json({errors});
    })

}