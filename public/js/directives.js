angular.module('mean.adverts').directive('selectOnClick', function () {
    // Linker function
    return function (scope, element) {
        element.bind('click', function () {
            this.select();
        });
    };
});






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

angular.module('mean.adverts').directive('choice', function($compile) {
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