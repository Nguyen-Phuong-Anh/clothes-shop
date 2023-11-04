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

const getAllOrder = async (req, res) => {
    const page = req.query.page || 0
    const skip = (page - 1) * process.env.ITEMS_PER_PAGE
    try {
        const countPromise = await Order.estimatedDocumentCount();
        const allOrdersPromise = await Order.find({}, 'userId totalProduct createdAt').limit(process.env
            .ITEMS_PER_PAGE).skip(skip).exec();
        
        const [count, allOrders] = await Promise.all([countPromise, allOrdersPromise])
        const pageCount = count / process.env.ITEMS_PER_PAGE
        
        res.json({
            allOrders,
            pagination: {
                count, 
                pageCount
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(204).json({
            'message': 'No orders found'
        })
    }
}

const getOrder = async (req, res) => {
    const foundOrder = await Order.find({userId: req.body.userId}, 'cart totalAmount totalProduct status').exec();

    if(foundOrder) {
        res.send(foundOrder)
    } else {
        res.status(404).json({
            "message": "no order found"
        })

    }
}

const getDetailOrder = async (req, res) => {
    const foundOrder = await Order.findById({_id: req.params.id});
    
    if(foundOrder) {
        res.send(foundOrder)
    } else {
        res.status(404).json({
            "message": "no order found"
        })

    }
}

const getOrderAddr = async (req, res) => {
    if(req.body.userId) {
        const foundUser = await User.findById({_id: req.body.userId});
    
        if(foundUser) {
            res.send(foundUser?.shippingAddress)
        } else {
            res.status(500)
        }
    }
}

module.exports = {
    createOrder,
    getAllOrder,
    getOrder,
    getDetailOrder,
    getOrderAddr
}