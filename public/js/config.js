//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).

        when('/adverts', {
            templateUrl: 'views/adverts/list.html'
        }).
        when('/adverts/create', {
            templateUrl: 'views/adverts/create.html'
        }).
        when('/adverts/:advertId/edit', {
            templateUrl: 'views/adverts/edit.html'
        }).
        when('/adverts/:advertId', {
            templateUrl: 'views/adverts/view.html'
        }).

        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);