const config = require('../config');
const logger = require("../logging/logging");
const log = logger.createLogger('Carbon');
const request = require('request-promise');
const mongo = require('../db/mongo/mongoSave');
let url = config.apiURL;
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

// carbon = {
//     datetime: startTS,
//     intensity: int,
//     level: string,
//     mainContributer: string
// }

exports.addCarbonData = async() => {
    try {
        let carbonData = await getCarbonData();
        const genMix =  await getGenerationMix();
        carbonData.fuel_source = genMix;
        const saved = await mongo.save('actual', carbonData);
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

async function getFuelType () {
    try {
        const url = config.apiURL + 'intensity/factors'
        console.log(url)
        // const data = await fetch(url);
        return data;
    } catch (e) {
        throw e;
    }
}
// Gets the feuls used to generate the energy at the time 
async function getGenerationMix() {
    try {
        const url = config.apiURL + 'generation';
        // url = 'https://api.carbonintensity.org.uk/generation'
        console.log(url);
        const mix = await fetch(url);
        // console.log(data);
        return mix.data.generationmix ;
    } catch (e) {
        throw e
    }
}
