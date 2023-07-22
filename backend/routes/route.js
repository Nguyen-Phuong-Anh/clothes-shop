const data = require('../data')
const registerController = require('../controllers/registerController')

function route(app) {
    app.get('/accounts', (req, res) => {
        res.send(data.Account)
    })

    app.get('/product/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const result = data.Products.find(item => item.id === id)
        res.send(result)
    })
    
    app.get('/products', (req, res) => {
        res.send(data.Products)
    })

    app.post('/register', registerController)
}

module.exports = route