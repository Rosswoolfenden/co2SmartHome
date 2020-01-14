const express =  require ('express');
const router = express.Router();
const config = require('../config');
const logging = require("../logging/logging");
const log = logging.createLogger("router");

router.get('/device', async(req, res) => {

});

router.post('/overide', async (req, res) => { 

});

router.get('/statistics', async (req, res) => {

});


module.exports = router;