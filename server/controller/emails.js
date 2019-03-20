import pool from "../config/connection";
exports.getEmails = (req, res)=>{
    const sql = "SELECT * FROM messages WHERE receiver_id=$1";
    pool.query(sql,[req.user.id])
     .then(messages =>{
         // Check if there is any email
         if(messages.rows.length === 0){
             return res.status(404).json({notFound:"sorry there no messages"});
         }
         return res.send ({status: 200, messages:messages.rows });
     })
     .catch(error=>{
        //  console.log(error);
      return res.status(500).json({error});
     })
}