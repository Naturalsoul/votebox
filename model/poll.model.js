var mongoose = require("mongoose")

var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var pollSchema = new Schema({
    title: { type: String, unique: true },
    options: [{
        optionNumber: Number,
        title: String,
        votes: Number
    }],
    author: String,
    date: { type: Date, default: Date.now },
    totalVotes: Number
})

pollSchema.virtual("pollId").get(function() {
    return this._id
})

module.exports = mongoose.model("Poll", pollSchema)