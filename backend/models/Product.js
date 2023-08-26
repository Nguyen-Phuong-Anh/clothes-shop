const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Products = new Schema({
    category: {type: String, required: true}, //shoes or clothes
    name: {type: String, required: true}, 
    type: {type: String, required: true}, // shirts, sneakers...
    sizes: {type: [String], required: true}, //XL or 37...
    colors: {type: [String], required: true},
    material: {type: String, required: true},
    description: {type: String},
    countInStock: {type: Number, required: true}, //number of remain products
    price: {type: Number, required: true},
    image: { type: String, required: true, default: ' ' },
})

module.exports = mongoose.model("Products", Products)