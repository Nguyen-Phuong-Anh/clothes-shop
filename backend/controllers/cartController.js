const Cart = require('../models/Cart');
const User = require('../models/User');

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
            res.status(200).json({
                "message": "Added successfully"
            })
        } else {
            let newItem = Object.assign({}, req.body.addedProduct);
            newItem.product = req.body.addedProduct.product
            foundCart.cart.push(newItem)
            await foundCart.save();
    
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
            foundCart.cart[itemIndex].quantity = req.body.number;
        }
        if(req.body.color) {
            foundCart.cart[itemIndex].color = req.body.color;
        }
        if(req.body.size) {
            foundCart.cart[itemIndex].size = req.body.size;
        }
        await foundCart.save();
    
        res.status(200).json({
            "message": "Updated successfully"
        })
    } else {
        res.status(404)
    }
    
}

module.exports = {
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
}