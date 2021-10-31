const mongoose = require('mongoose')

const User = mongoose.Schema({
    name: {type: String, required: true},    
    username: {type: String, required: true},
    password: {type: String, required: true},
    
    freeCounter: {type: Number, default: 0},
    subscribed: {type: Boolean, default: false},
    subscriptionEnd : {type: String, default: ""}
})
// ADD SUBSCRIPTION END DATE


module.exports = mongoose.model('users', User)