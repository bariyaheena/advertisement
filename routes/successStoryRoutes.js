const successStory_controller = require('../controller/successStory_Ctrl');
const router = require('express').Router();

router.post('/initiatePayment',successStory_controller.initiatePayment)
router.post('/preBooking',successStory_controller.bookingForStory)
router.put('/update_status',successStory_controller.update_Payment_Status)
router.get('/pre_booking_list',successStory_controller.preBooking_list)

module.exports = router