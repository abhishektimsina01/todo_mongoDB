import express from "express"
import { authLogIn, authLogOut, authSignUp, authVerify, delUser} from "../controllers/auth.controller.js"
import { checkAllData, checkAllDataLogin } from "../middleware/allGiven.js"
import { verifyToken } from "../middleware/verifyToken.js"

const authRouter = express.Router()

authRouter.post("/signup", checkAllData ,authSignUp)
authRouter.post("/login",checkAllDataLogin, authLogIn)
authRouter.post("/verify", verifyToken,authVerify)
authRouter.get("/logout",verifyToken, authLogOut)
authRouter.get("/delUser", delUser)
export default authRouter