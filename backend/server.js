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
app.use(express.json())
app.use(cors(corsOptions))

connectDB()

route(app)

app.listen(3500, () => console.log("Server started"))