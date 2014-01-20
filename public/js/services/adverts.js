//Adverts service used for adverts REST endpoint
angular.module('mean.adverts').factory("Adverts", ['$resource', function($resource) {
    return $resource('adverts/:advertId', {
        advertId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

angular.module('mean.adverts').factory("Monthlystats", ['$resource', function($resource) {
    return $resource('api/v1/monthlystats/:advertid', {
        advertId: '@advert._id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

angular.module('mean.adverts').factory("Dailystats", ['$resource', function($resource) {
    return $resource('api/v1/dailystats/:advertid', {
        advertId: '@advert._id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);

angular.module('mean.adverts').factory("Clicks", ['$resource', function($resource) {
    return $resource('api/v1/clicks?conditions={"advertid": @advertid}', {
        advertId: '@advert._id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
