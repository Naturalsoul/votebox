var polls = require("../model/poll.model.js")

exports.getPolls = function(req, res) {
    polls.find(function(data) {
        res.send(data)
    })
}