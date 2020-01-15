const express =  require ('express');
const router = express.Router();
const config = require('../config');
const logging = require("../logging/logging");
const log = logging.createLogger("router");
const carbon = require('../carbon/addCarbon');

// router.get('/carbon', async (req, res) => { 
    
// });
router.get('/', async (req, res) => {
    try {
        const carbon = await carbon.getCarbonData();
        res.send(carbon);
    } catch (e) {
        res.send("This does not work")
    }
})
router.get('/carbon', async (req, res) => {
    try {
        const carbonData = await carbon.addCarbonData();
        res.send(carbonData);
    } catch (e) {
        log.error(JSON.stringify(e));
        res.send({Error: 'Unable to get current levels'});
    }
});

router.get('/statistics', async(req, res) => {

});

router.get('/fuelType', async (req, res) => {
    try {
        const fuelTypes = await carbon.getGenerationMix();
        res.send(fuelTypes);
    } catch (e) {
        res.sendStatus({Error: 'Unable to collect fuel types currently '});
    }
});

module.exports = router;