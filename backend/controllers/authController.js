let userDB = require('../users.json')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fsPromises = require('fs').promises
const path = require('path')

const login = async (req, res) => {
    const { user, pwd } = req.body
    
    if(!user || !pwd) {
        return res.status(400).json({
            "message": "User and password are required"
        })
    }

    const foundUser = userDB.find(per => per.username == user)
    if(!foundUser) return res.status(401).json({
        "message": "no user found"
    });
    
    //if the user exist
    const match = await bcrypt.compare(pwd, foundUser.password)
    if(match) {
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "user": foundUser.username,
                    "name": foundUser.name
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '30d'
            }
        )

        const refreshToken = jwt.sign(
            {"user": foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d"}
        )
        
        foundUser.accessToken = accessToken
        const otherUser = userDB.filter(per => per.username !== foundUser.username)
        userDB = [...otherUser, foundUser]
        fsPromises.writeFile(path.join(__dirname, '..', 'users.json'), JSON.stringify(userDB))
        // res.setHeader("Authorization", "Bearer " + token);
        res.cookie('jwt', accessToken, {
            httpOnly: true, maxAge: 24 * 60 * 60 * 1000
        });
        
        res.status(201).send({
            "user": foundUser.username,
            "name": foundUser.name,
            "isAdmin": foundUser.isAdmin,
            "token": foundUser.token
        })
    } else {
        res.status(401).send({
            "message": "Invalid email or password"
        }) //unauthorized
    }
}

module.exports = { 
    login
}