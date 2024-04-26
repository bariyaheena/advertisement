const inquiryModal = require('../modals/inquiryModal');
const clientModal = require('../modals/clientModal');


const addinquiry = async(data) => {
    const inquirydata = await inquiryModal.create(data);
    return inquirydata;
   }
const findInquiry = async(query)=>{
    const findData = await inquiryModal.find(query);
    return findData
}
const updateOtp = async (query) => {
    try {
        const updateData = await inquiryModal.findOneAndUpdate(query, { otp: null, isVerified: true });
        return updateData;
    } catch (error) {
        console.error(error);
        throw error; 
    }
}
module.exports = {
    addinquiry,
    findInquiry,
    updateOtp 
}