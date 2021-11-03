const mongoose = require('mongoose')

const Word = mongoose.Schema({
    word: {type: String,required: true},
    meaning: {type: String,required: true},
    images: {type: Array, required: true},
    video :{type: String, required: true}
})
// ADD ASSETS ARRAY

module.exports = mongoose.model('words', Word)