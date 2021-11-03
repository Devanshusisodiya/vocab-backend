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
        key_id: rzp_test_pNPqdICL2ewdAt,
        key_secret: wP9YDPPcsuITf0VYeTtrM6rw
    })
    instance.orders.create(options, (err, order)=>{
        res.json(order)
        console.log(order)
    })
})

module.exports = router