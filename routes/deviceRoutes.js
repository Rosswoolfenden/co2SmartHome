const express =  require ('express');
const router = express.Router();
const config = require('../config');
const logging = require("../logging/logging");
const log = logging.createLogger("router");

const tplinkplug = require('../devices-controller/tp-link-plug-controller');
router.get('/device', async(req, res) => {

});

router.get('/turnOn', async(req, res) => {
    log.info("got endpoint ");
    try {
        tplinkplug.turnAllPlugsOn();
        res.send("worked");
    } catch (err) {
        res.send({Error: "Failed to turn on"});
    }
});

router.get('/turnOff', async(req, res) => {
    log.info("off");
    try {
        tplinkplug.turnAllPlugsOff();
        res.send("worked");
    } catch (err) {
        res.send({Error: "Failed to turn on"});
    }
});

router.post('/overide', async (req, res) => { 

});

router.get('/statistics', async (req, res) => {

});


module.exports = router;