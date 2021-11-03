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
    const wordCheck = await Word.findOne({word: req.body.word})
    if(wordCheck === null){
        const word = new Word({
            word: req.body.word,   
            meaning: req.body.meaning,
            images: req.body.images,
            video: req.body.video
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

router.patch('/freeWordFetch', async (req, res)=>{
    const wordData = await Word.findOne({word: req.body.word})
    const user = await User.findOne({username: req.body.username})

    const freeCounter = user.freeCounter 

    if(freeCounter < 10){
        // SEND UNRESTRICTED DATA AND PATCH FREECOUNTER VALUE
        const updateDoc = {freeCounter: freeCounter + 1}
        const updatedUser = await User.findOneAndUpdate(
            {username: req.body.username},
            updateDoc,
            {
                new: true,
                useFindAndModify: false
            }
        )
        console.log("sending unrestricted data")
        console.log(updatedUser)
        res.json({images: wordData.images, video: wordData.video, restricted: false})
    }else{
        // SEND RESTRICTED DATA
        console.log("sending restricted data")
        res.json({restricted: true})
    }
})




module.exports = router