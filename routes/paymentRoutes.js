const paymentController = require('../controller/paymentController');
const router = require('express').Router();

router.post('/initiatePayment',paymentController.initiatePayment);
router.post('/get_Total_amount',paymentController.get_Total_Amount);
router.get('/paymentList',paymentController.get_payment_list);
router.post('/savePayment',paymentController.createPayment);
router.post('/mailsend',paymentController.mailsend);
router.post('/tax',paymentController.tax);
router.post('/revenue',paymentController.revenue);


module.exports = router