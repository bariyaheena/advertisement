const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    orderId: String,
    razorpay_payment_id:String,
    paymentId: String,
    booked_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "booked_Ads"
    },
    slot_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'slot'
    },
    amount: {
        type: Number
    },
    totalAmount: {
        type: Number
    },
    taxAmount: {
        type: Number
    },
    status: String


})

const payment = new mongoose.model('payment', paymentSchema)

module.exports = payment