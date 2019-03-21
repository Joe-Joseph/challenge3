import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// dotenv configuration
dotenv.config();

const authentication = (req, res, next) =>{
  const header = req.headers.authorization;
  if(!header || header===""){
      return res.send({status:401, error:"Authentication failed"});
  }else{
    //const splitingToken = header;
    const token = header;
    // verify token
    jwt.verify(token, process.env.secretKey, (error,decode) =>{
        if(error){
            return res.status(401).json({error});
        } else {
        // 
          req.user=decode;
          //console.log(decode);
          next();
        }
    })
  }
}
export default authentication;