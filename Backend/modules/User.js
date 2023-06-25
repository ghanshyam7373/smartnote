const mongoose = require('mongoose');

// making user schema 
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
})

// converting into model 
const User = mongoose.model('user',UserSchema);
module.exports = User 