const express =  require ('express');
const router = express.Router();
const config = require('../config');
const logging = require("../logging/logging");
const log = logging.createLogger("router");
const latest = require('../carbon/addLatest');
const forecast = require('../carbon/addForecast');
const carbon = require('../carbon/getCarbon');
// router.get('/carbon', async (req, res) => { 
    
// });

// Endpoint to colelct carbon data
router.get('/range', async (req, res) => {
    try {
        const from = req.query.from;
        const to = req.query.to;
        const data = await carbon.getCarbonRange(from, to);
        res.send(data);
    } catch (e) {
        log.error('Unable to get carbon range');
        res.send({Error: 'Unable to get carbon range, try again later'});
    }
});

router.get('/current', async (req, res) => {
    try {

    } catch (e) {
        log.error('Unable to get current carbon data');
        res.send({Error: 'Unable to get current carbon data, try again later'});
    }
})
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