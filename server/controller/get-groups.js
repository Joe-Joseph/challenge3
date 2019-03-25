import pool from '../config/connection'

exports.getGroups = (req, res) =>{
    const getGroupsSql = "SELECT * FROM groups WHERE owner_id = $1"
    pool.query(getGroupsSql, [req.user.id])
    .then(allGroups =>{
        if (allGroups.lenght === 0) return res.status(400).json({status: 400, message: "No group found"})

        return res.status(200).json({ status: 200, data: allGroups.rows })
    })
    .catch(error =>{
        return res.status(500).json({ status: 500, error: error })
    })
}