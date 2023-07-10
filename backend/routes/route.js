const data = require('../data')

function route(app) {
    app.get('/accounts', (req, res) => {
        res.send(data.Account)
    })
}

module.exports = route