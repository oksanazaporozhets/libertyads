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
    // redirect user to target URL
    res.redirect(data.url);


    data.userip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    data.useragent = req.headers['user-agent'];
    data.advertid = data.id;
    var click = new Click(data);
    click.save();

//increments our statistics data


    var dt = new Date();
    var d = dt.getUTCFullYear() + "/" + dt.getUTCMonth()+ 1 + "/" + dt.getUTCDate() + "00:00";
    var id_daily = dt.getUTCFullYear() + "/" + dt.getUTCMonth()+ 1 + "/" + dt.getUTCDate() + data.id;
    var hour = dt.getHours();
    var query = {'_id': id_daily, 'metadata': {'date': d, 'advert': data.id}};
    var update = { $inc: {} };
    update.$inc['hourly.' + hour] = 1;
//    inc.$inc['minute.' + hour + '.' + minute] = 1;
    nativeDriver.statistics.update(query, update, {upsert: 1}, function(err, callback){
        if (err) throw err;
//        console.log(callback);
    });





    /*Statistic.findOne({"advert": data.id}, function(err, statistics) {
        if (!err) {
            if (statistics) {
            console.log("statistics finded, updeting counter...");
            //            console.log(statistics);
//            statistics = _.extend(statistics, {$inc: {'monthly': '2'}});
                statistics.monthly += 1;
            statistics.save();
            console.log(statistics);
            }
            else {
                console.log("error: record for this advert not exist, creating new document for it");
                var newstat = {};
                newstat.advert = data.id;
                newstat.monthly = 1;
                var stat = new Statistic(newstat);
                stat.save();
                console.log(stat);
            }
        }
        else {
            console.log('error: click not saved');
        }
    });*/
};
