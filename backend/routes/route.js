const sitesRouter = require('./sites')

function route(app) {
    app.use('/', sitesRouter)
}

module.exports = route