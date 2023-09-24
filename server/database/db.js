const mdb = async () => {
    require("dotenv").config()
    const mongoose = require("mongoose")
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_URI)
        console.log("Connect to MongoDB successfully...")
    } catch (error) {
        console.log("Connect failed " + error.message )
    }
}


module.exports = { mdb }