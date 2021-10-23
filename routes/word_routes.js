const router = require('express').Router()
const Word = require('../models/word')
const User = require('../models/user')
const UserCounter = require('../models/user_counter')

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
    const user = await UserCounter.findOne({username: req.body.username})
    const freeCounter = user.freeCounter
    const resetDate = user.resetDate
    
    // CURRENT DATE TO CHECK
    let date = new Date()
    date = date.toDateString()
    // RESET DATE
    let newResetDate = new Date()
    newResetDate.setMonth(newResetDate.getMonth() + 1)
    newResetDate = newResetDate.toDateString()
    //  QUERY TO FIND TO USER
    const query = {username: req.body.username}
    
    // REPLACE THE STATEMENT BELOW IN THE CONDITIONAL TO APPLY MONTHLY TIMINGS
    //(Date.parse(date) > Date.parse(resetDate)) 
    if((Date.parse(date) > Date.parse(resetDate))){
        const counterAndDateUpdateDoc = {freeCounter: 0, resetDate: newResetDate}
        const result = await UserCounter.findOneAndUpdate(
            query,
            counterAndDateUpdateDoc,
            {
                useFindAndModify: false,
                new: true
            })
        
        res.json({message: 'all data', updatedUserData: result})
    }else{
        if(freeCounter > 3){
            res.json({message: 'un-restricted data only'})
        }else{
            const counterUpdateDoc = {freeCounter: freeCounter + 1}
            const result = await UserCounter.findOneAndUpdate(
                query,
                counterUpdateDoc,
                {
                    useFindAndModify: false,
                    new: true
                })
            res.json({message: "all data", updatedUserData: result})
        }
    }
})


router.get('/chdate', (req, res)=>{
    let date = new Date()
    date = date.toDateString()
    res.json({date: date})
})


module.exports = router