const user = require('../Modal/Usermodal')
const {generateToken} = require('../Config/Jwttoken')
const handleCreateAccount = async (req,res)=>{
    try{
        if(!req.body || !req.body.name || !req.body.RollNo || !req.body.semester || !req.body.section || !req.body.password) return res.status(400).json({"Error" : "All Body Filed Required" });

        await user.create({
            name : req.body.name,
            RollNo : req.body.RollNo,
            semester : req.body.semester,
            section : req.body.section,
            password : req.body.password
        })
        return res.status(201).json({"Message" : "Account Created SucessFully"});
        
    }catch(e){
        if (e.code == 11000) return res.status(400).json({"Error" : "User Alerady Exist"});
        return res.status(500).json({"Error" : "Error in Creating Account Try After Sometime"});
    }
}

const handleLogin = async (req,res)=>{
    try{
        if(!req.body || !req.body.RollNo || !req.body.password) return res.status(400).json({"Error" : "All Body Fileds Are Required"});

        const result = await user.matchpassword(req.body.RollNo , req.body.password)

        const token =  generateToken({
            id : result._id,
            ROllNo : result.RollNo ,
            password : result.password,
            section: result.section,
            semester : result.semester
        })

        return res.status(200).json({token})

    }catch(e){
        return res.status(400).json({e})
    }
}


module.exports = {
    handleCreateAccount,
    handleLogin
}