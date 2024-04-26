const bookedAdsModal = require('../modals/bookedAdsModal');
const clientModal = require('../modals/clientModal')
const adsModal = require('../modals/adsModal');

const adsbooked = async (data) => {
    try {
        const bookedAdsData = await bookedAdsModal.create(data);
        await bookedAdsData.populate('client_id')
        await bookedAdsData.populate('ads_id')
        return bookedAdsData;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
const findBooked_ads = async (query) => {
    const findData = await bookedAdsModal.find(query).populate('client_id').populate('ads_id');
    return findData
}
const updateImageById = async (query, update) => {
    const saveData = await bookedAdsModal.findOneAndUpdate(
        query,
        update,
        { new: true }
    );
    return saveData
}
const updatestatus = async (query, update) => {
    const updateData = await bookedAdsModal.findOneAndUpdate(query, update, { new: true })
    return updateData
}
module.exports = {
    adsbooked,
    findBooked_ads,
    updateImageById,
    updatestatus
}