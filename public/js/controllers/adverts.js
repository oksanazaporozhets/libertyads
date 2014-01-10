angular.module('mean.adverts').controller('AdvertsController', ['$scope', '$routeParams', '$location', 'Global', 'Adverts', '$modal', function ($scope, $routeParams, $location, Global, Adverts, $modal) {
    $scope.global = Global;

    $scope.create = function() {
        var advert = new Adverts({
            title: this.title,
            text: this.text,
            url: this.protocol + this.url,
            urltitle: this.urltitle,
            regions: this.regions,
            keywords: this.keywords
        });
        advert.$save(function(response) {
            $location.path("adverts/"/* + response._id*/);
        });

        this.title = "";
        this.text = "";
        this.url = "";
        this.protocol = "";
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
//    $scope.region = "qwerty";

//    $scope.firstimexamples = {  img1: "http://help.yandex.ru/partner/image/banners-direct-rtb-240400.png",
//                                img2: "http://help.yandex.ru/partner/image/banners-direct-rtb-240400.png",
//                                img3: "http://help.yandex.ru/partner/image/banners-media-rtb-240400.png"};
//    $scope.secondimexamples ={  img1: 'http://help.yandex.ru/partner/image/banners-direct-rtb-72890.png',
//                                img2: 'http://help.yandex.ru/partner/image/banners-direct-pic-rtb-72890.png',
//                                img3: 'http://help.yandex.ru/partner/image/banners-media-rtb-72890.png'};
//    $scope.thirdimexamples ={   img1: 'http://help.yandex.ru/partner/image/banners-direct-rtb-1000120.png',
//                                img2: 'http://help.yandex.ru/partner/image/banners-direct-rtb-1000120.png',
//                                img3: 'http://help.yandex.ru/partner/image/banners-media-rtb-1000120.png'};
//    $scope.fourthimexamples ={  img1: 'http://help.yandex.ru/partner/image/banners-direct-rtb-160600.png',
//                                img2: 'http://help.yandex.ru/partner/image/banners-direct-pic-rtb-160600.png',
//                                img3: 'http://help.yandex.ru/partner/image/banners-media-rtb-160600.png'};
//    $scope.fifthimexamples ={   img1: 'http://help.yandex.ru/partner/image/banners-direct-rtb-300250.png',
//                                img2: 'http://help.yandex.ru/partner/image/banners-direct-pic-rtb-300250.png',
//                                img3: 'http://help.yandex.ru/partner/image/banners-media-rtb-300250.png'};


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
//        if ($scope.imsize == "3") {
//            $scope.img1 = 'http://help.yandex.ru/partner/image/banners-direct-rtb-1000120.png';
//            $scope.img2 = 'http://help.yandex.ru/partner/image/banners-direct-rtb-1000120.png';
//            $scope.img3 = 'http://help.yandex.ru/partner/image/banners-media-rtb-1000120.png'; }
        if ($scope.imsize == "4") {
            $scope.img1 = 'http://help.yandex.ru/partner/image/banners-direct-rtb-160600.png';
            $scope.img2 = 'http://help.yandex.ru/partner/image/banners-direct-pic-rtb-160600.png';
            $scope.img3 = 'http://help.yandex.ru/partner/image/banners-media-rtb-160600.png';
            $scope.datasize = '160x600';
        }
//        if ($scope.imsize == "5") {
//            $scope.img1 = 'http://help.yandex.ru/partner/image/banners-direct-rtb-300250.png';
//            $scope.img2 = 'http://help.yandex.ru/partner/image/banners-direct-pic-rtb-300250.png';
//            $scope.img3 = 'http://help.yandex.ru/partner/image/banners-media-rtb-300250.png'; }
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
