const config = require('../config');
const logger = require("../logging/logging");
const log = logger.createLogger('Carbon');
const request = require('request-promise');
let url = config.apiURL;
//  Multi use api call function
async function fetch(url) {
    try {
        const response = await request.get({
            url: url,
        });
        const data = JSON.parse(response);
        return data;
    } catch (err) {
        log.error(JSON.stringify(err));
        throw err;
    }
}
// Gets the carbon level - high/medium/low
exports.carbonLevel = async () => {
    try {
        url = url + 'intensity'; 
        const carbon = await fetch(url);
        const intensity = Object.values(carbon)[0][0];
        const levels = intensity.intensity.index;
        return levels;
    } catch (e) {
        console.log("ERROR")
        throw e;
    }
}

async function getCarbonData () {
    try {
        const urlFactors = 'https://api.carbonintensity.org.uk/intensity/factors';
        const url = 'https://api.carbonintensity.org.uk/intensity/2020-01-01T00:00Z'
        const carbon = await fetch(url);
        const data = Object.values(carbon)[0];
        console.log(data);

    } catch (e) {
        throw e;
    }
}

exports.getFuelType = async () => {
    try {
        url = url + 'intensity/factors'
        const data = await fetch(url);
        return data;
    } catch (e) {
        throw e;
    }
}

exports.getGenerationMix = async () => {
    try {
        url = url + 'generation';
        const data = await fetch(url);
        return data;
    } catch (e) {
        throw e
    }
}

// exports.latestCarbon();