const {verifytoken} = require('../Config/Jwttoken');

const checkauthentication = (req, res, next) => {
    try {
        const token = req.get('Authorization').split("Bearer ")[1]
        const user = verifytoken(token)
        req.user = user;
        next();
    }catch(e){
        res.status(401).json({message : 'User Is Not Authorised'})
    }
}

module.exports = checkauthentication