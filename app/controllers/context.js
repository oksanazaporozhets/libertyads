/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Advert = mongoose.model('Advert'),
    Click = mongoose.model('Click');
    Stat = mongoose.model('Stat');
    nativeDriver = mongoose.connection.collections;

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
//    console.log(data);
//    console.log(req.headers);
    var click = new Click(data);
    click.save();
//    sdata = click.aggregate({ $group: {_id: "advertid", }}).
//    var sdata = new Aggregate();


    var stat = new Stat({$inc: {monthly :1}});
    stat.save();
};
