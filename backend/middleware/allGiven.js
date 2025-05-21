const checkAllData = (req,res,next) =>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        const err = new Error("Fill up all credentials")
        err.status = 400
        throw err
    }
    else{
        next()
    }
}

const checkAllDataLogin = (req,res,next) =>{
    try{
        const {name, password} = req.body
        if(!name || !password){
            const err = new Error("Fill up all credentials")
            err.status = 400
            throw err
        }
        else{
            next()
        }
    }
    catch(err){
        next(err)
    }
}

export {checkAllData, checkAllDataLogin}