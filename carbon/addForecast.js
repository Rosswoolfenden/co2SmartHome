
const config = require('../config');
const logger = require("../logging/logging");
const log = logger.createLogger('Carbon');
const mongoose = require('mongoose');
const moment = require('moment');
const mongo = require('../db/mongo/mongoSave');
const model = require('../db/mongo/model');
const latest = require('./addLatest');
const forecast = mongoose.model('forecast', model.forecastSchema);

exports.addForecast = async () => {
    try {
        log.info('Getting Forecast data');
        const forecast = await getForecast();
        return forecast;
    } catch (e) {
        log.error(JSON.stringify(e));
        throw e;
    }
}

async function getForecast() {
    try {
        const now =  moment().format('YYYY-MM-DDThh:mmZ');
        console.log(now);
        const url = config.apiURL + 'intensity/' + now + '/fw24h';
        // Uses fetch function in addLatest to avoid reuse of code
        
        const data = await latest.fetch(url);
        return data;
    } catch (e){
        log.error(JSON.stringify(e));
        throw e;
    }
}