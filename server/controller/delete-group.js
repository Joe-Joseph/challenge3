import pool from '../config/connection'

exports.deleteGroup = (req, res) =>{
    const groupId = req.params.groupId
    const userId = req.user.id
    const deleteGroupSql = "DELETE FROM groups WHERE group_id = $1 AND owner_id = $2 RETURNING *"
    pool.query(deleteGroupSql, [groupId, userId])
    .then(deleted =>{
        if(deleted.rows[0]) 
        return res.status(200).json({status: 200, message: "Deleted successfully", data: deleted.rows[0]})

        return res.status(404).json({ status: 404, error: "Group not found"})
    })
    .catch(error =>{
        return res.status(500).json({status: 500, error: error})
    })
}