const mongooes = require('mongoose')

const ProxySchema =  new mongooes.Schema({
    issuedBy : {
        type : mongooes.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    resolvedBy : {
        type : mongooes.Schema.Types.ObjectId,
        ref : 'user',
        default : "6705747722b98f95777b3228"
    },
    status : {
        type : String,
        enum : ['Pending' , 'Done' , 'NOTDONE'],
        default : 'Pending'
    },
    isTruelyRes : {
        type : String,
        enum : ['Pending' , 'Real' , 'Fault'],
        default : 'Pending'
    }
},{timestamps : true})


const proxyRequests = mongooes.model('proxyrequests' , ProxySchema)

module.exports = proxyRequests