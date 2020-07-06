
const config = require('../config');
const logger = require("../logging/logging");
const log = logger.createLogger('Carbon');
const mongoose = require('mongoose');
const moment = require('moment');
const mongo = require('../db/mongo/mongoConnect');
const model = require('../db/mongo/model');
const latest = require('./addLatest');
const forecast = mongoose.model('forecast', model.forecastSchema);

exports.addForecast = async () => {
    try {
        log.info('Getting Forecast data');
        const forecast = await getForecast();
        const formattedForecast =  await format(forecast);
        // formattedForecast.forEach(async (obj) => {
        //     const saved = await mongo.saveForecast(obj)
        //     console.log(saved)
        // });
        console.log(formattedForecast.length)
        for (let i = 0; i < formattedForecast.length; i ++ ) {
            mongo.saveForecast(formattedForecast[i]);
        }
        return true;
    } catch (e) {
        log.error(JSON.stringify(e));
        throw e;
    }
}

async function getForecast() {
    try {
        const now =  moment().format('YYYY-MM-DDThh:mmZ');
        const url = config.apiURL + 'intensity/' + now + '/fw48h';
        // Uses fetch function in addLatest to avoid reuse of code
        const data = await latest.fetch(url);
        return data;
    } catch (e){
        log.error(JSON.stringify(e));
        throw e;
    }
}

async function format(carbon) {
    data = carbon.data
    const forecastArray = []
    data.forEach(entry => {
        const newEntry = {
            datetime: entry.from,
            intensity: entry.intensity.forecast,
            index: entry.intensity.index
        }
        forecastArray.push(newEntry);
    });
    return forecastArray;
}