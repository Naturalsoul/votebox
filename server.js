var express = require("express")
var mongoose = require("mongoose")
var expressSession = require("express-session")
var cookieParser = require("cookie-parser")
var bodyParser = require("body-parser")
var pollsData = require("./data/polls.js")
var usersData = require("./data/users.js")

var app = express()
var secrets = ["rVPrO2FTAX", "ySN2X5dtI9", "F0y78fbmNe", "PBpeUWT1vF", "Nv58mYHfIW", "UlnNQEWP2G", "IZfXEM9Alo", "8NMwNfED8W"]

app.set("view engine", "jade")

mongoose.connect("mongodb://localhost/votebox")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressSession({
    secret: secrets,
    resave: true,
    saveUninitialized: false
}))
app.use(express.static("public"))

app.get("/", function(req, res) {
    // Remember the req.session.userName !!
    res.render("index")
})

app.get("/indexpolls", pollsData.getPolls)

app.get("/sessions", function(req, res) { // For sessions.
    if(req.session.userName) {
        res.send({ connected: true })
    } else {
        res.send({ connected: false })
    }
})

app.post("/signup", usersData.signup);
app.post("/login", usersData.login);
app.get("/logout", usersData.logout)

app.listen(8080, function() {
    console.log("Server listening on port 8080.")
})