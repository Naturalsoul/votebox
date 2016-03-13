var polls = require("../model/poll.model.js")

exports.getPolls = function(req, res) {
    polls.find(function(data) {
        if(data != null) {
            res.send(data)
        } else {
            res.send(null)
        }
    })
}