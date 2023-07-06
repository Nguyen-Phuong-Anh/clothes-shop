const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = require('./connectDB')

const app = express()

app.use(express.json())
app.use(cors())

connectDB()

app.listen(3500, () => console.log("Server started"))