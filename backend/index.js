import express from "express"
import cookieParser from "cookie-parser"

import dotenv from "dotenv"
import { erroHanlding, notFound } from "./middleware/errorhandler.js"
dotenv.config()

const app = express()
const port = process.env.port || 8080

//adding middlewre for cookie-parser
app.use(cookieParser())
//for req.body
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get("/", (req,res)=>{
    res.end("dsd")
})

//error handling
app.use(notFound)
app.use(erroHanlding)

app.listen(port, (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("the server has been connected successfully")
    }
})