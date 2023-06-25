// require('dotenv').config()
const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/SmartNote";
// const mongoURI = process.env.MONGO_URI;
const connectToMongo = () =>{
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo DB");
    })
}

module.exports = connectToMongo
