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

angular.module('mean.adverts').factory("Statistics", ['$resource', function($resource) {
    return $resource('statistics/:advertid', {
        advertId: '@advert._id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);