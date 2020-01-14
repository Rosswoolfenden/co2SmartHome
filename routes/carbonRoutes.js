const express =  require ('express');
const router = express.Router();
const config = require('../config');
const logging = require("../logging/logging");
const log = logging.createLogger("router");
const carbon = require('../carbon/fetch');

router.get('/carbon', async (req, res) => { 

});

router.get('/currentLevel', async (req, res) => {
    try {
        const carbonLevel = await carbon.carbonLevel();
        res.send({level: carbonLevel});
    } catch (e) {
        res.send({Error: 'Unable to get current levels'})
    }
})

router.get('/statistics', async(req, res) => {
    
});

router.get('/fuelType', async (req, res) => {
    try {
        const fuelTypes = await carbon.getGenerationMix();
        res.send(fuelTypes);
    } catch (e) {
        res.sendStatus({Error: 'Unable to collect fuel types currently '})
    }
})

module.exports = router;