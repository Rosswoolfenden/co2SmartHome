const express =  require ('express');
const router = express.Router();
const config = require('../config');
const logging = require("../logging/logging");
const log = logging.createLogger("router");
const latest = require('../carbon/addLatest');
const forecast = require('../carbon/addForecast')
// router.get('/carbon', async (req, res) => { 
    
// });

// Endpoint to colelct carbon data
router.get('/', async (req, res) => {
    try {
        const carbon = await latest.addCarbonData();
        res.send(carbon);
    } catch (e) {
        res.send("This does not work")
    }
});

// Endpoint to add carbon data from the database
router.post('/carbon', async (req, res) => {
    try {
        const carbonData = await latest.addCarbonData();
        res.send(carbonData);
    } catch (e) {
        log.error(JSON.stringify(e));
        res.send({Error: 'Unable to get current levels'});
    }
});

router.post('/forecast', async (req, res) => {
    try {
        const data = await forecast.addForecast();
        res.send(data);
    } catch (e) {
        log.error(JSON.stringify(e));
        res.send({Error: 'Unable to get forcasted levels'});
    }
});

// Endpoint to get the statistics

router.get('/statistics', async(req, res) => {

});


module.exports = router;