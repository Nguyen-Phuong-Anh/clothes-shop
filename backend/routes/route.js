const data = require('../data')

function route(app) {
    app.get('/accounts', (req, res) => {
        res.send(data.Account)
    })

    app.get('/products', (req, res) => {
        res.send(data.Products)
    })
}

module.exports = route