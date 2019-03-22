import bcrypt from 'bcryptjs'
import pool from '../config/connection'
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import validateUser from '../helpers/validation'

exports.createAccount = (req, res) => {

  // New user schema
  const newUser = {
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email : req.body.email,
    password : bcrypt.hashSync(req.body.password, 10)
  }

  const { error } = validateUser(req.body)

  if (error) 
  return res.status(400).json({ status : 400, error: error.details[0].message })

  //    Checking if the entered email does not exist
  const myQuery = "SELECT * FROM users WHERE email = $1"
  pool.query(myQuery,[newUser.email])
      .then(email=>{
        if(email.rows.length!==0) 
        return res.status(400).json({status: 400, error: "Email is already registered."})

        // save to database
        const save = "INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *"
        pool.query(save, [newUser.firstname, newUser.lastname, newUser.email, newUser.password])
            .then(user =>{

              // generate token to saved user id
              const generate = {
                id: user.rows[0].id
              };

              // eslint-disable-next-line no-undef
              jwt.sign(generate, process.env.secretKey, {expiresIn: "24h"}, (error, token) =>{
                if(error)
                return res.status(500).json({status:500, error});
                // eslint-disable-next-line no-undef
                return res.status(201)
                  .json({status: 201, token:`Bearer ${ token }`, data: _.pick(user.rows[0], ['id', 'firstname', 'lastname', 'email'])});
              })
            })
            .catch(err=>{
              //   console.log(err);
              return res.status(500).json({error:err});
            })
       })
       .catch((error)=>{
          //  console.log(error);
          return res.status(500).json({error});
       })  
  }
