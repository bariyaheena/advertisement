const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
    page_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "page"
    },
    unique_id: {
        type: String,
        unique: true
    },
    pageSize: {
        type: String,

    },
    price: {
        type: Number,

    },
    createAt: {
        type: Date,
        default: Date.now
    }

})

const ads = new mongoose.model('ads', adsSchema)

module.exports = ads