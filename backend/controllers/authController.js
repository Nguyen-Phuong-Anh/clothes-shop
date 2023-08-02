const User = require('../models/User')
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
        const role = Object.values(foundUser.isAdmin)
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "user": foundUser.username,
                    "isAdmin": role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '60s'
            }
        )

        const refreshToken = jwt.sign(
            {"user": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d"}
        )

        foundUser.refreshToken = refreshToken
        const result = await foundUser.save()

        res.cookie('jwt', refreshToken, {
            httpOnly: true, 
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        });
        
        res.status(201).send({ accessToken })
    } else {
        res.status(401).send({
            "message": "Invalid email or password"
        }) //unauthorized
    }
}

const refresh = (req, res) => {
    const cookies = req.cookies

    if(!cookies?.jwt) return res.status(401).json({
        "message": "Unauthorized"
    })

    const refreshToken = cookies.jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({"message": "Forbidden"})
        const foundUser = User.findOne({username: decoded.user})

        if(!foundUser) return res.status(401).json({"message": "Unauthorized"})

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "user": foundUser.username,
                    "role": foundUser.isAdmin
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30s"}
        )

        res.send({ accessToken })
    })
}

const logout = (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) res.sendStatus(204)

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true})
    res.json({
        "message": "cookie cleared"
    })
}

module.exports = { 
    login, 
    refresh,
    logout
}