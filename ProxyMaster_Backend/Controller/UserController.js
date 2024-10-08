const user = require('../Modal/Usermodal')

const handleCreateAccount =async (req,res)=>{
    try{
        if(!req.body || !req.body.name || !req.body.RollNo || !req.body.semester || !req.body.section || !req.body.password) return res.status(400).json({"Error" : "All Body Filed Required" });

        const result =await user.create({
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


module.exports = {
    handleCreateAccount   
}