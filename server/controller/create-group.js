import pool from "../config/connection";
import validateGroup from "../helpers/groups";
exports.createGroup=(req,res)=>{
    const group={
        name:req.body.name,
        role:req.body.role,
        ownerId: req.user.id
    };
  
  const { error } = validateGroup(req.body)
  if(error) return res.status(400).json({ status: 400, error: error.details[0].message })

  const selectGroupsSql = " SELECT * FROM groups WHERE name = $1";
  pool.query(selectGroupsSql, [group.name])
    .then(grp =>{
      if (grp.rows.length > 0) return res.status(400)
    .json({ status: 400, message: "Group name is already taken"})

    // Save group inside group table
    const createGroupSql="INSERT INTO groups (name, role, owner_id) VALUES($1, $2, $3) RETURNING *";
    //console.log(createGroupSql);
    pool.query(createGroupSql, [group.name, group.role, group.ownerId])
    .then(group =>{

        // eslint-disable-next-line no-undef
        return res.send({ status:201, data: group.rows[0] });
    })
    .catch(err=>{
      //console.log(err);
    return res.status(500).json({ status: 500, error:err });
    })
    })
    .catch(err=>{
      //console.log(err);
      return res.status(500).json({ status: 500, error:err });
    })

}