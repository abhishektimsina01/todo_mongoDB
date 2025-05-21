import mongoose from "mongoose";

const connectDB = async(url) => {
    try{
        await mongoose.connect(url)
        console.log("DB connected")
    }
    catch(err){
        console.log("an error has occurred")
    }
}

export {connectDB}