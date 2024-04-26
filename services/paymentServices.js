const paymentModel = require('../modals/paymentModal');
const bookedAdsModal = require('../modals/bookedAdsModal');
const clientModal = require('../modals/clientModal');
const adsModal = require('../modals/adsModal')

const createPayment = async (data) => {
    const saveData = await paymentModel.create(data);
    return saveData
}
const findPayment = async (query) =>{
    const findData = await paymentModel.findOne(query);
    return findData
}
const find_booked_id_Payment = async (query) =>{
    const findData = await paymentModel.find(query);
    return findData
}
const get_all_payment = async (query) => {
    try {
        const paymentDetail = await paymentModel.find(query).populate({
            path: 'booked_id',
            populate: {
                path: 'client_id',
                model: 'client' 
            }
        }).populate({
            path: 'booked_id',
            populate: {
                path: 'ads_id',
                model: 'ads' 
            }
        });
        return paymentDetail;
    } catch (error) {
        console.error('Error fetching payment details:', error);
        throw error; 
    }
};

module.exports = {
    createPayment,
    findPayment,
    find_booked_id_Payment,
    get_all_payment
}