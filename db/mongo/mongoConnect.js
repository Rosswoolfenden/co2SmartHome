const mongoose = require('mongoose');
const model = require('./model');
const logging = require('../../logging/logging');
const real = mongoose.model('real', model.realSchema);
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

exports.saveForecast = async (data) => {
    // return new Promise (async (resolve) => {
        q = {'datetime': data.datetime};
        forecast.updateOne(q, {'$set': data}, {upsert: true}, function (err) {
            if (err) {
                log.error('Failed to save');
                    resolve (false);
            } else {
                log.info('saved to mongo');
                return (true);
            }
        });
    // });
}

exports.getReal = async (from, to, collection) => {
    console.log(from + '    '+ to);
   
    return new Promise (async (resolve) => {
        forecast.find({
            datetime: {$gte: new Date(from), $lte: new Date(to)},
        function(e, data) {
            if (e) {
                resolve(false)
            } 

            resolve(data);
            }
        });
    });
}
exports.getForecast = async (now, to) => {

}
