var app = angular.module("polls", [])

app.controller("indexPollsController", [ "$http", function($http) {
    var poll = this
    poll.currentPolls = []
    
    $http.get("/indexpolls")
        .success(function(data) {
            if(data != null || data.length > 0) {
                
            }
        })
}])