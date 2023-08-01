const userDB = {
    users: require('../users.json'),
    setUser: function(data) {
        this.users = data
    }
}
const bcrypt = require('bcrypt')
const fsPromises = require('fs').promises
const path = require('path')

const registerController = async (req, res) => {
    const {user, email, pwd} = req.body

    if(!user || !pwd || !email) {
        return res.status(400).json({
            'message': "Please fill in all essential information"
        }) //bad request
    }

    const duplicate = userDB.users.find(acc => acc.username === user)
    if(duplicate) return res.sendStatus(409) //conflict

    try {
        const hashPwd = await bcrypt.hash(pwd, 10)
        const newUser = {
            'username': user,
            'email': email,
            'password': hashPwd
        }

        userDB.setUser([...userDB.users, newUser])
        await fsPromises.writeFile(path.join(__dirname, '..', 'users.json'), JSON.stringify(userDB.users))
        console.log(userDB.users)

        res.status(201).json({
            "message": "Created sucessfully"
        })
    } catch(err) {
        res.status(500).json({
            "message": err.message
        })
    }
}

module.exports = registerController