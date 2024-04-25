const clientController = require('../controller/clientController');
const router = require('express').Router();

router.post('/createClient', clientController.addClient);
router.get('/getAllClient', clientController.findAllClients);
router.post('/findOneClient', clientController.findOneclient);
router.put('/updateclient',clientController.updateClient);
router.delete('/deleteClient',clientController.deleteClient)

module.exports = router;
