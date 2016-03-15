var bcrypt = require("bcrypt")
var users = require("../model/user.model.js")

exports.signup = function(req, res) {
    bcrypt.genSalt(10, function(err, salt) {
        if(err) throw err
        
        bcrypt.hash(req.body.signupPass, salt, function(err, hash) {
            if(err) throw err
            
            InsertUserData(hash)
        })
    })
    
    function InsertUserData(encryptedPass) {
        
        var newUser = new users({
            username: req.body.signupName,
            email: req.body.email,
            passHash: encryptedPass
        })
        
        users.find({ username: newUser.username }, function(err, data) {
            if(err) throw err
            if(data.length > 0) {
                res.status(200).send({ created: false })
            }
            else {
                newUser.save(function(err) {
                    if(err) throw err
                    
                    console.log("Usuario " + newUser.username + " created.")
                })
                
                req.session.userName = req.body.signupName
                res.status(200).send({ created: true })
            }
        })
    }
}

exports.login = function(req, res) {
    users.find({ username: req.body.loginName }, function(err, data) {
        if(err) throw err
        
        if(data.length > 0) {
            bcrypt.compare(req.body.loginPass, data[0].passHash, function(err, flag) {
                if(err) throw err
                
                if(flag) {
                    req.session.userName = req.body.loginName
                    res.status(200).send({ connected: true })
                } else {
                    res.status(200).send({ connected: false })
                }
            })
        } else {
            res.status(200).send({ connected: false })
        }
    })
}

exports.logout = function(req, res) {
    req.session.userName = null
    res.status(200).send({ connected: false })
}