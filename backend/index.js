import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.js"
import userRouter from "./routes/user.js"
import dotenv from "dotenv"
import { erroHanlding, notFound } from "./middleware/errorhandler.js"
import { connectDB } from "./db/config.db.js"
dotenv.config()

const app = express()
const port = process.env.port || 8080
connectDB(process.env.DB)
//adding middlewre for cookie-parser
app.use(cookieParser())
//for req.body
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//Router
//for authentication
app.use("/auth", authRouter)

//for users
app.use("/user", userRouter)

//error handling
app.use(notFound)
app.use(erroHanlding)

app.listen(port, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("the server has been connected successfully on port", port)
    }
})