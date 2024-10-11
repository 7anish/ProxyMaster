// const message = {
//     notification : {
//       title : "Proxy reuest",
//       body : "ANISH is requesting for proxy",
//     },

//     token : ""
//   }

require('dotenv').config()
const Path = process.env.Service_path
const admin = require("firebase-admin");
const serviceAccount = require(Path);
const { getMessaging } = require('firebase-admin/messaging')
const {sendMulticast} = require('')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const sendNotification = (registrationTokens , message)=>{
    getMessaging().send({
        message : message,
        token :  registrationTokens
    })
  .then((response) => {
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
}

module.exports= {
    sendNotification
}