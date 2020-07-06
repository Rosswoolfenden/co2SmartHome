const mongoose = require('mongoose');
const schema = mongoose.Schema;
exports.realSchema = new schema ({
    intensity: {
        type: Number,
        required: true,
    },
    datetime: {
        type: Date,
        required: true,
    },
    index: {
        type: String,
        required: true,
    },
    generation: {
        type: Array,
        required: true
    },
    factors: {
        type: Array,
        required: true
    }
}, {collection: 'real'});

exports.forecastSchema = new schema ({
    intensity: {
        type: Number,
        required: true,
    },
    datetime: {
        type: Date,
        required: true,
    },
    index: {
        type: String,
        required: true,
    }
}, {collection: 'forecast'});
