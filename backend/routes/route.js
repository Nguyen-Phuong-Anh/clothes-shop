require('dotenv').config()
const data = require('../data')
const registerController = require('../controllers/registerController')
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')

function route(app) {
    app.use('/accounts', (req, res) => {
        res.send(data.Account)
    })

    app.get('/product/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const result = data.Products.find(item => item.id === id)
        res.send(result)
    })
    
    app.get('/products', (req, res) => {
        const products = data.Products
        res.send(products)
    })

    app.post('/register', registerController)
    app.post('/signin', loginLimiter, authController.login)
    app.post('/refresh', authController.refresh)
    app.post('/logout', authController.logout)

    app.post('/search', (req, res) => {
        const products = data.Products
        const result = products.filter(item => item.name.includes(req.body.search))
        res.send(result)
    })
}

module.exports = route