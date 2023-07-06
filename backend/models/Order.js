const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema({
    customerID: {type: String, required: true},
    products: {type: {
        productID: {type: String, required: true},
        type: {type: String}, 
        sizes: {type: String},
        colors: {type: String},
        numbers: {type: Number, required: true},
        total: {type: Number, required: true},
    }, required: true},
    totalAmount: {type: Number, required: true},
    status: {type: String, required: true},
    paymentMethod: {
        online: Boolean,
        offline: Boolean
    }
}, { timestamps: true })

module.exports = mongoose.model("Order", Order)