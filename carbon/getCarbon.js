const moment = require('moment');
const mongo = require('../db/mongo/mongoConnect');

exports.getCarbonRange = async (from, to) => {
    try {
        // Formats search dates
        const now = moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        from = +moment(from).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        to = moment(to).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        const realData = await mongo.getReal(now, to, 'real');

        return realData;
    } catch (e) {
        console.log(e);
        throw e;
    }
    
}

exports.getCurrentCarbon = async () => {

}