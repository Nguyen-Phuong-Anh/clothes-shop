const express = require('express')
const cors = require('cors')
const connectDB = require('./connectDB')
const route = require('./routes/route')

const app = express()

connectDB()

app.use(express.json())
app.use(cors())

route(app)

app.listen(3500, () => console.log("Server started"))