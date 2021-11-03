// NECESSARY IMPORTS
require('dotenv').config()
const PORT = 8000


const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const userRoutes = require('./routes/user_routes')
const wordRoutes = require('./routes/word_routes')
const paymentRoutes = require('./routes/payment_routes')
const word = require('./models/word')
const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }

// MIDDLEWARE AND ROUTES
app.use(cors(corsOptions))
app.use(express.json())
app.use('/user', userRoutes)
app.use('/word', wordRoutes)
app.use('/payments', paymentRoutes)

// CONNECTING TO DATABASE
mongoose.connect(
    "mongodb+srv://test_user:test_password@cluster0.vwzh7.mongodb.net/vocab?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
)
const db = mongoose.connection
db.on('error', (error)=>{console.log(error)})
db.once('open', ()=>{console.log("Connected to Database")})


// CHECK USING BASIC ROUTING
app.get('/', (req, res)=>{
    res.send("works fine...")
})



// INITIALISING SERVER
app.listen(PORT, ()=>{
    console.log("Server Started")
})