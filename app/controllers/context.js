/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Advert = mongoose.model('Advert'),
    Click = mongoose.model('Click'),
    Statistic = mongoose.model('Statistic'),
    nativeDriver = mongoose.connection.collections,
    _ = require('lodash');

/**
 * List of Adverts
 */
exports.ads = function (req, res) {

    nativeDriver.adverts.find({}, {limit: 24, fields: {title:1, text:1, url:1, vurl:1}}).toArray(function (err, docs) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(docs);
        }
    });
};

/**
 * Click handler
 */
exports.click = function (req, res) {
    // we need to implement error check and logging
    var data = JSON.parse(req.params.data);
//    var headers = {};
    data.userip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    data.useragent = req.headers['user-agent'];
    data.advertid = data.id;
    // redirect user to target URL
    res.redirect(data.url);
//increments our statistics data
    Statistic.findOne({"id": data.id}, function(err, statistics) {
        if (!err) {
            //            console.log(statistics);
            statistics = _.extend(statistics, { $inc: {'monthly': '1'}});
            statistics.save();
        }
        else {
            console.log('1111111 error 111111111110000000000000000000000000000011111111111111111111111111111111111');
        }
    });
};
