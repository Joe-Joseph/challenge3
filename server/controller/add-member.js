import pool from '../config/connection'

exports.addMember = (req, res) =>{
    const groupId = req.params.groupId
    const userId = req.user.id
    
    const selectedGroupSql = "SELECT * FROM groups WHERE group_id = $1 AND owner_id = $2 "
    pool.query(selectedGroupSql, [groupId, userId])
    .then(foundGroup =>{
        if(!foundGroup.rows[0])
        return res.status(404).json({ status: 404, error: "Group not found"})

        //Check whether the user is registered
        const checkUserSql = "SELECT * FROM users WHERE id = $1"
        pool.query(checkUserSql, [req.body.memberId])
        .then(foundUser =>{
            if(!foundUser.rows[0])
            return res.status(404).json({ status:404, error: "That user is not registered" })

            //Check whether a user is already a member
            const checkMemberSql = "SELECT * FROM group_members WHERE member_id = $1"
            pool.query(checkMemberSql, [req.body.memberId])
            .then(foundMember => {
                if(foundMember.rows[0])
                return res.status(400).json({ status: 400, error: "Already member"})

                const member = {
                    memberId : req.body.memberId,
                    memberRole : req.body.memberRole
                }
                // If not a member add user to members
                const addMemberSql = "INSERT INTO group_members (group_id, member_id, member_role) VALUES ($1, $2, $3) RETURNING *"
                pool.query(addMemberSql, [groupId, member.memberId, member.memberRole])
                .then(addedMember =>{
                    res.status(200).json({ 
                        status: 200, 
                        message: "Added member successfully", 
                        data: addedMember.rows[0]
                    })
                })
                .catch(error =>{
                    //console.log(error)
                    res.status(500).json({ status: 500, error: error})
                })
            })
            .catch(error =>{
                //console.log(error)
                res.status(500).json({ status: 500, error: error})
            })

            
        })
        .catch(error =>{
            //console.log(error)
            res.status(500).json({ status: 500, error: error})
        })

    })
    .catch(error =>{
        console.log(error)
        res.status(500).json({ status: 500, error: error})
    })
}