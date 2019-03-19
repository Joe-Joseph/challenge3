import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

exports. authenticate = (req, res, next) =>{
    try{
        const splitHeader = header.split(" ")
        const token = splitHeader[1]

        jwt.verify(token, process.env.secretKey)
        const userId = token.userId
        if(req.body.userId && req.body.userId !== userId){
            throw 'Invalid user ID'
        }else{
            next()
        }  
    }
    catch{
        res.status(401).json({
            error: new Error('Invalid request!')
          });
    }
}