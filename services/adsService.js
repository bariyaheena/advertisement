const adsModal = require("../modals/adsModal");
const bookedAdsModal = require('../modals/bookedAdsModal');
const slotModal = require('../modals/slotModal');
const moment = require('moment');
const mongoose = require('mongoose');
const {sendInvoiceEmail } = require('../utils/nodemailer')

const create_Ads = async (data) => {
    const addData = await adsModal.create(data);
    return addData
}
const find_Ads = async (query) => {
    const findData = await adsModal.find(query);
    return findData
}

// const find_Ads_With_Booking_Status = async (query) => {
//     try {    
//         const allAds = await adsModal.find({page_id:query.page_id});
//         const inputDate = query.slot_Date; 
//         const utcDate = moment.utc(inputDate);
//         const formattedDate = utcDate.toISOString();


//         const bookedAds = await bookedAdsModal.find({
//             page_id: query.page_id,
//             slot_Date: formattedDate,
//             payment_Status: true  
//         }).select('ads_id client_id'); 
    

//         const adsWithBookingStatus = await Promise.all(allAds.map(async ad => {
//             const isBooked = bookedAds.some(booking =>
//                 String(booking.ads_id) === String(ad._id)
//             );
            
//             let client_id = null;
//                 if (isBooked) {
//                     const booking = await bookedAdsModal.findOne({
//                         ads_id: ad._id
//                     }).select('client_id').populate('client_id', 'name');
//                     if (booking) {
//                         client_id = booking.client_id;
//                     }
//                 }
//             return { ...ad.toObject(), Is_booked: isBooked,client_id:client_id};
//         }));
        
        
//         return adsWithBookingStatus;
//     } catch (error) {
//         throw error;
//     }
// }

const find_Ads_With_Booking_Status = async (query) => {
    try {    
        const allAds = await adsModal.find({page_id:query.page_id});
        const inputDate = query.slot_Date; 
        const utcDate = moment.utc(inputDate);
        const formattedDate = utcDate.toISOString();


        const bookedAds = await bookedAdsModal.find({
            page_id: query.page_id,
            slot_Date: formattedDate,
            payment_Status: true  
        }).select('ads_id client_id image'); 
    

        const adsWithBookingStatus = await Promise.all(allAds.map(async ad => {
            const isBooked = bookedAds.some(booking =>
                String(booking.ads_id) === String(ad._id)
            );
            
            let client_id = null;
            let image = null;
            let booked_id = null
                if (isBooked) {
                    const booked_client = await bookedAdsModal.findOne({
                        ads_id: ad._id
                    }).select('client_id').populate('client_id', 'name');
                    const booking = await bookedAdsModal.findOne({
                        ads_id: ad._id
                    })
                    if (booking) {
                        client_id = booked_client.client_id;
                        image = booking.image;
                        booked_id = booking._id
                    }
                }
            return { ...ad.toObject(), Is_booked: isBooked,client_id:client_id,image:image,booked_id:booked_id};
        }));
        
        
        return adsWithBookingStatus;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    create_Ads,
    find_Ads,
    find_Ads_With_Booking_Status
}