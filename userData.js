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
            
            // bcrypt.hash(userData.password, 10).then((hash) => {
            // userData.password = hash   
            // do all user stuff 
            // })
            let newUser = new User(userData)

            newUser.save((err) => {
                if(err) {
                  // there was an error
                  console.log(err);
                  reject("Error creating new user:" + err)
                } else {
                  // everything good
                  console.log(newUser);
                  resolve(userData)
                }
              });
        } else {
            reject("PASSWORDS DO NOT MATCH!!")
        }    
    });
};

module.exports.verifyLogin = function(userData) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: userData.username})
        .exec()
        .then((mongoData) => {

            // bcrypt.compare(userData.password, mongoData.password).then((result) => {
            //    if (result == true) {
            //      // login successful stuff
            //  }
            // })
            
            if (userData.password === mongoData.password) {
                console.log("SUCCESSFUL LOGIN!")

                mongoData.loginHistory.push({dateTime: new Date(), userAgent: userData.userAgent})

                User.updateOne( 
                    { username: userData.username }, 
                    { $set: {loginHistory: mongoData.loginHistory}}
                ).exec()
                .then(() => { 
                    resolve(mongoData)
                })

            } else {
                reject("LOGIN UNSUCCESSFUL - PASSWORD INCORRECT")
            }   
        })
        .catch((error) => {
            console.log(error)
            reject("LOGIN UNSUCCESSFUL - ERROR:" + error)
        })
    })
}










