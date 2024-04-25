const adsController = require('../controller/adsController');
const router = require('express').Router();

router.post('/ads_add',adsController.createAds);
router.post('/find_Ads',adsController.find_Ads);
router.post('/Total_booked_Ads',adsController.Total_booked_Ads);
router.post('/pending_ads',adsController.pending_ads);
router.post('/find_Ads_With_Booking_Status',adsController.find_Ads_With_Booking_Status);


module.exports = router