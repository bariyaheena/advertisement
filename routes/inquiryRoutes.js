const router = require('express').Router();
const inquiryController = require('../controller/inquiryController');

router.get('/allInquiry', inquiryController.findInquiry);
router.post('/verify-otp',inquiryController.verifyOTP);
router.post('/addInquiry',inquiryController.addinquiry);

module.exports = router