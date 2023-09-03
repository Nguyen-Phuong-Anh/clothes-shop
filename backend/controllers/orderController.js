const Order = require('../models/Order');
const User = require('../models/User')

const createOrder = async (req, res) => {
    const foundUser = await User.findOne({ email: req.body.email}).exec();

    try {
        const newOrder = await Order.create({
            userId: foundUser._id,
            cart: req.body.cart,
            totalAmount: req.body.totalAmount,
            totalProduct: req.body.totalProduct,
            status: req.body.status,
            paymentMethod: req.body.paymentMethod
        })
    
        res.status(201).json({
            "message": "Created sucessfully"
        })
    } catch (error) {
        res.status(500).json({
            "message": err.message
        })
    }
}

module.exports = {
    createOrder
}