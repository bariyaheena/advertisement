const mongoose = require('mongoose');
const URL = process.env.URL;

mongoose.connect(URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to mongodb database.....');
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;