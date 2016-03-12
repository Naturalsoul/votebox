var mongoose = require("mongoose")

var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var userSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    passHash: String,
    date: { type: Date, default: Date.now }
})

userSchema.virtual("userId").get(function() {
    return this._id
})

module.exports = mongoose.model("User", userSchema)