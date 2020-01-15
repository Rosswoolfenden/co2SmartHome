const mongoose = require('mongoose');
const schema = mongoose.Schema;
export const realSchema = new schema ({
    carbonIntensity: {
        type: Number,
        required: true,
    },
    datetime: {
        type: Date,
        required: true,
    },
    levels: {
        type: String,
        required: true,
    },
    main_source: {
        type: String,
        required: true
    }
}, {collection: 'real'});

export const forecastSchema = new schema ({
    carbonIntensity: {
        type: Number,
        required: true,
    },
    datetime: {
        type: Date,
        required: true,
    },
    levels: {
        type: String,
        required: true,
    },
    main_source: {
        type: String,
        required: true
    }

}, {collection: 'forecast'});
