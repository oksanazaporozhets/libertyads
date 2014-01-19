/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Click Schema
 */
var DailystatSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    advert: {
        type: Schema.ObjectId,
        ref: 'Advert'
    },
//    minute: {},
    hourly: {

    }
//    monthly: {
////        type: Number
//    }


});



mongoose.model('Dailystat', DailystatSchema);
