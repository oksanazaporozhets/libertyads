/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Click Schema
 */
var MonthlystatSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    advert: {
        type: Schema.ObjectId,
        ref: 'Advert'
    },
//    minute: {},
    daily: {

    }
//    monthly: {
////        type: Number
//    }


});



mongoose.model('Monthlystat', MonthlystatSchema);
