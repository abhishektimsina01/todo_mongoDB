import bcrypt from "bcryptjs";

const bcryptPassword = async(pw) =>{
    try{
        const hashedpassword = await bcrypt.hash(pw, 10)
        console.log(hashedpassword)
        return hashedpassword
    }
    catch(err){
        throw err
    }
}

const comparePassword = async(pw, hashedpw) => {
    try{
        const isSame = await bcrypt.compare(pw, hashedpw)
        return isSame
    }
    catch(err){
        throw err
    }
}

export {bcryptPassword, comparePassword}