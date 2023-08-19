const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    "username": { type: String, required: true},
    "email": { type: String, required: true},
    "password": { type: String, required: true},
    "isAdmin": { type: Boolean, required: true, default: false},
    "refreshToken": {type: String},
    "shippingAddress": {
        fullName: { type: String, required: true, default: 'fullname' },
        tel: { type: String, required: true, default: 'tel' },
        city: { type: String, required: true, default: 'city' },
        address: { type: String, required: true, default: 'address' }
    },
})

module.exports = mongoose.model('User', userSchema)