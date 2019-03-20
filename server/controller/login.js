import bcrypt from 'bcryptjs'
import pool from '../config/connection'
import jwt from 'jsonwebtoken'

exports.signin=(req,res)=>{
    const sql="SELECT * FROM users WHERE email=$1";
        pool.query(sql,[req.body.email])
         .then(user=>{
             // when user does not exist
             if(user.rows.length===0){
                 return res.send({status:400, error:"email not found."})
             }
             // check whether the entered password match the on in database
             const compare = bcrypt.compareSync(req.body.password, user.rows[0].password);
             if(compare){
                const generate={
                    id:user.rows[0].id
                };
                // generate token
                const token = jwt.sign(generate, process.env.secretKey, { expiresIn: "1day" })
                res.send({status:200, id:user.rows[0].id, token: token });
                }
                else{
                    return res.send({status:400, error: "Incorrect password" });
                }
         })
         .catch(error=>{
            console.log(error);
            return res.status(500).json({error});
         })
   }