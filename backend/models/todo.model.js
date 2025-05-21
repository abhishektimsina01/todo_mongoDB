import mongoose from "mongoose"
const todoSchema = new mongoose.Schema({
    title : {
        type : String,
    },

    description : {
        type : String, 
        required : true
    },

    status : {
        type : Boolean,
        default : false,
    },

    createdTime : {
        type : Date
    },

    dueTime : {
        type : Date, 
    },

    user : { type : mongoose.Schema.Types.ObjectId, ref : "users"}
    
}, {timestamps : true, versionKey : false})

const todos = mongoose.model("todos", todoSchema)
console.log("TODO schema registered")
export {todos}