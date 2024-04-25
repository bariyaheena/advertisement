const slotController = require('../controller/slotController');
const router = require('express').Router();

router.post('/create_slot',slotController.createSlot);
router.get('/slot_list',slotController.findSlot);
router.delete('/delete_slot',slotController.deleteSlot);
router.put('/update_slot',slotController.updateSlot);
router.post('/edit_slot',slotController.editSlot);
router.post('/check_page_avaibility',slotController.check_page_avaibility);
router.get('/pastSlot_list',slotController.pastSlotlist)

module.exports = router