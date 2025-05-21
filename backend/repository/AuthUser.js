import { Users } from "../models/user.model.js"

const checkUser = async(name) => {
    try{
        const user = await Users.findOne({name})
        if(user) return true
        else return false
    }
    catch(err){
        throw err
    }
}

const checkEmail = async(email) =>{
    try{
        const Emailexist = await Users.findOne({email})
        if(Emailexist) return true
        else return false
    }
    catch(err){
        throw err
    }
}

const createUser = async(name, email, password) =>{
    try{
        const user = await Users.create({name, email, password})
        console.log(user)
        return user
    }
    catch(err){ 
        throw err
    }
}

const deleteUsers = async() => {
    await Users.deleteMany({createdAt : {$lt : Date.now()}})
}
export {checkUser, checkEmail, createUser, deleteUsers}