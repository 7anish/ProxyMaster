const jwt =  require('jsonwebtoken')
require('dotenv').config()
const key = process.env.JWT_KEY

const generateToken = (obj)=>{
    return jwt.sign(obj,key, {expiresIn : '24hr'})
}

const verifytoken = (token)=>{
    return jwt.verify(token , key)
}

module.exports = {
    generateToken,
    verifytoken
}