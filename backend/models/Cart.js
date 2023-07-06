const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cart = new Schema({
    customerID: {type: String, required: true},
    products: {type: {
        productID: {type: String, required: true},
        type: {type: String}, 
        sizes: {type: String},
        colors: {type: String},
        numbers: {type: Number, required: true},
        total: {type: Number, required: true},
    }, required: true},
})

module.exports = mongoose.model("Cart", Cart)