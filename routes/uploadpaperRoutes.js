const uploadpaperController = require('../controller/uploadpaperCtrl');
const router = require('express').Router();
const multer  = require('multer')


const storage = multer.memoryStorage();
const upload = multer({storage: storage});


// router.post('/uploadpaper', upload.fields([ { name: 'uploadpaper', maxCount: 5 }]),uploadpaperController.uploadPaper); 
router.post('/uploadpaper', upload.single('uploadpaper'), uploadpaperController.uploadPaper);


module.exports = router