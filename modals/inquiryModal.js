const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    // client_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "client"
    // },
    name: {
        type: String,
        required:true
    },
    mobile: {
        type: Number,
    },
    email:{
        type: String,
        required:true
    },
    inquiry: {
        type: String,
        required:true
    },
    otp:{
        type:String
    },
    isVerified:{
       type:Boolean 
    }
});

const inquiry = new mongoose.model('inquiry', inquirySchema);

module.exports = inquiry