angular.module('mean.adverts').directive('selectOnClick', function () {
    // Linker function
    return function (scope, element) {
        element.bind('click', function () {
            this.select();
        });
    };
});