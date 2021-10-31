const router = require('express').Router()
const Word = require('../models/word')
const User = require('../models/user')
const { Query } = require('mongoose')
const word = require('../models/word')

router.get('/getAllWords', async (req, res)=>{
    const words = await Word.find()
    res.status(200).json({words: words})
})

router.post('/getWord', async (req, res)=>{
    const word = await Word.findOne({word: req.body.word})
    res.status(200).json({word: word})
})

router.post('/reg', async (req, res)=>{
    const wordCheck = await User.findOne({word: req.body.word})
    if(wordCheck === null){
        const word = new Word({
            word: req.body.word,   
            meaning: req.body.meaning
        })
    
        try{
            const newWord = await word.save()
            res.status(200).json({result: newWord})
        }catch(error){
            res.status(210).json({message: error.message})
        }
    }else{
        res.status(203).json({message: 'word already exists'})
    }
})

router.patch('/fetchWordAndUpdateCounter', async (req, res)=>{
    // REQUIRED DATA
    const wordQuery = {word: req.body.word}
    const word = await Word.findOne(wordQuery)
    const query = {username: req.body.username}
    
    // USER DATA
    const user = await User.findOne(query)
    const freeCounter = user.freeCounter
    const subEnd = user.subscriptionEnd
    
    // CURRENT DATE TO CHECK
    let currentDate = new Date()
    currentDate = currentDate.toDateString()
    
    // CHECKING OF SUBSCRIPTION IS TO BE ENDED
    if((Date.parse(currentDate) > Date.parse(subEnd))){
        // SET SUBEND DATE TO EMPTY AGAIN AND SUBBED STATUS FALSE
        const updateDoc = {
            subscribed: false,
            subscriptionEnd: ""
        }
        const updatedUser = await User.findOneAndUpdate(
            query, updateDoc,
            {
                useFindAndModify: false,
                new: true
            })
        // LOGGING AND RESPONDING
        console.log(updatedUser)
        res.json(updatedUser)
    }else{
        // CHECK IF COUNTER IS LESS THAN LIMIT
        // IF IT IS THEN SEND UNRESTRICTED RESPONSE
        if(freeCounter < 3){
            const updateDoc = {freeCounter: freeCounter + 1}
            const updatedUser = await User.findOneAndUpdate(query, updateDoc)
            console.log(updatedUser)
            res.json({"updated user": updatedUser, "unrest data": word})
        }else{
            // ELSE SEND RESTRICTED RESPONSE
            res.json({"rest data": word.word})
        }

    }
})


module.exports = router