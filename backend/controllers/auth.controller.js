import { checkEmail, checkUser, createUser, deleteUsers} from "../repository/AuthUser.js"
import { bcryptPassword, comparePassword } from "../utils/bcrypt.js"
import { tokenGene } from "../utils/jwt.js"
import { removeCookie, setCookie } from "../utils/cookie.js"
import { verificationMail } from "../mail/verificationMail.js"
import { Users } from "../models/user.model.js"
import {token as tk} from "../utils/token.js"
import { LogInWelcomeMail } from "../mail/LogIn.WelcomeMail.js"
const authSignUp = async(req,res, next) => {
    try{
        const {name, email, password} = req.body
        const isUser = await checkUser(name)
        console.log(isUser)
        if(!isUser){
            console.log("user doesnot exist")
            const Emailexist = await checkEmail(email)
            if(!Emailexist){
                const hashpw = await bcryptPassword(password)
                const user = await createUser(name, email, hashpw)
                const token = tokenGene(user._id)
                setCookie("jwt", token, res)
                verificationMail(email)
                const tomorrow = Date.now() + 30*60*1000
                await Users.findByIdAndUpdate(user._id, {verificationToken : tk, verifTokenExpiresIn : tomorrow}
            )
            }
            else{
                const err = new Error("Gmail is already in use")
                err.status = 200
                throw err
            }
        }
        else{
            const err = new Error("user already exist")
            err.status = 404
            throw err
        }
        res.json({
            message : "User created. Please check your gmail for the verificaton code"
        })
    }
    catch(err){
        next(err)
    }
}

const authLogIn = async(req, res, next) => {
    try{
        const {name, password} = req.body
        const isUser = await checkUser(name)
        if(!isUser){
            const err = new Error("User does not exist")
            throw err
        }
        const user = await Users.findOne({name})
        const isSame = await comparePassword(password, user.password)
        if(!isSame){
            const err = new Error("Fill cup correct credentials")
            throw err
        }
        const token = tokenGene(user._id)
        setCookie("jwt", token, res)
        LogInWelcomeMail(user.name, user.email)
        res.json({
            message : "logged in"   
        })
    }
    catch(err){
        next(err)
    }
}

const authVerify = async(req,res, next) => {
    try{
        const {verifytoken} = req.body
        if(!verifytoken){
            const err = new Error("Token is not provided")
            throw err
        }
        const {data} = req.user
        const user = await Users.findById(data)
        if(user.isVerified == true){
            res.json({message : "You are already verified"
            })
        }
        if(user.verificationToken != verifytoken){
            const err = new Error("token in incorrect")
            throw err
        }
        console.log(user.verifTokenExpiresIn.getTime(), "and", Date.now())
        if(user.verifTokenExpiresIn.getTime() < Date.now()){    
            const err = new Error("The verification token has been expired")
            throw err
        }
        await Users.findByIdAndUpdate(data, {isVerified : true, $unset : {verifTokenExpiresIn : "", verificationToken : ""}})
        res.json({message : "Verified"})
    }
    catch(err){
        next(err)   
    }
}

const authLogOut = (req,res) => {
    removeCookie('jwt', res)
    res.json({
        message : "Logged Out"
    })
}   

const delUser = async(req,res, next) => {
    try{
        removeCookie("jwt", res)
        await deleteUsers()
        res.json({message : "deleted all users"})
    }
    catch(err){
        throw err
    }
}
export {authLogIn, authSignUp, authLogOut, authVerify, delUser}