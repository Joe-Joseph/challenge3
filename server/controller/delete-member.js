import Pool from '../config/connection'

exports.deleteMember = (req, res) =>{
    const deleteMemberSql = "DELETE FROM group_members WHERE group_id = $1 AND member_id = $2 RETURNING *"
    Pool.query(deleteMemberSql, [req.params.groupId, req.params.userId])
    .then(deleted =>{
        if(deleted.rows[0])
        return res.status(200).json({ 
            status: 200, 
            Message: "Deleted successfully", 
            data: deleted.rows[0]
        })

        return res.status(404).json({ status:404, error: "User not found" })
    })
    .catch(error =>{
        res.status(500).json({ status:500, error: error})
    })
}