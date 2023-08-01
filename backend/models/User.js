const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    "username": { type: String, required: true},
    "pwd": { type: String, required: true},
    "isAdmin": { type: Boolean, required: true, default: false},
    "refreshToken": {type: String}
})

module.exports = mongoose.model('User', userSchema)