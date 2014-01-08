angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
//        "title": "Articles",
//        "link": "articles"
//    }, {
//        "title": "Create New Article",
//        "link": "articles/create"
//    }, {
        "title": "Мои объявления",
        "link": "adverts"
    }, {
        "title": "Создать объявление",
        "link": "adverts/create"
    }];
    
    $scope.isCollapsed = false;
}]);