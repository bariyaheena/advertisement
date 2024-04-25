const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    page1: {
        type: Boolean,
        default:true
    },
    page2: {
        type: Boolean,
        default:true
    },
    page3: {
        type: Boolean,
        default:true
    },
    page4: {
        type: Boolean,
        default:true
    },
    status: {
        type: Boolean,
        default:true
    },
    uploadpaper:{
        type: String
     },
    createAt: {
        type: Date,
        default: Date.now
    },


})

const slot = new mongoose.model("slot", slotSchema);

module.exports = slot;

