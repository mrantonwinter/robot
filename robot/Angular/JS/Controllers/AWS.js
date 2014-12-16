app.controller("AWS", function ($scope, $rootScope) {
    $scope.data = {
        selectedIndex: 0,
        secondLocked: true,
        secondLabel: "Item Two",
        cb1 : true,
        cb2 : false,
        cb3 : false,
        cb4 : false,
        cb5 : false
    };
    $scope.title1 = 'Button';
    $scope.title4 = 'Warn';
    $scope.isDisabled = true;
    $scope.googleUrl = 'http://google.com';

    $scope.color = {
        red: Math.floor(Math.random() * 255),
        green: Math.floor(Math.random() * 255),
        blue: Math.floor(Math.random() * 255)
    };
    $scope.rating = 3;
    $scope.disabled1 = 0;
    $scope.disabled2 = 70;
});