/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Advert = mongoose.model('Advert'),
    Click = mongoose.model('Click'),
    Dailystat = mongoose.model('Dailystat'),
    Monthlystat = mongoose.model('Monthlystat'),
//    Statistic = mongoose.model('Statistic'),
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


    data.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    data.agent = req.headers['user-agent'];
    data.advertid = data.id;
    data.accencod = req.headers['accept-encoding'];
    data.acclang = req.headers['accept-language'];
    var click = new Click(data);
    click.save();

//increments our statistics data


    var dt = new Date();
    var dd = dt.getUTCFullYear() + "/" + dt.getUTCMonth()+ 1 + "/00" + "-00:00";
    var d = dt.getUTCFullYear() + "/" + dt.getUTCMonth()+ 1 + "/" + dt.getUTCDate() + "-00:00";

    var id_daily = dt.getUTCFullYear() + "/" + dt.getUTCMonth()+ 1 + "/" + dt.getUTCDate() + data.id;
    var hour = dt.getUTCHours();
    var query = {'_id': id_daily, 'metadata': {'date': d, 'advert': data.id}};
    var update = { $inc: {} };
    update.$inc['hourly.' + hour] = 1;
    update.$inc['summ'] = 1;
//    inc.$inc['minute.' + hour + '.' + minute] = 1;
    nativeDriver.dailystats.update(query, update, {upsert: 1}, function(err, callback){
        if (err) throw err;
//        console.log(callback);
    });
//    console.log(req.headers);

    var id_monthly = dt.getUTCFullYear() + "/" + dt.getUTCMonth()+ 1 + data.id;
    var day_of_month = dt.getUTCDate();
    query = {'_id': id_monthly, 'metadata': {'date': dd, 'advert': data.id}};
    update = { $inc: {} };
    update.$inc['daily.' + day_of_month] = 1;
    update.$inc['summ'] = 1;
    nativeDriver.monthlystats.update(query, update, {upsert: 1}, function(err, callback){
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
