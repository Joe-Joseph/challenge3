import pool from "../config/connection";
exports.createGroup=(req,res)=>{
    const group={
        name:req.body.name,
        role:req.body.role
    };
    // Save group inside group table
   const createGroupSql="INSERT INTO group (name,role) VALUES($1,$2) RETURNING *";
   //console.log(message);
   pool.query(createGroupSql, [group.name, group.role])
   .then(group =>{

       // eslint-disable-next-line no-undef
       return res.send({ status:201, data: group.rows[0] });
     })
   .catch(err=>{
       console.log(err);
    return res.status(500).json({ error:err });
  })

}