const notFound = (req,res,next) => {
    const err = new Error(`${req.url} not found for the method ${req.method}`)
    err.status = 404
    next(err)
}

const erroHanlding = (err,req,res,next) => {
    const message = err.message
    res.status(err.status || 400).json({
        error : message,
        stack : process.env.state == "development" ? err.stack : null 
    })
}

export {notFound, erroHanlding}