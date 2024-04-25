const adminCotroller = require('../controller/adminController');
const router = require('express').Router();

router.post('/register',adminCotroller.adminRegister);
router.post('/login', adminCotroller.adminLogin);

module.exports = router