const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    page: {
        type: Number,
    },
    pageDate: {
        type: Date,
        required:true
    },
    status: {
        type: Boolean,
        default:false
    },
    createAt: {
        type: Date,
        default: Date.now
    }

})

const page = new mongoose.model('page', pageSchema);

module.exports = page