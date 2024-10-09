const mongoose = require('mongoose')
const {randomBytes , createHmac} = require('crypto')


const UserSchema =  new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    RollNo :{
        type : String,
        required : true,
        unique : true
    },
    semester : {
        type : Number,
        required : true
    },
    section : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    salt : {
        type : String    
    },
    Points : {
        type : Number,
        default : 0
    }
}, {timestamps : true})

UserSchema.pre('save' , function (next){
    const user = this
    const salt = randomBytes(8).toString('hex')

    const generatedPassword =  createHmac('sha256' , salt)
                                .update(this.password)
                                .digest('hex')

    user.password = generatedPassword
    user.salt = salt

    next()
})


UserSchema.static('matchpassword' , async function (Rollno , Password){
    const user = await this.findOne({RollNo : Rollno})

    if(!user) throw "User Not Found"

    const generatedPassword = createHmac('sha256', user.salt)
                              .update(Password)
                              .digest('hex'); 
    if(generatedPassword != user.password) throw "Passowrd Not Matched"
    return user;
})

const user = mongoose.model('user' , UserSchema)

module.exports = user
