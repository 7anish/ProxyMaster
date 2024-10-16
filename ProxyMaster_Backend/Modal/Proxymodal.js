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
        enum : ['Pending' , 'RESOLVED' , 'UNRESOLVED'],
        default : 'Pending'
    },
    isTruelyRes : {
        type : String,
        enum : ['Pending' , 'Real' , 'Fault'],
        default : 'Pending'
    },
    semester : {
        type : Number,
        required : true
    },
    section : {
        type : String,
        required : true   
    },
    lect : {
        type : Number,
        enum : [1,2,3,4,5,6],
        required : true
    }
},{timestamps : true})


const proxyRequests = mongooes.model('proxyrequests' , ProxySchema)

module.exports = proxyRequests