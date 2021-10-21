const mongoose = require('mongoose')

const Word = mongoose.Schema({
    word: {type: String,required: true},
    meaning: {type: String,required: true}
})

module.exports = mongoose.model('words', Word)