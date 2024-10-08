const express  = require('express')
const {handleCreateAccount } = require('../Controller/UserController')

const route = express.Router()

route.post('/singup', handleCreateAccount);

module.exports = route