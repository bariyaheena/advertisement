const pageController = require('../controller/pageController');
const router = require('express').Router();

router.post('/createPage',pageController.createPage);
router.get('/pageList',pageController.pageList);
router.delete('/deletepage',pageController.deletepage);
router.get('/booked_page',pageController.booked_page)
router.get('/findOne',pageController.findOnepage)

module.exports = router