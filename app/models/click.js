/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Click Schema
 */
var ClickSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    headers: {},
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    url:{
        type: String
    },
    urltitle:{
        type: String
    },
    regions:{},
    keywords:{
        type: String
    }

});



mongoose.model('Click', ClickSchema);
