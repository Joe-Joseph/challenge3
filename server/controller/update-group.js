import pool from '../config/connection'
import validateGroup from '../helpers/groups'

exports.updateGroup = (req, res) =>{
    const groupId = req.params.groupId
    const userId = req.user.id

    const getGroupSql = "SELECT * FROM groups WHERE group_id = $1 AND owner_id = $2"
    const updateGroupSql = "UPDATE groups SET name = $1, role =$2 WHERE group_id = $3 AND owner_id = $4 RETURNING *"
    pool.query(getGroupSql, [groupId, userId])
    .then(grp =>{
        //console.log(grp)
        if(!grp.rows[0]) return res.status(400).json({status: 400, message: "Group not found"})

        const data = {
            name : req.body.name,
            role : req.body.role
        }

        const { error } = validateGroup(req.body)
        if(error) return res.status(400)
        .json({ tatus: 400, error: error.details[0].message })

        //console.log(data)
        if(grp.rows[0].name === data.name) 
        return res.status(400).json({status:400, error:"Group name already taken"})
        //console.log(grp.rows[0].name)
        pool.query(updateGroupSql, [data.name, data.role, groupId, userId])
        .then(updated =>{
            return res.status(200)
            .json({status: 200, message: "Updated successfully", data: updated.rows[0]})
        })
        .catch(error =>{
            console.log(error)
            res.status(500).json({status:500, error:error})
        })
    })
    .catch(error =>{
        //console.log(error)
        res.status(500).json({status: 500, error: error})
    })
}
