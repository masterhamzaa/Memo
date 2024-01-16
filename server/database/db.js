const mdb = async () => {
    require("dotenv").config()
    const mongoose = require("mongoose")
    mongoose.set("strictQuery", false)
    await mongoose.connect(process.env.mdb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((result) => {
        console.log("Express Cluster ready for operations....");
    }).catch((err) => {
        console.log("error : " + err);
    });
    //const cluster = mongoose.connection;
    //cluster.once("open", () => {
        
    //})
    //cluster.on("error", (err) => {
       
    //})
}

module.exports = { mdb }