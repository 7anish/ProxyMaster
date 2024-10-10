const express = require('express')
const Route =  express.Router()
const {handleRaiseProxy , handleResolved , handleVerifyProxy , handleGetClassProxyList ,handleGetPersonalProxyList} = require('../Controller/Proxycontroller')

Route.post('/raiseproxy' ,handleRaiseProxy)
Route.patch('/resolvproxy' ,handleResolved)
Route.patch('/verifyproxy' ,handleVerifyProxy)
Route.get('/getClassproxylist' , handleGetClassProxyList)
Route.get('/getpersonalproxylist', handleGetPersonalProxyList)

module.exports = Route