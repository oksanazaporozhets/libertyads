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

//--------------regions------------------------------------------
    $scope.region = "qwerty";
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


///==========================

function Choice(name, children) {
    this.name = name;
    this.checked = false;
    this.children = children || [];
}

var apparel = new Choice('Apparel', [
    new Choice('Mens Shirts', [
//        new Choice('Polo'),
//        new Choice('Dress'),
        new Choice('T-Shirt')
    ]),
//    new Choice('Womens Shirts'),
    new Choice('Pants')
]);
//var boats = new Choice('Cars');

//$http({method: 'get', url: '/api/v1/adverts'}).success(function(data, status){
//    $scope.status = status;
//    $scope.data = data;
//
//}).error(function(data, status){
//        $scope.data = data || "Request failed";
//        $scope.status = status;
//    });
//
//var boats = $scope.data;


var MainCtrl = function($scope, $http){
    $scope.name = 'World';

    $http({method: 'get', url: '/api/v1/adverts'}).success(function(data, status){
        var mdata = JSON.parse(data);
        alert(mdata);
        $scope.status = status;
        $scope.data = data;

    }).error(function(data, status){
        $scope.data = data || "Request failed";
        $scope.status = status;
    });

    var boats = new Choice($scope.data);

    $scope.myTree = [apparel, boats, $scope.data];
};

angular.module('mean.adverts').directive('choiceTree', function() {
    return {
        template: '<ul><choice ng-repeat="choice in tree"></choice></ul>',
        replace: true,
        transclude: true,
        restrict: 'E',
        scope: {
            tree: '=ngModel'
        }
    };
});




angular.module('mean.adverts').directive('choice', function($compile){
    return {
        restrict: 'E',
        //In the template, we do the thing with the span so you can click the
        //text or the checkbox itself to toggle the check
        template: '<li>' +
            '<span ng-click="choiceClicked(choice)">' +
            '<input type="checkbox" ng-checked="choice.checked"> {{choice.name}}' +
            '</span>' +
            '</li>',
        link: function(scope, elm, attrs) {
            scope.choiceClicked = function(choice) {
                choice.checked = !choice.checked;
                function checkChildren(c) {
                    angular.forEach(c.children, function(c) {
                        c.checked = choice.checked;
                        checkChildren(c);
                    });
                }
                checkChildren(choice);
            };

            //Add children by $compiling and doing a new choice directive
            if (scope.choice.children.length > 0) {
                var childChoice = $compile('<choice-tree ng-model="choice.children"></choice-tree>')(scope)
                elm.append(childChoice);
            }
        }
    };
});
