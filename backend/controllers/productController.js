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
    const sizesArray = Array.from(req.body.sizes.split(';'))
    const colorsArray = Array.from(req.body.colors.split(' '))

    await Product.create({
        "category": req.body.category,
        "name": req.body.name,
        "type": req.body.type,
        "sizes": sizesArray,
        "colors": colorsArray,
        "material": req.body.material,
        "description": req.body.material,
        "countInStock": Number(req.body.countInStock),
        "price": Number(req.body.price),
        "image": ' '
    })
   
    res.status(201).json({
        "message": "Created sucessfully"
    })
}

const deleteProduct = async (req, res) => {
    
}

const updateProduct = async (req, res) => {

}

module.exports = {
    getAllProduct,
    getProduct,
    addProduct,
    deleteProduct
}