const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = new Schema({
    role: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    DoB: {type: String},
    address: {type: String},
})


module.exports = mongoose.model('Account', Account)