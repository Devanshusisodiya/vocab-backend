const mongoose = require('mongoose')

const UserCounter = mongoose.Schema({
    username: {type: String, required: true},
    freeCounter: {type: Number, required: true},
    resetDate: {type: String, required: true}
})


module.exports = mongoose.model('user_counter', UserCounter)