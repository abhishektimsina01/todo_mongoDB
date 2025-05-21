import { getCookie } from "../utils/cookie.js"
import { tokenCheck } from "../utils/jwt.js"

const verifyToken = (req,res,next) =>{
    try{
        const token = getCookie("jwt", req)
        const data = tokenCheck(token)
        req.user = data
        next()
    }
    catch(err){
        next(err)
    }
}
export {verifyToken}