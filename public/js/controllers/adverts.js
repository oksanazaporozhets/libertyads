angular.module('mean.adverts').controller('AdvertsController', ['$scope', '$routeParams', '$location', 'Global', 'Adverts', '$modal', function ($scope, $routeParams, $location, Global, Adverts, $modal) {
    $scope.global = Global;

    $scope.create = function() {
        var advert = new Adverts({
            title: this.title,
            content: this.content,
            url: this.url,
            urltitle: this.urltitle,
            regions: this.regions,
            keywords: this.keywords
        });
        advert.$save(function(response) {
            $location.path("adverts/"/* + response._id*/);
        });

        this.title = "";
        this.content = "";
        this.url = "";
        this.urltitle = "";
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
    $scope.region = "qwerty";
    $scope.userid = user._id;
    $scope.open = function (filename) {


        var modalInstance = $modal.open({
            templateUrl: 'views/help/'+filename+'.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                mregion: function(){
                    return $scope.mregion;
                }
            }
        });
        modalInstance.result.then(function (selectedRegion) {
            $scope.mregion = selectedRegion;
        });

    };


}]);

var ModalInstanceCtrl = function ($scope, $modalInstance) {

//    $scope.region = region;
//    $scope.region = '1';

    $scope.ok = function (mregion) {
        $modalInstance.close(mregion);
        console.log(mregion);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
