const config = require('../config');
const logger = require("../logging/logging");
const log = logger.createLogger('Carbon');
const request = require('request-promise');
const mongoose = require('mongoose');
const mongo = require('../db/mongo/mongoConnect');
const model = require('../db/mongo/model');
const real = mongoose.model('real', model.realSchema);
//  Multi use api call function
exports.fetch = async(url) => {
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
        if (valid) {
            const schema = new real(carbonData);
            const saved = await mongo.save(schema, carbonData);
            return saved;
        } else {
            log.error('data not valid');
            return ({Error: 'Data already exists in database'});
        }
    
    } catch (e) {
        log.error(JSON.stringify(e));
        throw e;
    }
}

async function getCarbonData () {
    try {
        const url = config.apiURL + 'intensity'; 
        const carbon = await exports.fetch(url);
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
        const factors = await exports.fetch(factorsURL);
        const genMix = await exports.fetch(genMixURL);
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
    log.info('Validating the carbon data')
    // Have to wrap the promise as the mongoose does not work sync
    // todo - More validation
    return new Promise(async function (resolve) {
        const filter = {'datetime': carbonData.datetime};
            real.countDocuments(filter, function (err, count) {
                if (count > 0) {
                    log.error('File already exists in Actual collection');
                    resolve(false);
                } else {
                    log.info('Data has been validated');
                    resolve(true);
                }
            });
    });
}



