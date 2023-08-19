const User = require('../models/User')
const bcrypt = require('bcrypt')

const accessAccount = async (req, res) => {
    let foundUser
    if(res.locals.email) {
        foundUser = await User.findOne({email: res.locals.email}).exec()
    } else {
        foundUser = await User.findOne({email: req.body.email}).exec()
    }

    if(!foundUser) {
        res.status(401).json({"message": "no user found" });
    } else {
        const adminOptions = [
            'Profile', 
            'Product Management'
        ]

        const userOptions = [
            'Profile', 
            "Shipping Address",
            'Order'
        ]

        if(foundUser.isAdmin) {
            res.json({
                id: foundUser._id,
                username: foundUser?.username,
                email: foundUser?.email,
                options: adminOptions
            })
        } else 
            res.json({
                id: foundUser._id,
                username: foundUser?.username,
                email: foundUser?.email,
                options: userOptions
            })
    }

}

const updateAccout = async (req, res) => {
    let result
    if(req.body?.username !== '') {
        result = await User.updateOne({ _id: req.body.id }, {username: req.body.username}).exec()
    }
    if (req.body?.email !== '') {
        result = await User.updateOne({ _id: req.body.id }, {email: req.body.email}).exec()
    } 
    if(req.body?.password !== '') {
        result = await User.updateOne({ _id: req.body.id }, {password: req.body.password}).exec()
    }
    if (req.body?.shippingAddress) {
        result = await User.updateOne({ _id: req.body.shippingAddress.id}, {shippingAddress: req.body.shippingAddress}).exec()
    }
    
    res.status(200).json({
        "message": "Successfully updated!"
    })
}

module.exports = {
    accessAccount,
    updateAccout
}