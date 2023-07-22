let userDB = require('../users.json')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fsPromises = require('fs').promises
const path = require('path')

const authController = async (req, res) => {
    const { user, pwd } = req.body
    if(!user || !pwd) {
        return res.status(400).json({
            "message": "User and password are required"
        })
    }

    const foundUser = userDB.find(per => per.username == user)
    if(!foundUser) return res.status(401)

    const match = await bcrypt.compare(pwd, foundUser.password)
    if(match) {
        const token = jwt.sign(
            {
                "UserInfo": {
                    "user": foundUser.username
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '30d'
            }
        )
        foundUser.token = token
        const otherUser = userDB.filter(per => per.username !== foundUser.username)
        userDB = [...otherUser, foundUser]
        fsPromises.writeFile(path.join(__dirname, '..', 'users.json'), JSON.stringify(userDB))

        res.status(201).json({
            "message": "Authorized successfully"
        })
    } else {
        res.sendStatus(401) //unauthorized
    }
}

module.exports = authController