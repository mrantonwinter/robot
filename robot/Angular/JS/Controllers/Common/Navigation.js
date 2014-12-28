app.controller("Navigation", function ($scope, $location) {
    $scope.Links = ['Angular', 'WebAPI', 'AWS', 'PHP'];

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});