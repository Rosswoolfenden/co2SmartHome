const config = require('../config');
const logger = require("../logging/logging");
const log = logger.createLogger('Carbon');
const request = require('request-promise');
const mongoose = require('mongoose');
const mongo = require('../db/mongo/mongoSave');
const model = require('../db/mongo/model');
const actual = mongoose.model('actual', model.realSchema);
const forecast = mongoose.model('forecast', model.forecastSchema);

//  Multi use api call function
async function fetch(url) {
    try {
        const response = await request.get({
            url: url,
        });
        const data = JSON.parse(response);
        return data;
    } catch (e) {
        log.error(JSON.stringify(e));
        throw e;
    }
}

exports.addCarbonData = async() => {
    try {
        let carbonData = await getCarbonData();
        const fuelData = await getFuelData();
        carbonData.generation = fuelData.generation;
        carbonData.factors = fuelData.factors;

        const valid  = await validate(carbonData);
        return valid;
        // const schema = new actual(carbonData);
        // const saved = await mongo.save(schema, carbonData);
        console.log(saved);
        return saved;
    } catch (e) {
        log.error(JSON.stringify(e));
    }
}

async function getCarbonData () {
    try {
        const url = config.apiURL + 'intensity'; 
        const carbon = await fetch(url);
        const data = Object.values(carbon)[0][0];
        const carbondata = {
            datetime: data.from,
            intensity: data.intensity.actual,
            index: data.intensity.index
        }
        return carbondata;

    } catch (e) {
        log.error(JSON.stringify(e));
        throw e;
    }
}

// Gets fuel data, Factors, and generation mix
async function getFuelData () {
    try {
        const genMixURL = config.apiURL + 'generation'
        const factorsURL = config.apiURL + 'intensity/factors'
        const factors = await fetch(factorsURL);
        const genMix = await fetch(genMixURL);
        const fuelData = {
            factors: factors.data,
            generation: genMix.data.generationmix
        }
        return fuelData;
    } catch (e) {
        throw e;
    }
}

async function validate(carbonData) {

    // Have to wrap the promise as the mongoose lub
    return new Promise(async function (resolve) {
       
        const filter = {'datetime': carbonData.datetime};
        if (!carbonData.datetime || !carbonData.intensity || !carbonData.factors || carbonData.generation || carbonData.index) {
            log.error('undesfined data in fetch ');
            resolve(false);
        } else {
            actual.countDocuments(filter, function (err, count) {
                if (count > 0) {
                    log.error('File already exists in Actual collection');
                    resolve(false);
                } else {
                    log.debug('Data has been validated');
                    resolve(true);
                }
            });
        }
    });
}

