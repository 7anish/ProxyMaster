const express = require('express')
const ConnectDataBase =  require('./Config/Databaseconnection.js')
require('dotenv').config()
const userRouter = require('./Router/UserRouter.js')
const url =  process.env.DB_URL
const PORT = process.env.PORT
const ProxyRouter = require('./Router/ProxyRouter.js')
// const firebse =  require('firebase-admin')
// const  serviceAccount = require('./Firebase/firebase.json')


// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });

const app = express()
ConnectDataBase(url)

app.use(express.json())
app.use('/api/v1/user' ,  userRouter)
app.use('/api/v1/proxy' ,ProxyRouter)



app.listen(PORT, ()=>{
    console.log(`Server listning ${PORT}`)
})