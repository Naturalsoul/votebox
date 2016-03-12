var users = require("../model/user.model.js")
var bcrypt = require("bcrypt")

exports.signup = function(req, res) {
    users.findOne({ username: req.body.userName }, function(err, data) {
        if(err) throw err
        if(data != null) {
            res.status(403).send({created: false})
        }
        else {
            req.session.userName = req.body.userName
            
            bcrypt.genSalt(10, function(err, salt) {
                if(err) throw err
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    if(err) throw err
                    
                    new users({
                        username: req.body.userName,
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