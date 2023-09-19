const Product = require('../models/Product')
const cloudinary = require('../cloudinary/cloudinary')

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

    const uploadedResult = []
    try {
        for(const img of req.body.uploadImg) {
            const ress = await cloudinary.uploader.upload(img,
            { 
                upload_preset: 'product_upload',
                allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
                overwrite: true,
                invalidate: true
            });
            uploadedResult.push({
                url: ress.url,
                pb_id: ress.public_id
            })
        }
    } catch (error) {
        console.log(error)
    }

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
        "image": uploadedResult
    })
   
    res.status(201).json({
        "message": "Created sucessfully"
    })
}

const deleteProduct = async (req, res) => {
    const foundProduct = await Product.findById({_id: req.params.id})

    try {
        for(const img of foundProduct.image) {
            const ress = await cloudinary.uploader.destroy(img.pb_id, (error, result) => {
                if (error) {
                  console.error(error);
                  res.status(500).json({
                    "message": "Failed to delete image"
                  })
                }
            });
        }
    } catch (error) {
        console.log(error)
    }

    await Product.deleteOne({_id: req.params.id})

    res.status(200).json({
        "message": "Delete successfully"
    })
}

const updateProduct = async (req, res) => {
    let result, newArr
    const uploadedResult = []
    const oldProduct = await Product.findById({_id: req.body.id}).exec()

    if(req.body?.category !== oldProduct.category) {
        result = await Product.updateOne({ _id: req.body.id }, {category: req.body.category}).exec()
    }
    if (req.body?.name !== oldProduct.name) {
        result = await Product.updateOne({ _id: req.body.id }, {name: req.body.name}).exec()
    } 
    if (req.body?.type !== oldProduct.type) {
        result = await Product.updateOne({ _id: req.body.id }, {type: req.body.type}).exec()
    } 
    if (typeof req.body?.sizes !== 'object') {
        console.log(req.body?.sizes)
        const arrayStr = JSON.stringify(oldProduct.sizes);
        if(arrayStr !== req.body?.sizes) {
            const sizesArray = Array.from(req.body.sizes.split(';'))
            result = await Product.updateOne({ _id: req.body.id }, {sizes: sizesArray}).exec()
        }
    } 
    if (typeof req.body?.colors !== 'object') {
        const arrayStr = JSON.stringify(oldProduct.colors);
        if(arrayStr !== req.body?.colors) {
            const colorsArray = Array.from(req.body.colors.split(' '))
            result = await Product.updateOne({ _id: req.body.id }, {colors: colorsArray}).exec()
        }
    } 

    if (req.body?.material !== oldProduct.material) {
        result = await Product.updateOne({ _id: req.body.id }, {material: req.body.material}).exec()
    } 
    if (req.body?.description !== oldProduct.description) {
        result = await Product.updateOne({ _id: req.body.id }, {description: req.body.description}).exec()
    } 
    if (req.body?.image) {
        try {
            for(const img of req.body.image) {
                if(img.delete) {
                    const ress = await cloudinary.uploader.destroy(img.pb_id, (error, result) => {
                        if (error) {
                          console.error(error);
                          res.status(500).json({
                            "message": "Failed to delete image"
                          })
                        }
                    });
                }
            }
            newArr = req.body.image.filter((item) => !item || !item.delete) 
        } catch (error) {
            console.log(error)
        }
    } 

    if (req.body.newImg)  {
        try {
            for(const img of req.body.newImg) {
                const ress = await cloudinary.uploader.upload(img,
                { 
                    upload_preset: 'product_upload',
                    allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
                    overwrite: true,
                    invalidate: true
                });
                uploadedResult.push({
                    url: ress.url,
                    pb_id: ress.public_id
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    if(newArr && newArr.length > 0) {
        if(uploadedResult.length > 0) {
            const newImage = newArr.concat(uploadedResult)
            result = await Product.updateOne({ _id: req.body.id }, {image: newImage}).exec()
        } else {
            result = await Product.updateOne({ _id: req.body.id }, {image: newArr}).exec()
        }
    } else {
        if(uploadedResult.length > 0) {
            result = await Product.updateOne({ _id: req.body.id }, {image: uploadedResult}).exec()
        }
    }

    if (req.body?.countInStock !== oldProduct.countInStock.toString()) {
        result = await Product.updateOne({ _id: req.body.id }, {countInStock: req.body.countInStock}).exec()
    } 
    if (req.body?.price !== oldProduct.price.toString()) {
        result = await Product.updateOne({ _id: req.body.id }, {price: req.body.price}).exec()
    } 

    res.status(200).json({
        "message": "Successfully updated!"
    })
}

const searchProduct = async (req, res) => {
    const result = await Product.find({
        'name': {
            $regex: req.params.search,
            $options: "i" // case-insensitive search
        }
    })

    res.status(200).send(result)
}

module.exports = {
    getAllProduct,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
    searchProduct
}