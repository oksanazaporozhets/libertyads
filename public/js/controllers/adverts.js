angular.module('mean.adverts').controller('AdvertsController', ['$scope', '$routeParams', '$location', 'Global', 'Adverts', 'Monthlystats', 'Dailystats', '$modal', function ($scope, $routeParams, $location, Global, Adverts, Monthlystats, Dailystats, $modal) {
    $scope.global = Global;

    $scope.create = function() {
        var advert = new Adverts({
            title: this.title,
            text: this.text,
            url: this.protocol + this.url,
            vurl: this.vurl,
            regions: this.regions,
            keywords: angular.lowercase(this.keywords)
        });
        advert.$save(function(response) {
            $location.path("adverts/"/* + response._id*/);
        });

        this.title = "";
        this.text = "";
        this.url = "";
        this.protocol = "";
        this.vurl = "";
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
        $scope.advert.keywords = angular.lowercase($scope.advert.keywords);
        $scope.advert.url = $scope.protocol + $scope.advert.url;
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
        Monthlystats.query(function(mstats){
            $scope.mstats = mstats;
//            jmstats = JSON.stringify(mstats);
        });
        Dailystats.query(function(dstats){
            $scope.dstats = dstats;
//            jdstats = JSON.stringify(dstats);
        });
    };

    $scope.findOne = function() {
        Adverts.get({
            advertId: $routeParams.advertId
        }, function(advert) {
            $scope.advert = advert;
            var urlmas = advert.url.split("//");
            $scope.protocol = urlmas[0] + '//';
            $scope.advert.url = urlmas[1];
        });
    };

//---------------1------------------------------------------


    $scope.open = function (filename) {


        var modalInstance = $modal.open({
            templateUrl: 'views/help/'+filename+'.html',
            controller: 'MainCtrl',
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

    $scope.userid = user._id;


    $scope.imagesize = function(){
//        var imsize = imsize;
        if ($scope.imsize == "1") {
            $scope.img1 = 'http://help.yandex.ru/partner/image/banners-direct-rtb-240400.png';
            $scope.img2 = 'http://help.yandex.ru/partner/image/banners-direct-pic-rtb-240400.png';
            $scope.img3 = 'http://help.yandex.ru/partner/image/banners-media-rtb-240400.png';
            $scope.datasize = '240x40';
        }
        if ($scope.imsize == "2") {
            $scope.img1 = 'http://help.yandex.ru/partner/image/banners-direct-rtb-72890.png';
            $scope.img2 = 'http://help.yandex.ru/partner/image/banners-direct-pic-rtb-72890.png';
            $scope.img3 = 'http://help.yandex.ru/partner/image/banners-media-rtb-72890.png';
            $scope.datasize = '728x90';
        }
        if ($scope.imsize == "4") {
            $scope.img1 = 'http://help.yandex.ru/partner/image/banners-direct-rtb-160600.png';
            $scope.img2 = 'http://help.yandex.ru/partner/image/banners-direct-pic-rtb-160600.png';
            $scope.img3 = 'http://help.yandex.ru/partner/image/banners-media-rtb-160600.png';
            $scope.datasize = '160x600';
        }
    };

}]);

var ModalInstanceCtrl = function ($scope, $modalInstance) {

    $scope.ok = function (mregion) {
        $modalInstance.close(mregion);
        console.log(mregion);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};



function Choice(name, children) {
    this.name = name;
    this.checked = false;
    this.children = children || [];
}

var apparel = new Choice('Apparel', [
    new Choice('Mens Shirts', [
        new Choice('Dress'),
        new Choice('T-Shirt')
    ]),
    new Choice('Womens Shirts')
]);
var boats = new Choice('Cars');

var MainCtrl = function($scope) {
    $scope.name = 'World';

    $scope.myTree = [apparel, boats];
};