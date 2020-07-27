const express =  require ('express');
const router = express.Router();
const config = require('../config');
const logging = require("../logging/logging");
const log = logging.createLogger("router");

const tplinkplug = require('../devices-controller/tp-link-plug-controller');
router.get('/device', async(req, res) => {

});

router.get('/turnOn', async(req, res) => {
    log.info("turn on has been called");
    const plugid = req.query.id;

    log.info("got endpoint ");
    try {
        tplinkplug.turnAllPlugsOn();
        res.send("worked");
    } catch (err) {
        res.send({Error: "Failed to turn on"});
    }
});

router.get('/turnOff', async(req, res) => {
    const plugid = req.query.id
    log.info("off");
    try {
        tplinkplug.turnAllPlugsOff();
        res.send("worked");
    } catch (err) {
        res.send({Error: "Failed to turn on"});
    }
});

router.get('/getAllPlugs', async(req, res) => {
    log.info("yeah i have been called")
    try {
        res.send(tplinkplug.getAllDevices().toJSON);

    } catch (err){
        log.error("Error : " + err);
        res.send({Error: "Failed to retreive plugs"});
    }
});

router.post('/overide', async (req, res) => { 

});

router.get('/statistics', async (req, res) => {

});


module.exports = router;