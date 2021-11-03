require('dotenv').config()
const router = require('express').Router()
const Razorpay = require('razorpay')

// PAYMENT ROUTE
router.post('/orders', async (req, res)=>{
    var options = {
        amount: 50000,
        currency: "INR",
        receipt: "order_rcptid_11"
    }
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })
    instance.orders.create(options, (err, order)=>{
        res.json(order)
        console.log(order)
    })
})

module.exports = router