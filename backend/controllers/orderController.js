const Order = require('../models/Order');
const User = require('../models/User')
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
    const foundUser = await User.findOne({ email: req.body.email}).exec();
    const foundCart = await Cart.findOne({ userId: foundUser._id }).exec();    
    
    //delete selected item from the cart
    for(let purchase_item of req.body.cart) {
        const itemIndex = foundCart.cart.findIndex(item => item._id.toString() === purchase_item._id)
        
        if(itemIndex !== -1) {
            foundCart.cart.splice(itemIndex, 1)
            await foundCart.save();
        }
    }

    // create order
    try {
        await Order.create({
            "userId": foundUser._id,
            "cart": req.body.cart,
            "totalAmount": req.body.totalAmount,
            "totalProduct": req.body.totalProduct,
            "status": req.body.status,
            "paymentMethod": req.body.paymentMethod
        })
    
        res.status(201).json({
            "message": "Created sucessfully"
        })
    } catch (error) {
        res.status(500).json({
            "message": error.message
        })
    }
}

module.exports = {
    createOrder
}