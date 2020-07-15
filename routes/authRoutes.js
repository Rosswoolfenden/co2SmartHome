const express =  require ('express');
const router = express.Router();
const config = require('../config');
const logging = require("../logging/logging");
const log = logging.createLogger("router");
const auth = require('../auth/auth');

router.post('/register', async (req, res) => {
    const body = req.body;
    console.log("this occured "+ body.email);
    try {
        const valid = await auth.register(body);
        res.send(valid);
    } catch(e) {
        console.log("This failed" + e);
        res.send('Unable to complete at this time, please try again later.');
    }

});

router.post('/login', async (req, res) => {
    const body = req.body;
    try {
        login  = await auth.login(body);
        res.send(login);
    } catch (e) {
        res.send('Unable to login at this time, please try again later');
    }
})


module.exports = router;

