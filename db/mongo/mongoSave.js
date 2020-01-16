const mongoose = require('mongoose');
const model = require('./model');
const logging = require('../../logging/logging');
const actual = mongoose.model('actual', model.realSchema);
const forecast = mongoose.model('forecast', model.forecastSchema);
const log = logging.createLogger('Mongo Save');
exports.save = async(schema ,data) => {
    // const newSchema = new actual(data);
    schema.save(async (err, schema) => {
        console.log("saving")
        if (err) {
            log.error('failed to save ' + JSON.stringify(err));
            return false;
        } else {
            log.info('saved to mongo');
            return true
        }
    });
}

