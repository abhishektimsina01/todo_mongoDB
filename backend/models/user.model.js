import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    verificationToken : String,
    verifTokenExpiresIn : Date,
    todos : [{type : mongoose.Schema.Types.ObjectId, ref : "todos" }]
},
{
    timestamps : true,
    versionKey : false
})

const Users = mongoose.model("users", userSchema)
console.log("User schema registered")
export {Users}