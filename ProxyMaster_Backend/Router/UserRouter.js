const express  = require('express')
const {handleCreateAccount , handleLogin } = require('../Controller/UserController')

const route = express.Router()

route.post('/singup', handleCreateAccount);
route.post('/login', handleLogin);

module.exports = route