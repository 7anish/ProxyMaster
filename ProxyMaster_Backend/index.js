const express = require('express')
const ConnectDataBase =  require('./Config/Databaseconnection.js')
require('dotenv').config()
const userRouter = require('./Router/UserRouter.js')
const url =  process.env.DB_URL
const PORT = process.env.PORT
const ProxyRouter = require('./Router/ProxyRouter.js')
const checkauthentication = require('./Middleware/Checkuser.js')


const app = express()
ConnectDataBase(url)

app.use(express.json())
app.use('/api/v1/user' , userRouter)
app.use('/api/v1/proxy' , checkauthentication ,ProxyRouter)



app.listen(PORT, ()=>{
    console.log(`Server listning ${PORT}`)
})