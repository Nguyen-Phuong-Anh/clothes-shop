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
            'Order',
            "Shipping Address"
        ]

        if(foundUser.isAdmin) {
            res.json({
                username: foundUser?.username,
                email: foundUser?.email,
                options: adminOptions
            })
        } else 
            res.json({
                username: foundUser?.username,
                email: foundUser?.email,
                options: userOptions
            })
    }

}

const updateAccout = async (req, res) => {
    console.log(req.body)

    // if(res.body.username) await User.updateOne({_id: req.body.id}, {username: res.body.username}).exec()
    // if(res.body.email) await User.updateOne({_id: req.body.id}, {email: res.body.email})
    // if(res.body.password) {
    //     const hashPwd = bcrypt(password, 10);
    //     await User.updateOne({_id: req.body.id}, {password: hashPwd})
    // }

    // res.status(200)
}

module.exports = {
    accessAccount,
    updateAccout
}