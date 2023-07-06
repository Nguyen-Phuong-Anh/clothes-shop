const mongoose = require('mongoose')

async function connectDB() {
    try {
        mongoose.connect("mongodb://localhost:27017", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log("Connect to mongoDB")
    } catch(err) {
        console.error(err)
    }
}

module.exports = connectDB