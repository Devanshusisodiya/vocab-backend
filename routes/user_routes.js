const router = require('express').Router()
const User = require('../models/user')
const UserCounter = require('../models/user_counter')

// MOST BASIC REGISTRATION ROUTE FOR TESTING PURPOSE ONLY

router.get('/getUser', async (req, res)=>{
    const user = await User.findOne({name: req.body.name})
    res.json(user)
})

router.get('/getAllUsers', async (req, res)=>{
    const users = await User.find()
    res.json(users)
})

router.post('/reg', async (req, res)=>{
    const userCheck = await User.findOne({username: req.body.username})
    if(userCheck === null){
        
        // RESET DATE FOR COUNTER RESET
        let dateString = new Date()
        dateString.setMonth(dateString.getMonth() + 1)
        dateString = dateString.toDateString()
        
        // NEW USER INSTANCE
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
            
        })
        // INSTANCE FOR COUNTER MODEL
        const userCounter = new UserCounter({
            username: req.body.username,
            freeCounter: 0,
            resetDate: dateString
        })
    
        try{
            const newUserInstance = await user.save()
            const newUserCounterInstance = await userCounter.save()
            res.status(200).json({
                user: newUserInstance,
                user_counter: newUserCounterInstance
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