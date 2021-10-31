const router = require('express').Router()
const User = require('../models/user')

// MOST BASIC REGISTRATION ROUTE FOR TESTING PURPOSE ONLY

router.post('/getUser', async (req, res)=>{
    const user = await User.findOne({username: req.body.username})
    res.status(200).json(user)
})

router.get('/getAllUsers', async (req, res)=>{
    const users = await User.find()
    res.json(users)
})

router.post('/reg', async (req, res)=>{
    const userCheck = await User.findOne({username: req.body.username})
    if(!userCheck){
        
        // NEW USER INSTANCE
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password    
        })
        try{

            // SAVING NEW USER INSTANCE TO DATABASE
            const newUserInstance = await user.save()
            res.status(200).json({
                user: newUserInstance
            })
        }catch(error){
            res.status(210).json({message: error.message})
        }
    }else{
        res.status(203).json({message: 'user already exists'})
    }
})


router.post('/login', async (req, res)=>{
    const user = await User.findOne({username: req.body.username})
    if(!user){
        res.send("username not found")
    }else{
        if(user.password === req.body.password){
            res.status(200).send("logged in")
        }else{
            res.send("wrong password")
        }
    }
})

module.exports = router