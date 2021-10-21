const mongoose = require('mongoose')

const User = mongoose.Schema({
    name: {type: String, required: true},    
    username: {type: String, required: true},
    password: {type: String, required: true},
    subscribed: {type: Boolean, default: false}
})


module.exports = mongoose.model('users', User)