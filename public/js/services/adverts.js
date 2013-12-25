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