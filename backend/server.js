const express = require('express')
const cors = require('cors')
const connectDB = require('./connectDB')
const route = require('./routes/route')
const cookieParser = require('cookie-parser')

const app = express()

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cookieParser())
app.use(express.json({limit: '50mb'}))
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

connectDB();

route(app)

app.listen(3500, () => console.log("Server started"))