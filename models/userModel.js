const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fname: {type: String, required: true, min: 2, max: 255},
    lname: {type: String, required: true, min: 2, max: 255},
    email: {type: String, required: true, max: 255, min: 6},
    password: {type: String, required: true, max: 1024, min: 8},
    date: {type: Date, default: Date.now()},
})

module.exports = mongoose.model("User", userSchema)