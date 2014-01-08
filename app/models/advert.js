/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Advert Schema
 */
var AdvertSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
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

/**
 * Validations
 */
AdvertSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

AdvertSchema.path('url').validate(function(url) {
    return url.length;
}, 'Url cannot be blank');

//AdvertSchema.path('linktitle').validate(function(linktitle) {
//    return linktitle.length;
//}, 'Link-title cannot be blank');

/**
 * Statics
 */
AdvertSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Advert', AdvertSchema);
