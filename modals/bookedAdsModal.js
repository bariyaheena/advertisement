const mongoose = require('mongoose');

const bookedAdsSchema = new mongoose.Schema({
    page_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "page"
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client"
    },
    ads_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ads"
    },
    slot_Date: {
        type: Date,
        required: true
    },
    slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "slot"
    },
    image: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    payment_Status: {
        type: Boolean,
        default:false
    }
});

const bookedAds = new mongoose.model('booked_Ads', bookedAdsSchema);
module.exports = bookedAds