const mongoose = require('mongoose');

const successStorySchema = new mongoose.Schema({
    orderId: String,
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    GST_No:{
        type: String
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
    payment_Status: {
        type: Boolean,
        default:false
    }
})

const successStory = new mongoose.model("successStory", successStorySchema);

module.exports = successStory;

