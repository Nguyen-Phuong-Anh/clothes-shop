const User = require('../models/User')
const Cart = require('../models/Cart')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { user, pwd } = req.body
    
    if(!user || !pwd) {
        return res.status(400).json({
            "message": "User and password are required"
        })
    }

    const foundUser = await User.findOne({email: user}).exec()
    if(!foundUser) return res.status(401).json({
        "message": "no user found"
    });
    
    //if the user exist
    const match = await bcrypt.compare(pwd, foundUser.password)

    if(match) {
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "isAdmin": foundUser.isAdmin
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1d'
            }
        )

        const refreshToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "30d"}
        )
        const foundCart = await Cart.findOne({ userId: foundUser._id }).lean().exec()
        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()

        res.cookie('jwt', refreshToken, {
            httpOnly: true, 
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        });

        if(foundCart) {
            res.status(201).send({ user, accessToken, cartLength: foundCart.cart.length })
        } else {
            if(foundUser.isAdmin === true) res.status(201).send({ user, accessToken, cartLength: 0 })
        }
        
    } else {
        res.status(401).send({
            "message": "Invalid email or password"
        }) //unauthorized
    }
}

const refresh = async (req, res) => {
    const cookies = req.cookies

    if(!cookies?.jwt) return res.status(401).json({
        "message": "Unauthorized"
    })

    const refreshToken = cookies.jwt
    const foundUser = await User.findOne({refreshToken}).exec()
    const foundCart = await Cart.findOne({ userId: foundUser._id }).exec()

    if(!foundUser) return res.status(401).json({"message": "Unauthorized"})

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({"message": "Forbidden"})
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": decoded.UserInfo.email,
                    "isAdmin": foundUser.isAdmin
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1d"}
        )

        if(foundCart) {
            res.json({
                email: decoded.UserInfo.email,
                accessToken: accessToken,
                cartLength: foundCart.cart.length
            })
        } else {
            res.json({
                email: decoded.UserInfo.email,
                accessToken: accessToken,
                cartLength: 0
            })
        }
    })
    
}

const logout = async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) res.sendStatus(204)

    //clear the refresh token in the database
    const refreshToken = cookies.jwt;
    const update = await User.updateOne({ refreshToken: refreshToken }, { refreshToken: '' }).exec()

    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' })
    res.sendStatus(204)
}

module.exports = { 
    login, 
    refresh,
    logout
}