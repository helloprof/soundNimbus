var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const env = require('dotenv')
env.config()

var userSchema = new Schema({
    "username": {
        type: String,
        unique: true
    }, 
    "password": String,
    "email": String,
    "loginHistory": [{
        "dateTime": Date,
        "userAgent": String
    }]
})

let User;

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection(process.env.MONGO_URI_STRING);

        db.on('error', (err)=>{
            reject(err); // reject the promise with the provided error
        });
        db.once('open', ()=>{
           User = db.model("users", userSchema);
           resolve();
        });
    });
};


module.exports.registerUser = function(userData) {
    return new Promise(function (resolve, reject) {

        if (userData.password === userData.password2) {
            let newUser = new User(userData)

            newUser.save((err) => {
                if(err) {
                  // there was an error
                  console.log(err);
                } else {
                  // everything good
                  console.log(newUser);
                  resolve(userData)
    
                }
              });
        }
 

        // if (user) {
        //     console.log("USER DATA: ")
        //     console.log(user)
        //     resolve(user)
        // } else {
        //     reject()
        // }
        
    });
};











