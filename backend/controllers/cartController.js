const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product')

const getProduct = async (req, res) => {
    const foundUser = await User.findOne({ email: req.body.email }).lean().exec();
    if(!foundUser) {
        res.status(404).json({
            "message": "no user found"
        })
    }
    const foundCart = await Cart.findOne({ userId: foundUser._id }).lean().exec()
    if(foundCart) {
        res.send(foundCart.cart);
    }
}

const addProduct = async (req, res) => {
    const foundUser = await User.findOne({email: req.body.email}).exec()
    if(foundUser) {
        const foundCart = await Cart.findOne({ userId: foundUser._id }).exec();
        const itemIndex = foundCart.cart.findIndex(item => item.product.toString() === req.body.addedProduct.product)

        if(itemIndex !== -1 && foundCart.cart[itemIndex].size === req.body.addedProduct.size && foundCart.cart[itemIndex].color === req.body.addedProduct.color) {
            foundCart.cart[itemIndex].quantity += req.body.addedProduct.quantity
            await foundCart.save();

            //update product quantity   
            const foundProduct = await Product.findById(req.body.addedProduct.productId);
            if (foundProduct) {
                foundProduct.countInStock -= req.body.addedProduct.quantity;
                await foundProduct.save();
            } else {
                throw new Error("Product not found");
            }

            res.status(200).json({
                "message": "Added successfully"
            })
        } else {
            let newItem = Object.assign({}, req.body.addedProduct);
            newItem.product = req.body.addedProduct.product
            foundCart.cart.push(newItem)
            await foundCart.save();

            const foundProduct = await Product.findById(req.body.addedProduct.productId);
            if (foundProduct) {
                foundProduct.countInStock -= req.body.addedProduct.quantity;
                await foundProduct.save();
            } else {
                throw new Error("Product not found");
            }
    
            res.status(200).json({
                "message": "Added successfully"
            })

        }
        
    } else {
        res.status(404).json({
            "message": "no user found"
        })
    }
    
}

const deleteProduct = async (req, res) => {
    const foundUser = await User.findOne({email: req.body.email}).exec()
    const foundCart = await Cart.findOne({ userId: foundUser._id }).exec();

    const itemIndex = foundCart.cart.findIndex(item => item._id.toString() === req.body.accessKey)
    
    if(itemIndex !== -1) {
        foundCart.cart.splice(itemIndex, 1)
        await foundCart.save();

        //update product quantity   
        const foundProduct = await Product.findById(req.body.productId);
        if (foundProduct) {
            foundProduct.countInStock += req.body.quantity;
            await foundProduct.save();
        } else {
            throw new Error("Product not found");
        }

        res.status(200).json({
            "message": "Deleted successfully"
        })
    } else {
        res.status(404)
    }

}

const updateProduct = async (req, res) => {
    const foundUser = await User.findOne({email: req.body.email}).exec()
    const foundCart = await Cart.findOne({ userId: foundUser._id }).exec();
    const itemIndex = foundCart.cart.findIndex(item => item._id.toString() === req.body.accessKey)

    if(itemIndex !== -1) {
        if(req.body.number) {
            //update product quantity   
            const foundProduct = await Product.findById(req.body.productId);
            if (foundProduct) {
                if(parseInt(foundCart.cart[itemIndex].quantity) > parseInt(req.body.number)) {
                    foundProduct.countInStock += parseInt(foundCart.cart[itemIndex].quantity) - parseInt(req.body.number);
                    await foundProduct.save();
                } else if(parseInt(foundCart.cart[itemIndex].quantity) < parseInt(req.body.number)){
                    foundProduct.countInStock -= parseInt(req.body.number) - parseInt(foundCart.cart[itemIndex].quantity);
                    await foundProduct.save();
                }
                
            } else {
                throw new Error("Product not found");
            }
            
            foundCart.cart[itemIndex].quantity = req.body.number;
            await foundCart.save();
        }
        if(req.body.color) {
            foundCart.cart[itemIndex].color = req.body.color;
            await foundCart.save();
        }
        if(req.body.size) {
            foundCart.cart[itemIndex].size = req.body.size;
            await foundCart.save();
        }
    
        res.status(200).json({
            "message": "Updated successfully"
        })
    } else {
        res.status(404)
    }
    
}

const finishOrder = async (req, res) => {
    res.status(200).json({
        "message": "Deleted successfully"
    })
}

module.exports = {
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct,
    finishOrder
}