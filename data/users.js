var users = require("../model/user.model.js")
var bcrypt = require("bcrypt")

exports.signup = function(req, res) {
    users.findOne({ username: req.body.signupName }, function(err, data) {
        if(err) throw err
        if(data != null) {
            res.status(403).send({created: false})
        }
        else {
            req.session.userName = req.body.signupName
            
            bcrypt.genSalt(10, function(err, salt) {
                if(err) throw err
                bcrypt.hash(req.body.signupPass, salt, function(err, hash) {
                    if(err) throw err
                    
                    new users({
                        username: req.body.signupName,
                        email: req.body.email,
                        passHash: hash,
                        date: Date.now
                    }).save()
                })
            })
            
            res.status(200).send({created: true})
        }
    })
}

exports.login = function(req, res) {
    bcrypt.genSalt(10, function(err, salt) {
        if(err) throw err
        bcrypt.hash(req.body.loginPass, salt, function(err, hash) {
            if(err) throw err
            users.findOne({ username: req.body.loginName }, function(err, data) {
                if(err) throw err
                if(data != null) {
                    console.log("entre al login")
                    req.session.userName = req.body.loginName
                    res.status(200).send({ connected: true })
                } else {
                    res.status(403).send({ connected: false })
                }
            })
        })
    })
}

exports.logout = function(req, res) {
    req.session.userName = null
    res.status(200).send({ connected: false })
}