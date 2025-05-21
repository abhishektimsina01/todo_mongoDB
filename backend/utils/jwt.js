import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const tokenGene = (data) =>{
        const token = jwt.sign({data}, process.env.SecretKey, {expiresIn : "2d"})
        return token
}

const tokenCheck = (token) => {
        try{
                const data = jwt.verify(token , process.env.SecretKey)
                return data
        }
        catch(err){
                throw err
        }
}

export {tokenGene, tokenCheck}