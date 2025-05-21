const setCookie = (token, value, res) => {
    res.cookie(token, value, {
        httpOnly : true,
        secure : false,
        samesite : "static",
        maxAge : 2* 24* 60 *60 *1000,
    })
}

const removeCookie = (token, res) =>{
    res.clearCookie(token)
}

const getCookie = (token, req) =>{
    const value = req.cookies
    return value[`${token}`]   
}

export {setCookie, removeCookie, getCookie}