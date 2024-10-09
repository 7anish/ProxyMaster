const express = require('express')
const checkauthentication = require('../Middleware/Checkuser')
const Route =  express.Router()
const {handleRaiseProxy , handleResolved , handleverifyproxy} = require('../Controller/Proxycontroller')

Route.post('/raiseproxy' , checkauthentication ,handleRaiseProxy)
Route.patch('/resolvproxy' , checkauthentication ,handleResolved)
Route.patch('/verifyproxy' , checkauthentication ,handleverifyproxy)

module.exports = Route