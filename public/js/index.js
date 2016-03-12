var app = angular.module("polls", [])

app.controller("indexPollsController", [ "$http", function($http) {
    var poll = this
    poll.currentPolls = [{
        title: String,
        date: Date,
        author: String,
        votes: Number
    }]
    
    poll.test = "hello world!!"
    
    $http.get("/indexpolls")
        .success(function(data) {
            data.forEach(function(e) {
                var Element = {
                    title: e.title,
                    date: e.date,
                    author: e.author,
                    votes: e.votes
                }
                poll.test = "hey!!"
                poll.currentPolls.push(Element)
            })
        })
}])