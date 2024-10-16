const proxyRequests = require('../Modal/Proxymodal')
const user = require('../Modal/Usermodal')
const { sendNotification } = require('../Config/Notification')  // For sending notification to each user of same section 

// Raised Proxy
const handleRaiseProxy = async (req,res)=>{
    try{
        if(!req.user.id) return res.status(400).json({"Error" : "Not Authorised"});
        await proxyRequests.create({
            issuedBy : req.user.id,
            semester : req.user.semester,
            section : req.user.section,
            lect : req.body.lect
        })
        return res.status(201).json({"Message" : "Proxy Request Created"})
    }catch(e){
        console.log(e)
        return res.status(400).json({"Error" : "Somthing Went Wrong Try after some time"});
    }
}

// Resolved Proxy
const handleResolved = async (req,res)=>{
    try{
        if(!req.body.proxyid) return res.status(400).json({"Error" : "Proxy ID is required"});

        const result = await proxyRequests.findOneAndUpdate( { _id : req.body.proxyid , issuedBy : {$ne : req.user.id} }, {resolvedBy : req.user.id , status : "RESOLVED"})
        console.log(result)
        if(!result) return res.status(403).json({"Error" : "Proxy not found / user Cnanot resolve own proxy"});   

        return res.status(200).json({"Message" : "Proxy resolved Waiting For verifaction"});

    }catch(e){
        console.log(e)
        return res.status(400).json({"Error" : "Somthing Went Wrong Try after some time"});   
    }
}

// Verify proxy
const handleVerifyProxy = async (req,res)=>{
    try{
        console.log(req.body)
        if(!req.body.proxyid || !req.body.istrue) return res.status(400).json({"Error" : "Proxy ID is required"});

        const result = await proxyRequests.findOneAndUpdate( { _id : req.body.proxyid , issuedBy : req.user.id }, {isTruelyRes: req.body.istrue ? 'Real'  : 'Fault'})
        console.log(result)
        if(!result) return res.status(403).json({"Error" : "Unauthorised"});   

        return res.status(200).json({"Message" : "Congularation"});
    }catch(e){
        return res.status(400).json({"Error" : "Somthing Went Wrong Try after some time"});   
    }
}

// Get all proxy 
const handleGetClassProxyList = async (req,res)=>{
    try{
        if(!req.user.id || !req.user.semester || !req.user.section || !req.user.lect) return res.status(400).json({"Error" : "Not Authorised"});

        const results = await proxyRequests.find({ semester : req.user.semester , section : req.user.section , lect :req.user.lect });

        if(results.length == 0) return res.status(200).json({ "Message" : "No Proxy Raised"});
        res.status(200).json(results)

    }catch(e){
        console.log(e)
        return res.status(400).json({"Error" : "Somthing Went Wrong Try after some time"});   
    }
}

// Get Your Personal proxy 
const handleGetPersonalProxyList =async (req,res)=>{
    console.log("hello")
    try{
        if(!req.user.id) return res.status(400).json({"Error" : "Not Authorised"});
        const result = await proxyRequests.find({issuedBy : req.user.id})
        if(result.length == 0) return res.status(200).json({"Message" : "No Proxy Request Raised"});
        res.status(200).json(result)


    }catch(e){
        return res.status(400).json({"Error" : "Somthing Went Wrong Try after some time"});   
    }
}

module.exports = {
    handleRaiseProxy,
    handleResolved,
    handleVerifyProxy,
    handleGetClassProxyList,
    handleGetPersonalProxyList
}
