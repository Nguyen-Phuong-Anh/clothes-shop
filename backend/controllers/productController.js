const Product = require('../models/Product')

const getAllProduct = async (req, res) => {
    const allProducts = await Product.find({}).exec();
    if(!allProducts) return res.status(204).json({
        'message': 'No products found'
    })
    res.json(allProducts)
}

const getProduct = async (req, res) => {
    const foundProduct = await Product.findById({_id: req.params.id}).lean().exec()
    if(!foundProduct) {
        res.status(404).json({
            "message": "Product not found"
        })
    } 
    let product = Object.assign({}, foundProduct)
    product.id = foundProduct._id
    res.json(product)
}

const addProduct = async (req, res) => {
    
}

const deleteProduct = async (req, res) => {
    
}

const updateProduct = async (req, res) => {

}

module.exports = {
    getAllProduct,
    getProduct,
    deleteProduct
}