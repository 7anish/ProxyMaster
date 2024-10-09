const proxyRequests = require('../Modal/Proxymodal')

const handleRaiseProxy = async (req,res)=>{
    try{
        if(!req.user.id) return res.status(400).json({"Error" : "Not Authorised"});
        await proxyRequests.create({
            issuedBy : req.user.id,
        })
        return res.status(201).json({"Message" : "Proxy Request Created"})
    }catch(e){
        console.log(e)
        return res.status(400).json({"Error" : "Somthing Went Wrong Try after some time"});
    }
}

const handleResolved = async (req,res)=>{
    try{
        if(!req.body.proxyid) return res.status(400).json({"Error" : "Proxy ID is required"});

        const result = await proxyRequests.findOneAndUpdate( { _id : req.body.proxyid , issuedBy : {$ne : req.user.id} }, {resolvedBy : req.user.id , status : "Done"})
        console.log(result)
        if(!result) return res.status(403).json({"Error" : "Proxy not found / user Cnanot resolve own proxy"});   

        return res.status(200).json({"Message" : "Proxy resolved Waiting For verifaction"});

    }catch(e){
        console.log(e)
        return res.status(400).json({"Error" : "Somthing Went Wrong Try after some time"});   
    }
}

const handleverifyproxy = async (req,res)=>{
    try{
        console.log(req.body)
        if(!req.body.proxyid || !req.body.istrue) return res.status(400).json({"Error" : "Proxy ID is required"});

        const result = await proxyRequests.findOneAndUpdate( { _id : req.body.proxyid , issuedBy : req.user.id }, {isTruelyRes: req.body.istrue})
        console.log(result)
        if(!result) return res.status(403).json({"Error" : "Unauthorised"});   

        return res.status(200).json({"Message" : "Congularation"});
    }catch(e){
        return res.status(400).json({"Error" : "Somthing Went Wrong Try after some time"});   
    }
}

module.exports = {
    handleRaiseProxy,
    handleResolved,
    handleverifyproxy
}
