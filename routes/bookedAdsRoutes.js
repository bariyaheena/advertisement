    const bookedAdsController = require('../controller/bookedAdsController');
    const router = require('express').Router();

    const multer  = require('multer')

    const storage = multer.memoryStorage();
    const upload = multer({storage: storage});

    router.post('/bookedAds',bookedAdsController.bookedAds);
    router.get('/findBookedAds',bookedAdsController.findBokedAds);
    router.post('/booked_ads_for_chart',bookedAdsController.booked_ads_for_chart);

    router.put('/uploadAdsImage', upload.single('image'),bookedAdsController.uploadAdsImage); 
    
    router.put('/update_Payment_Status',bookedAdsController.update_Payment_Status)


    module.exports = router