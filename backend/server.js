const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./connectDB')
const route = require('./routes/route')
const handlebars = require('handlebars')
const { engine } = require('express-handlebars')
const path = require('path')

const app = express()

connectDB()

app.use(express.json())
app.use(cors())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, '/views'));

route(app)

app.listen(3500, () => console.log("Server started"))