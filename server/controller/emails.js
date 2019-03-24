import pool from "../config/connection";
exports.getEmails = (req, res)=>{
    const sql = "SELECT * FROM messages WHERE receiver_id=$1";
    pool.query(sql,[req.user.id])
     .then(messages =>{
         // Check if there is any email
         if(messages.rows.length === 0){
             return res.status(404).json({ status:404, message:"sorry there no messages" });
         }
         return res.status(200).json({ status: 200, data: messages.rows });
     })
     .catch(error=>{
        //  console.log(error);
      return res.status(500).json({status: 500, error: error});
     })
}