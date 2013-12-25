/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Advert = mongoose.model('Advert'),
    _ = require('lodash');


/**
 * Find advert by id
 */
exports.advert = function(req, res, next, id) {
    Advert.load(id, function(err, advert) {
        if (err) return next(err);
        if (!advert) return next(new Error('Failed to load advert ' + id));
        req.advert = advert;
        next();
    });
};

/**
 * Create a advert
 */
exports.create = function(req, res) {
    var advert = new Advert(req.body);
    advert.user = req.user;

    advert.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                advert: advert
            });
        } else {
            res.jsonp(advert);
        }
    });
};

/**
 * Update a advert
 */
exports.update = function(req, res) {
    var advert = req.advert;

    advert = _.extend(advert, req.body);

    advert.save(function(err) {
        res.jsonp(advert);
    });
};

/**
 * Delete an advert
 */
exports.destroy = function(req, res) {
    var advert = req.advert;

    advert.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(advert);
        }
    });
};

/**
 * Show an advert
 */
exports.show = function(req, res) {
    res.jsonp(req.advert);
};

/**
 * List of Adverts
 */
exports.all = function(req, res) {
    Advert.find({'user': req.user._id}).sort('-created').populate('user', 'name username').exec(function(err, adverts) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(adverts);
        }
    });
};
