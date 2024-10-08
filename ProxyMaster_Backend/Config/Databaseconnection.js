const mongoose = require('mongoose')

const ConnectDataBase = (URL)=>{
    mongoose.connect(URL)
    .then(()=>{
        console.log('DataBase Connected')
    })
    .catch(()=>{
        console.log('Error in Connecting Database')
    })
}

module.exports = ConnectDataBase