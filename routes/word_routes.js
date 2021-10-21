const router = require('express').Router()
const Word = require('../models/word')
const User = require('../models/user')

router.post('/reg', async (req, res)=>{
    const wordCheck = await User.findOne({name: req.body.name})
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
    const user = await User.findOne({name: req.body.name})
    const freeCounter = user.freeCounter
    const resetDate = user.resetDate
    const date = req.body.date

    const query = {name: req.body.name}
    
    // REPLACE THE STATEMENT BELOW IN THE CONDITIONAL TO APPLY MONTHLY TIMINGS
    //(Date.parse(date) > Date.parse(resetDate)) 
    if(date > resetDate){
        const counterAndDateUpdateDoc = {freeCounter: 0, resetDate: date}
        const result = await User.findOneAndUpdate(
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
            const result = await User.findOneAndUpdate(
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

router.get('/getAllWords', async (req, res)=>{
    const words = await Word.find()
    res.status(200).json({words: words})
})

module.exports = router