const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
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
    location:{
        type:String,
        required:true
    },
    payment_type:{
        type:String,
        enum:['online','offline']
    },
    GST_No:{
        type:String
    }

})

const client = new mongoose.model("client", clientSchema);

module.exports = client;

