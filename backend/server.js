require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./connectDB')
const route = require('./routes/route')
const cookieParser = require('cookie-parser')
const app = express()
const path = require('path')

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cookieParser())
app.use(express.json({limit: '50mb'}))
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use('/images', express.static('public/images', {
    maxAge: 'no-cache', // Set an appropriate max-age value
}));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views') )

connectDB();

route(app)

app.listen(3500, () => console.log("Server started"))