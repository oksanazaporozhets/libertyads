angular.module('mean.adverts').controller('AdvertsController', ['$scope', '$routeParams', '$location', 'Global', 'Adverts', '$modal', function ($scope, $routeParams, $location, Global, Adverts, $modal) {
    $scope.global = Global;

    $scope.create = function() {
        var advert = new Adverts({
            title: this.title,
            content: this.content,
            link: this.link,
            linktitle: this.linktitle,
            regions: this.regions,
            keywords: this.keywords
        });
        advert.$save(function(response) {
            $location.path("adverts/"/* + response._id*/);
        });

        this.title = "";
        this.content = "";
        this.link = "";
        this.linktitle = "";
        this.regions = "";
        this.keywords = "";
    };

    $scope.remove = function(advert) {
        if (advert) {
            advert.$remove();

            for (var i in $scope.adverts) {
                if ($scope.adverts[i] == advert) {
                    $scope.adverts.splice(i, 1);
                }
            }
        }
        else {
            $scope.advert.$remove();
            $location.path('adverts');
        }
    };

    $scope.update = function() {
        var advert = $scope.advert;
        if (!advert.updated) {
            advert.updated = [];
        }
        advert.updated.push(new Date().getTime());

        advert.$update(function() {
            $location.path('adverts/'/* + advert._id*/);
        });
    };

    $scope.find = function() {
        Adverts.query(function(adverts) {
            $scope.adverts = adverts;
        });
    };

    $scope.findOne = function() {
        Adverts.get({
            advertId: $routeParams.advertId
        }, function(advert) {
            $scope.advert = advert;
        });
    };

//---------------1------------------------------------------
    $scope.open = function (helpname) {

        var modalInstance = $modal.open({
//            templateUrl: 'myModalContent.html'
            templateUrl: 'views/help/'+helpname+'.html'
        });

    };
//    $scope.ok = function () {
//        $modalInstance.close($scope);
//    };
//
//    $scope.cancel = function () {
//        $modalInstance.dismiss('cancel');
//    };


}]);
